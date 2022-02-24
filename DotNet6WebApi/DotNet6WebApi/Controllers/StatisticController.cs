using AutoMapper;
using DotNet6WebApi.Data;
using DotNet6WebApi.DTO;
using DotNet6WebApi.Helper;
using DotNet6WebAPI.Repository;
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
        public async Task<IActionResult> GetDashboardInfo()
        {
            return Accepted(new {success=true});
        }
        [HttpGet("SaleStatistic")]
        public async Task<IActionResult> GetSaleStatistic(string from, string to)
        {
            DateTime dfrom = DateTime.ParseExact(from, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            DateTime dto = DateTime.ParseExact(to, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            try
            {
                var orders = await unitOfWork.Orders.GetAll(q => q.Status == (int)OrderStatus.Done&&q.ShippedDate>dfrom&&q.ShippedDate<dto,null,null);
                var dic = new Dictionary<string, double>();
                foreach (var order in orders)
                {
                    if (!dic.ContainsKey(order.ShippedDate.ToShortDateString()))
                    {
                        dic.Add(order.ShippedDate.ToShortDateString(),order.TotalPrice);
                    }
                    else
                    {
                        dic[order.ShippedDate.ToShortDateString()]+=order.TotalPrice;
                    }
                }
                return Accepted(new {result = dic,success=true});
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("OrderStatistic")]
        public async Task<IActionResult> GetOrderStatistic(string from, string to)
        {
            DateTime dfrom = DateTime.ParseExact(from, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            DateTime dto = DateTime.ParseExact(to, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            try
            {
                var orders = await unitOfWork.Orders.GetAll(q => q.Status == (int)OrderStatus.Done && q.ShippedDate > dfrom && q.ShippedDate < dto, null, null);
                var dic = new Dictionary<string, int>();
                foreach (var order in orders)
                {
                    if (!dic.ContainsKey(order.ShippedDate.ToShortDateString()))
                    {
                        dic.Add(order.ShippedDate.ToShortDateString(), 1);
                    }
                    else
                    {
                        dic[order.ShippedDate.ToShortDateString()] += 1;
                    }
                }
                return Accepted(new { result = dic, success = true });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("TopProduct")]
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
