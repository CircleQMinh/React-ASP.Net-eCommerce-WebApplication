using AutoMapper;
using DotNet6WebApi.Data;
using DotNet6WebApi.DTO;
using DotNet6WebApi.Helper;
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

        [HttpGet("all")]
        public async Task<IActionResult> FindAll(string type,string searchBy,string keyword, int pageNumber=1, int pageSize = 10)
        {
            try
            {
                Expression<Func<Book, bool>> expression_book = null;
                Expression<Func<AppUser, bool>> expression_user = null;
                Expression<Func<Order, bool>> expression_order = null;
                dynamic listFromQuery;
                dynamic result;
                int count = 0;

                switch (type, searchBy)
                {
                    case ("Product", "Name"):
                        expression_book = q => q.Title.Contains(keyword);
                        listFromQuery = await unitOfWork.Books.GetAll(
                        expression_book,
                        null,
                        new List<string> { "Authors", "Genres", "Publisher", "PromotionInfo", "WishlistUsers" },
                        new PaginationFilter(pageNumber, pageSize));
                        count = await unitOfWork.Books.GetCount(expression_book);
                        result = mapper.Map<IList<BookDTO>>(listFromQuery);
                        return Accepted(new { success = true, result = result, total = count });
                    case ("Product", "Id"):
                        expression_book = q => q.Id == Int32.Parse(keyword);
                        listFromQuery = await unitOfWork.Books.GetAll(
                        expression_book,
                        null,
                        new List<string> { "Authors", "Genres", "Publisher", "PromotionInfo", "WishlistUsers" },
                        new PaginationFilter(pageNumber, pageSize));
                        count = await unitOfWork.Books.GetCount(expression_book);
                        result = mapper.Map<IList<BookDTO>>(listFromQuery);
                        return Accepted(new { success = true, result = result, total = count });

                    case ("Order", "Name"):
                        expression_order = q=>q.ContactName.Contains(keyword);
                        listFromQuery = await unitOfWork.Orders.GetAll(
                          expression_order,
                          null,
                          new List<string> { "OrderDetails", "Shipper", "DiscountCode" },
                          new PaginationFilter(pageNumber, pageSize));
                        count = await unitOfWork.Orders.GetCount(expression_order);
                        result = mapper.Map<IList<OrderDTO>>(listFromQuery);
                        return Accepted(new { success = true, result = result, total = count });
                    

                    case ("Order", "Id"):
                        expression_order = q => q.Id==Int32.Parse(keyword);
                        listFromQuery = await unitOfWork.Orders.GetAll(
                          expression_order,
                          null,
                          new List<string> { "OrderDetails", "Shipper", "DiscountCode" },
                          new PaginationFilter(pageNumber, pageSize));
                        count = await unitOfWork.Orders.GetCount(expression_order);
                        result = mapper.Map<IList<OrderDTO>>(listFromQuery);
                        return Accepted(new { success = true, result = result, total = count });

                    case ("User", "Id"):
                        expression_user = q => q.Id == keyword;
                        listFromQuery= await unitOfWork.Users.GetAll(
                            expression_user,
                            null,null,new PaginationFilter(pageNumber,pageSize));
                        count = await unitOfWork.Users.GetCount(expression_user);
                        result = mapper.Map<IList<SimpleUserForAdminDTO>>(listFromQuery);
                        return Accepted(new { success = true, result = result, total = count });
                       
                    case ("User", "Name"):
                        expression_user = q => q.UserName.Contains(keyword);
                        listFromQuery = await unitOfWork.Users.GetAll(
                            expression_user,
                            null, null, new PaginationFilter(pageNumber, pageSize));
                        count = await unitOfWork.Users.GetCount(expression_user);
                        result = mapper.Map<IList<SimpleUserForAdminDTO>>(listFromQuery);
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
    }
}
