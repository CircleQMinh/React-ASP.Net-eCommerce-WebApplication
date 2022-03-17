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

namespace DotNet6WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly IAuthManager authManager;
        private readonly UserManager<AppUser> userManager;
        public StatisticController(IUnitOfWork _unitOfWork, IMapper _mapper, UserManager<AppUser> _userManager, IAuthManager _authManager)
        {
            userManager = _userManager;
            unitOfWork = _unitOfWork;
            mapper = _mapper;
            authManager = _authManager;
        }
        [HttpGet("DashboardInfo")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetDashboardInfo()
        {
            try
            {
                var userCount = await unitOfWork.Users.GetCount(null);
                var productCount = await unitOfWork.Books.GetCount(null);
                var orderCount = await unitOfWork.Orders.GetCount(q => q.Status == (int)OrderStatus.Done);
                var uncheckOrderCount = await unitOfWork.Orders.GetCount(q => q.Status == (int)OrderStatus.NotChecked);


                return Accepted(new { success = true,userCount,productCount,orderCount,uncheckOrderCount });
            }
            catch(Exception ex)
            {
                //return new StatusCodeResult(StatusCodes.Status500InternalServerError);
                return BadRequest(ex.Message);
            }

        }
        [HttpGet("SaleStatistic")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetSaleStatistic(string from, string to)
        {
            DateTime dfrom = DateTime.ParseExact(from, "yyyy-MM-dd", null);
            DateTime dto = DateTime.ParseExact(to, "yyyy-MM-dd", null);
            dto = dto.AddDays(1);

            var test = dto.ToLongDateString();
            try
            {
                var orders = await unitOfWork.Orders.GetAll(q => q.Status == (int)OrderStatus.Done&&q.ShippedDate>dfrom&&q.ShippedDate<dto,null,null);
                var dic = new Dictionary<string, double>();
                foreach (var order in orders)
                {
                    if (!dic.ContainsKey(order.ShippedDate.ToString("dd/MM/yyyy")))
                    {
                        dic.Add(order.ShippedDate.ToString("dd/MM/yyyy"),order.TotalPrice);
                    }
                    else
                    {
                        dic[order.ShippedDate.ToString("dd/MM/yyyy")] +=order.TotalPrice;
                    }
                }

                var sort =dic.OrderBy(item => DateTime.ParseExact(item.Key, "dd/MM/yyyy", null));
                var sortedDict = sort.ToDictionary(pair => pair.Key, pair => pair.Value);
                return Accepted(new { result = sortedDict, success = true});
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("OrderStatistic")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetOrderStatistic(string from, string to)
        {
            DateTime dfrom = DateTime.ParseExact(from, "yyyy-MM-dd", null);
            DateTime dto = DateTime.ParseExact(to, "yyyy-MM-dd", null);
            dto = dto.AddDays(1);


            if (dfrom>dto)
            {
                return Ok(new { error = "Dữ liệu nhập không hợp lệ",success=true });
            }

            try
            {
                var orders = await unitOfWork.Orders.GetAll(q => q.Status == (int)OrderStatus.Done && q.ShippedDate > dfrom&& q.ShippedDate <= dto, null, null);
                var dic = new Dictionary<string, int>();
                foreach (var order in orders)
                {
                    if (!dic.ContainsKey(order.ShippedDate.ToString("dd/MM/yyyy")))
                    {
                        dic.Add(order.ShippedDate.ToString("dd/MM/yyyy"), 1);
                    }
                    else
                    {
                        dic[order.ShippedDate.ToString("dd/MM/yyyy")] += 1;
                    }
                }
                var sort = dic.OrderBy(item => DateTime.ParseExact(item.Key, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                var sortedDict = sort.ToDictionary(pair => pair.Key, pair => pair.Value);
                return Accepted(new { result = sortedDict, success = true });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("TopProduct")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetTopProduct(int numberOfBook)
        {
            try
            {
                var orderDetails = await unitOfWork.OrderDetails.GetAll(q => q.Order.Status == (int)OrderStatus.Done, null, new List<string> { "Book" });
                Dictionary<int, int> dic = new Dictionary<int, int>();
                foreach (var od in orderDetails)
                {
                    if (!dic.ContainsKey(od.BookId))
                    {
                        dic.Add(od.BookId, od.Quantity);
                    }
                    else
                    {
                        dic[od.BookId] += od.Quantity;
                    }
                }
                List<PopularBookDTO> result = new List<PopularBookDTO>();
                foreach (var item in dic)
                {
                    var od = orderDetails.Where(q => q.BookId == item.Key).FirstOrDefault();
                    var rs = new PopularBookDTO() { Book = mapper.Map<BookDTO>(od.Book), Sales = item.Value };
                    result.Add(rs);
                }

                result.Sort((a, b) => b.Sales - a.Sales); //Desc
                result = result.Take(numberOfBook).ToList();

                foreach (var item in result)
                {
                    var temp = await unitOfWork.Books.Get(q => q.Id == item.Book.Id, new List<string> { "Authors", "Genres", "Publisher", "PromotionInfo", "WishlistUsers" });
                    item.Book = mapper.Map<BookDTO>(temp);
                }


                return Ok(new { result }); ;
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.ToString() });
            }
        }
    }
}
