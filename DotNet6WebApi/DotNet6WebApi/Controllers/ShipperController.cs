using AutoMapper;
using DotNet6WebApi.Data;
using DotNet6WebApi.DTO;
using DotNet6WebApi.Helper;
using DotNet6WebAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;
namespace DotNet6WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShipperController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public ShipperController(IUnitOfWork _unitOfWork, IMapper _mapper)
        {
            unitOfWork = _unitOfWork;
            mapper = _mapper;
        }

        [HttpGet("getAvailableOrders")]
        [Authorize(Roles ="Shipper")]
        public async Task<IActionResult> GetAvailableOrders(string orderby,string sort, int pageNumber, int pageSize)
        {
            Func<IQueryable<Order>, IOrderedQueryable<Order>> orderBy = null;
            Expression<Func<Order, bool>> expression = q => q.Status == (int)OrderStatus.Checked;

            switch (orderby)
            {
                case "Id":
                    orderBy = (sort == "Asc") ? q => q.OrderBy(order => order.Id) : q => q.OrderByDescending(order => order.Id);
                    break;
                case "totalPrice":
                    orderBy = (sort == "Asc") ? q => q.OrderBy(order => order.TotalPrice) : q => q.OrderByDescending(order => order.TotalPrice);
                    break;
                case "contactName":
                    orderBy = (sort == "Asc") ? q => q.OrderBy(order => order.ContactName) : q => q.OrderByDescending(order => order.ContactName);
                    break;
                case "orderDate":
                    orderBy = (sort == "Asc") ? q => q.OrderBy(order => order.OrderDate) : q => q.OrderByDescending(order => order.OrderDate);
                    break;
                default:
                    orderBy = (sort == "Asc") ? q => q.OrderBy(order => order.Id) : q => q.OrderByDescending(order => order.Id);
                    break;
            }
            try
            {
                var orders = await unitOfWork.Orders.GetAll(expression, orderBy, new List<string> { "OrderDetails", "DiscountCode", "Shipper" }, new PaginationFilter(pageNumber, pageSize));
                var result = mapper.Map<IList<OrderDTO>>(orders);
                var total = await unitOfWork.Orders.GetCount(expression);

                return Ok(new { success = true ,result,total});
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.ToString() });
            }
        }

        [HttpPost("acceptOrder")]
        [Authorize(Roles = "Shipper")]
        public async Task<IActionResult> AcceptOrder([FromBody] AcceptOrderDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new { error = "Dữ liệu chưa hợp lệ", success = false });
            }
            try
            {
                var order = await unitOfWork.Orders.Get(q => q.Id == dto.OrderID);
                var shipper = await unitOfWork.Users.Get(q=>q.Id ==dto.ShipperId);
                if (order==null||shipper==null)
                {
                    return Ok(new { error = "Dữ liệu chưa hợp lệ", success = false });
                }
                if (order.Status != (int) OrderStatus.Checked)
                {
                    return Ok(new { error = "Đơn hàng chưa hợp lệ", success = false });
                }
                order.ShipperID = shipper.Id;
                order.Status = (int) OrderStatus.Delivering;
                unitOfWork.Orders.Update(order);
                await unitOfWork.Save();
                return Ok(new {  success = true,order });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}/getAcceptedOrders")]
        [Authorize(Roles = "Shipper")]
        public async Task<IActionResult> GetAcceptedOrders(string id,string orderby, string sort, int pageNumber, int pageSize)
        {
            Func<IQueryable<Order>, IOrderedQueryable<Order>> orderBy = null;
            Expression<Func<Order, bool>> expression = q => q.Status == (int)OrderStatus.Delivering && q.ShipperID==id;

            switch (orderby)
            {
                case "Id":
                    orderBy = (sort == "Asc") ? q => q.OrderBy(order => order.Id) : q => q.OrderByDescending(order => order.Id);
                    break;
                case "totalPrice":
                    orderBy = (sort == "Asc") ? q => q.OrderBy(order => order.TotalPrice) : q => q.OrderByDescending(order => order.TotalPrice);
                    break;
                case "contactName":
                    orderBy = (sort == "Asc") ? q => q.OrderBy(order => order.ContactName) : q => q.OrderByDescending(order => order.ContactName);
                    break;
                case "orderDate":
                    orderBy = (sort == "Asc") ? q => q.OrderBy(order => order.OrderDate) : q => q.OrderByDescending(order => order.OrderDate);
                    break;
                default:
                    orderBy = (sort == "Asc") ? q => q.OrderBy(order => order.Id) : q => q.OrderByDescending(order => order.Id);
                    break;
            }
            try
            {
                var orders = await unitOfWork.Orders.GetAll(expression, orderBy, new List<string> { "OrderDetails","DiscountCode", "Shipper" }, new PaginationFilter(pageNumber, pageSize));
                var result = mapper.Map<IList<OrderDTO>>(orders);
                var total = await unitOfWork.Orders.GetCount(expression);

                return Ok(new { success = true, result, total });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.ToString() });
            }
        }

        [HttpPost("completeOrder")]
        [Authorize(Roles = "Shipper")]
        public async Task<IActionResult> CompleteOrder([FromBody] CompleteOrderDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new { error = "Dữ liệu chưa hợp lệ", success = false });
            }
            try
            {
                var order = await unitOfWork.Orders.Get(q => q.Id == dto.OrderID);
                var shipper = await unitOfWork.Users.Get(q => q.Id == dto.ShipperId);
                if (order == null || shipper == null)
                {
                    return Ok(new { error = "Dữ liệu chưa hợp lệ", success = false });
                }
                if (order.Status != (int)OrderStatus.Delivering)
                {
                    return Ok(new { error = "Đơn hàng chưa hợp lệ", success = false });
                }
                order.Status = dto.Status;
                order.ShippedDate = dto.ShippedDate;
                order.Note = dto.Note;
                unitOfWork.Orders.Update(order);
                await unitOfWork.Save();
                return Ok(new { success = true, order });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}/getDeliverHistory")]
        [Authorize(Roles = "Shipper,Administrator")]
        public async Task<IActionResult> GetDeliverHistory(string id, string orderby, string sort, int pageNumber, int pageSize)
        {
            Func<IQueryable<Order>, IOrderedQueryable<Order>> orderBy = null;
            Expression<Func<Order, bool>> expression = q => (q.Status == (int)OrderStatus.Done||q.Status==(int)OrderStatus.Canceled) && q.ShipperID == id;

            switch (orderby)
            {
                case "Id":
                    orderBy = (sort == "Asc") ? q => q.OrderBy(order => order.Id) : q => q.OrderByDescending(order => order.Id);
                    break;
                case "totalPrice":
                    orderBy = (sort == "Asc") ? q => q.OrderBy(order => order.TotalPrice) : q => q.OrderByDescending(order => order.TotalPrice);
                    break;
                case "contactName":
                    orderBy = (sort == "Asc") ? q => q.OrderBy(order => order.ContactName) : q => q.OrderByDescending(order => order.ContactName);
                    break;
                case "orderDate":
                    orderBy = (sort == "Asc") ? q => q.OrderBy(order => order.OrderDate) : q => q.OrderByDescending(order => order.OrderDate);
                    break;
                case "shippedDate":
                    orderBy = (sort == "Asc") ? q => q.OrderBy(order => order.ShippedDate) : q => q.OrderByDescending(order => order.ShippedDate);
                    break;
                default:
                    orderBy = (sort == "Asc") ? q => q.OrderBy(order => order.Id) : q => q.OrderByDescending(order => order.Id);
                    break;
            }
            try
            {
                var orders = await unitOfWork.Orders.GetAll(expression, orderBy, new List<string> { "OrderDetails", "DiscountCode", "Shipper" }, new PaginationFilter(pageNumber, pageSize));
                var result = mapper.Map<IList<OrderDTO>>(orders);
                var total = await unitOfWork.Orders.GetCount(expression);

                return Ok(new { success = true, result, total });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.ToString() });
            }
        }


        [HttpGet("{id}/dashboardInfo")]
        [Authorize(Roles = "Shipper,Administrator")]
        public async Task<IActionResult> GetDashboardInfo(string id)
        {
            Expression<Func<Order, bool>> expression_available = q => q.Status == (int)OrderStatus.Checked;
            Expression<Func<Order, bool>> expression_accepted = q => q.Status == (int)OrderStatus.Delivering && q.ShipperID == id;
            Expression<Func<Order, bool>> expression_history = q => (q.Status == (int)OrderStatus.Done || q.Status == (int)OrderStatus.Canceled) && q.ShipperID == id;
            try
            {
                var orderAvailable = await unitOfWork.Orders.GetCount(expression_available);
                var orderAccepted = await unitOfWork.Orders.GetCount(expression_accepted);
                var orderHistory = await unitOfWork.Orders.GetCount(expression_history);

                return Ok(new { success = true, done=orderHistory, delivering=orderAccepted,available=orderAvailable });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.ToString() });
            }
        }
    }
}
