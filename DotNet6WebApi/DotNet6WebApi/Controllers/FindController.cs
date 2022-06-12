using AutoMapper;
using DotNet6WebApi.Data;
using DotNet6WebApi.DTO;
using DotNet6WebApi.Helper;
using DotNet6WebAPI.DTO;
using DotNet6WebAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.Linq.Expressions;

namespace DotNet6WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FindController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly IAuthManager authManager;
        private readonly UserManager<AppUser> userManager;
        public FindController(IUnitOfWork _unitOfWork, IMapper _mapper, UserManager<AppUser> _userManager, IAuthManager _authManager)
        {
            userManager = _userManager;
            unitOfWork = _unitOfWork;
            mapper = _mapper;
            authManager = _authManager;
        }

        [HttpGet]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> FindAll(string type,string searchBy,string keyword, int pageNumber=1, int pageSize = 10)
        {
            try
            {
                Expression<Func<Book, bool>> expression_book = null;
                Expression<Func<AppUser, bool>> expression_user = null;
                Expression<Func<Order, bool>> expression_order = null;
                Expression<Func<Employee, bool>> expression_emp = null;
                Expression<Func<Genre, bool>> expression_genre = null;
                dynamic listFromQuery;
                dynamic result;
                int count = 0;

                switch (type, searchBy)
                {
                    //--------------------------------------------------------------------------------------------------
                    case ("Product", "Name"):
                        expression_book = q => q.Title.Contains(keyword)&&q.IsLocked==false;
                        listFromQuery = await unitOfWork.Books.GetAll(
                        expression_book,
                        null,
                        new List<string> { "Authors", "Genres", "Publisher", "PromotionInfo" },
                        new PaginationFilter(pageNumber, pageSize));
                        count = await unitOfWork.Books.GetCount(expression_book);
                        result = mapper.Map<IList<AdminBookDTO>>(listFromQuery);
                        return Accepted(new { success = true, result = result, total = count });
                    case ("Product", "Price"):
                        expression_book = q => q.Price == Int32.Parse(keyword) && q.IsLocked == false;
                        listFromQuery = await unitOfWork.Books.GetAll(
                        expression_book,
                        null,
                        new List<string> { "Authors", "Genres", "Publisher", "PromotionInfo" },
                        new PaginationFilter(pageNumber, pageSize));
                        count = await unitOfWork.Books.GetCount(expression_book);
                        result = mapper.Map<IList<AdminBookDTO>>(listFromQuery);
                        return Accepted(new { success = true, result = result, total = count });
                    case ("Product", "Id"):
                        expression_book = q => q.Id == Int32.Parse(keyword) && q.IsLocked == false;
                        listFromQuery = await unitOfWork.Books.GetAll(
                        expression_book,
                        null,
                        new List<string> { "Authors", "Genres", "Publisher", "PromotionInfo" },
                        new PaginationFilter(pageNumber, pageSize));
                        count = await unitOfWork.Books.GetCount(expression_book);
                        result = mapper.Map<IList<AdminBookDTO>>(listFromQuery);
                        return Accepted(new { success = true, result = result, total = count });
                    //--------------------------------------------------------------------------------------------------
                    case ("Order", "Name"):
                        expression_order = q=>q.ContactName.Contains(keyword) && q.IsLocked == false;
                        listFromQuery = await unitOfWork.Orders.GetAll(
                          expression_order,
                          null,
                          new List<string> { "OrderDetails", "Shipper", "DiscountCode" },
                          new PaginationFilter(pageNumber, pageSize));
                        count = await unitOfWork.Orders.GetCount(expression_order);
                        result = mapper.Map<IList<OrderDTO>>(listFromQuery);
                        return Accepted(new { success = true, result = result, total = count });
                    

                    case ("Order", "Id"):
                        expression_order = q => q.Id==Int32.Parse(keyword) && q.IsLocked == false;
                        listFromQuery = await unitOfWork.Orders.GetAll(
                          expression_order,
                          null,
                          new List<string> { "OrderDetails", "Shipper", "DiscountCode" },
                          new PaginationFilter(pageNumber, pageSize));
                        count = await unitOfWork.Orders.GetCount(expression_order);
                        result = mapper.Map<IList<OrderDTO>>(listFromQuery);
                        return Accepted(new { success = true, result = result, total = count });
                    case ("Order", "TotalPrice"):
                        expression_order = q => q.TotalPrice == Int32.Parse(keyword) && q.IsLocked == false;
                        listFromQuery = await unitOfWork.Orders.GetAll(
                          expression_order,
                          null,
                          new List<string> { "OrderDetails", "Shipper", "DiscountCode" },
                          new PaginationFilter(pageNumber, pageSize));
                        count = await unitOfWork.Orders.GetCount(expression_order);
                        result = mapper.Map<IList<OrderDTO>>(listFromQuery);
                        return Accepted(new { success = true, result = result, total = count });
                    case ("Order", "OrderDate"):

                        expression_order = q => q.OrderDate.Date.Equals(DateTime.ParseExact(keyword, "yyyy-MM-dd", CultureInfo.InvariantCulture).Date) && q.IsLocked == false;
                        listFromQuery = await unitOfWork.Orders.GetAll(
                          expression_order,
                          null,
                          new List<string> { "OrderDetails", "Shipper", "DiscountCode" },
                          new PaginationFilter(pageNumber, pageSize));
                        count = await unitOfWork.Orders.GetCount(expression_order);
                        result = mapper.Map<IList<OrderDTO>>(listFromQuery);
                        return Accepted(new { success = true, result = result, total = count });
                    case ("Order", "ShippedDate"):
                        expression_order = q => q.ShippedDate.ToShortDateString() ==
                        DateTime.ParseExact(keyword, "yyyy-MM-dd", CultureInfo.InvariantCulture).ToShortDateString() && q.IsLocked == false;
                        listFromQuery = await unitOfWork.Orders.GetAll(
                          expression_order,
                          null,
                          new List<string> { "OrderDetails", "Shipper", "DiscountCode" },
                          new PaginationFilter(pageNumber, pageSize));
                        count = await unitOfWork.Orders.GetCount(expression_order);
                        result = mapper.Map<IList<OrderDTO>>(listFromQuery);
                        return Accepted(new { success = true, result = result, total = count });
                    //--------------------------------------------------------------------------------------------------
                    case ("User", "Id"):
                        expression_user = q => q.Id == keyword && q.IsLocked == false;
                        listFromQuery= await unitOfWork.Users.GetAll(
                            expression_user,
                            null,null,new PaginationFilter(pageNumber,pageSize));
                        count = await unitOfWork.Users.GetCount(expression_user);
                        result = mapper.Map<IList<SimpleUserForAdminDTO>>(listFromQuery);
                        return Accepted(new { success = true, result = result, total = count });
                       
                    case ("User", "Name"):
                        expression_user = q => q.UserName.Contains(keyword) && q.IsLocked == false;
                        listFromQuery = await unitOfWork.Users.GetAll(
                            expression_user,
                            null, null, new PaginationFilter(pageNumber, pageSize));
                        count = await unitOfWork.Users.GetCount(expression_user);
                        result = mapper.Map<IList<SimpleUserForAdminDTO>>(listFromQuery);
                        return Accepted(new { success = true, result = result, total = count });
                    //--------------------------------------------------------------------------------------------------
                    case ("Employee", "Id"):
                        expression_emp = q => q.Id == Int32.Parse(keyword) && q.IsLocked == false;
                        listFromQuery = await unitOfWork.Employees.GetAll(
                          expression_emp,
                          null,
                          new List<string> { "Shipper" },
                          new PaginationFilter(pageNumber, pageSize));
                        count = await unitOfWork.Employees.GetCount(expression_emp);
                        result = mapper.Map<IList<EmployeeDTO>>(listFromQuery);
                        return Accepted(new { success = true, result = result, total = count });
                    case ("Employee", "Name"):
                        expression_emp = q => q.Name.Contains(keyword) && q.IsLocked == false;
                        listFromQuery = await unitOfWork.Employees.GetAll(
                          expression_emp,
                          null,
                          new List<string> { "Shipper" },
                          new PaginationFilter(pageNumber, pageSize));
                        count = await unitOfWork.Employees.GetCount(expression_emp);
                        result = mapper.Map<IList<EmployeeDTO>>(listFromQuery);
                        return Accepted(new { success = true, result = result, total = count });
                    case ("Employee", "Email"):
                        expression_emp = q => q.Email.Contains(keyword) && q.IsLocked == false;
                        listFromQuery = await unitOfWork.Employees.GetAll(
                          expression_emp,
                          null,
                          new List<string> { "Shipper" },
                          new PaginationFilter(pageNumber, pageSize));
                        count = await unitOfWork.Employees.GetCount(expression_emp);
                        result = mapper.Map<IList<EmployeeDTO>>(listFromQuery);
                        return Accepted(new { success = true, result = result, total = count });
                    //--------------------------------------------------------------------------------------------------
                    case ("Genre", "Name"):
                        expression_genre = q => q.Name.Contains(keyword);
                        listFromQuery = await unitOfWork.Genres.GetAll(
                        expression_genre,
                        null,
                        new List<string> { "Books" },
                        new PaginationFilter(pageNumber, pageSize));
                        count = await unitOfWork.Genres.GetCount(expression_genre);
                        result = mapper.Map<IList<GenreInfoAdminDTO>>(listFromQuery);
                        return Accepted(new { success = true, result = result, total = count });
                    case ("Genre", "Id"):
                        expression_genre = q => q.Id == Int32.Parse(keyword);
                        listFromQuery = await unitOfWork.Genres.GetAll(
                        expression_genre,
                        null,
                        new List<string> { "Books" },
                        new PaginationFilter(pageNumber, pageSize));
                        count = await unitOfWork.Genres.GetCount(expression_genre);
                        result = mapper.Map<IList<GenreInfoAdminDTO>>(listFromQuery);
                        return Accepted(new { success = true, result = result, total = count });
                    default:
                        return Accepted(new {success = false,error="Dữ liệu không hợp lệ"});
                }
            }
            catch (Exception ex)
            {
                //return new StatusCodeResult(StatusCodes.Status500InternalServerError);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("user")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetSearchResult_User(string searchBy, string keyword, int pageNumber = 1, int pageSize = 10)
        {
            try
            {
                Func<IQueryable<AppUser>, IOrderedQueryable<AppUser>> orderBy = null;
                Expression<Func<AppUser, bool>> expression_user = null;
                switch (searchBy)
                {
                    case "Id":
                        expression_user = q => q.Id == keyword;
                        break;
                    case "Name":
                        expression_user = q => q.UserName.Contains(keyword);
                        break;
                    case "Email":
                        expression_user = q => q.Email.Contains(keyword);
                        break;
                }

                var users = await unitOfWork.Users.GetAll(expression_user, orderBy, null, new PaginationFilter(pageNumber, pageSize));
                var count = await unitOfWork.Users.GetCount(expression_user);
                var result = mapper.Map<IList<SimpleUserForAdminDTO>>(users);
                var user_result = users.Zip(result, (u, r) => new { User = u, Result = r });
                foreach (var ur in user_result)
                {
                    var roles = await userManager.GetRolesAsync(ur.User);
                    ur.Result.Roles = roles;
                }

                result = result.Where(u => u.Roles.Contains("User")).ToList();
                return Accepted(new { success = true, result = result, total = count });
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

     
    }
}
