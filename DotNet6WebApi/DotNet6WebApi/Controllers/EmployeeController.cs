using AutoMapper;
using DotNet6WebApi.Data;
using DotNet6WebApi.DTO;
using DotNet6WebApi.Helper;
using DotNet6WebAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;
namespace DotNet6WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly IAuthManager authManager;
        private readonly UserManager<AppUser> userManager;
        public EmployeeController(IUnitOfWork _unitOfWork, IMapper _mapper, UserManager<AppUser> _userManager, IAuthManager _authManager)
        {
            userManager = _userManager;
            unitOfWork = _unitOfWork;
            mapper = _mapper;
            authManager = _authManager;
        }

        [HttpGet]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetEmployees(string role, string orderby, string sort, int pageNumber, int pageSize)
        {
            try
            {
                Expression<Func<Employee, bool>> expression = q=>q.IsLocked==false;
                Func<IQueryable<Employee>, IOrderedQueryable<Employee>> orderBy = null;

                switch (role)
                {
                    case "all":
                        break;
                    case "employee":
                        expression = q => q.ShipperId == null;
                        break;
                    case "shipper":
                        expression = q => q.ShipperId != null;
                        break;
                    default:
                        break;
                }
                switch (orderby)
                {
                    case "Id":
                        orderBy = (sort == "Asc") ? q => q.OrderBy(p => p.Id) : q => q.OrderByDescending(p => p.Id);
                        break;
                    case "Name":
                        orderBy = (sort == "Asc") ? q => q.OrderBy(p => p.Name) : q => q.OrderByDescending(p => p.Name);
                        break;
                    case "Sex":
                        orderBy = (sort == "Asc") ? q => q.OrderBy(p => p.Sex) : q => q.OrderByDescending(p => p.Sex);
                        break;
                    default:
                        orderBy = (sort == "Asc") ? q => q.OrderBy(p => p.Id) : q => q.OrderByDescending(p => p.Id);
                        break;
                }
                var employees = await unitOfWork.Employees.GetAll(expression, orderBy, new List<string> { "Shipper" }, new PaginationFilter(pageNumber, pageSize));
                var total = await unitOfWork.Employees.GetCount(expression);
                var result = mapper.Map<IList<EmployeeDTO>>(employees);

                return Ok(new { success = true, result, total });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("createShipper")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> CreateShipper([FromBody] CreateShipperDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                try
                {
                    var user = new AppUser() { imgUrl = dto.imgUrl, Email = dto.Email, UserName = dto.UserName, PhoneNumber = dto.PhoneNumber, EmailConfirmed = true };
                    var result = await userManager.CreateAsync(user, dto.Password);
                    var errors = new List<string>();
                    if (!result.Succeeded)
                    {
                        foreach (var error in result.Errors)
                        {
                            errors.Add(error.Code);
                        }
                        return Ok(new { errors = errors, success = false });
                    }
                    await userManager.AddToRolesAsync(user, dto.Roles);

                    var employee = new Employee() 
                    { 
                        Name = dto.UserName, 
                        DoB = dto.DoB, 
                        Address = dto.Address, 
                        Sex = dto.Sex, Salary = dto.Salary, 
                        CMND = dto.CMND, 
                        StartDate = dto.StartDate ,
                        ShipperId = user.Id ,
                        Email=dto.Email,
                        imgUrl = dto.imgUrl,
                    };

                    await unitOfWork.Employees.Insert(employee);
                    await unitOfWork.Save();

                    return Ok(new { employee, success = true});

                }
                catch (Exception ex)
                {
                    return BadRequest(new { error = ex.Message });
                }
            }
        }

        [HttpPost("createEmployee")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> CreateEmployee([FromBody] CreateEmployeeDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new { error = "Dữ liệu chưa hợp lệ", success = false });
            }
            try
            {
                var newEntity = mapper.Map<Employee>(dto);
                await unitOfWork.Employees.Insert(newEntity);
                await unitOfWork.Save();
                return Ok(new { employee = newEntity, success = true });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> PutEmployee([FromBody] CreateEmployeeDTO dto,int id)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new { error = "Dữ liệu chưa hợp lệ", success = false });
            }
            try
            {
                var emp = await unitOfWork.Employees.Get(q => q.Id == id,new List<string> { "Shipper"});
                if (emp == null)
                {
                    return Ok(new { error = "Không tìm thấy nhân viên", success = false });
                }
                mapper.Map(dto,emp);

                unitOfWork.Employees.Update(emp);
                await unitOfWork.Save();

                if (emp.ShipperId!=null)
                {
                    emp.Shipper.Email = dto.Email;
                    emp.Shipper.UserName = dto.Name;
                    emp.Shipper.imgUrl = dto.imgUrl;
                    await userManager.UpdateAsync(emp.Shipper);
                }

                return Ok(new { employee=emp, success = true });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            try
            {
                var emp = await unitOfWork.Employees.Get(q => q.Id == id, new List<string> { "Shipper" });
                var deleteUser = false;
                if (emp == null)
                {
                    return Ok(new { success = false, msg = "Không tìm thấy nhân viên" });
                }
                emp.IsLocked = true;
                unitOfWork.Employees.Update(emp);
                await unitOfWork.Save();
                if (emp.ShipperId != null)
                {
                    deleteUser = true;
                }
                if (deleteUser)

                {
                    var user = await userManager.FindByIdAsync(emp.ShipperId);
                    user.IsLocked = true;
                    await userManager.UpdateAsync(user);
                }
                return Ok(new { success = true });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.ToString() });
            }
        }
    }
}
