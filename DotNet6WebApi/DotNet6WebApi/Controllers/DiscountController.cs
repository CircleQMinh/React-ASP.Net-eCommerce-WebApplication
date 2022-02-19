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
    public class DiscountController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public DiscountController(IUnitOfWork _unitOfWork, IMapper _mapper)
        {
            unitOfWork = _unitOfWork;
            mapper = _mapper;
        }
        [HttpGet]
       // [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetDiscountCode(string status,string type , int pageNumber, int pageSize)
        {
            try
            {
                Expression<Func<DiscountCode, bool>> expression = q=>true;
                Expression<Func<DiscountCode, bool>> expression_status = q=>true;
                Expression<Func<DiscountCode, bool>> expression_type = q => true;

                switch (status)
                {
                    case "all":
                        break;
                    case "0":
                        expression_status = q => q.Status == 0;
                        break;
                    case "1":
                        expression_status = q => q.Status == 1;
                        break;
                    default:
                        break;
                }
                expression = expression.AndAlso(expression_status);
                switch (type)
                {
                    case "all":
                        break;
                    case "percent":
                        expression_type = q => q.DiscountPercent != null;
                        break;
                    case "amount":
                        expression_type = q => q.DiscountAmount != null;
                        break;
                    default:
                        break;
                }
                expression = expression.AndAlso(expression_type);

                var codes = await unitOfWork.DiscountCodes.GetAll(expression,null,null,new PaginationFilter(pageNumber, pageSize));
                var result = mapper.Map<IList<DiscountCodeDTO>>(codes);
                var total = await unitOfWork.DiscountCodes.GetCount(expression);
                return Ok(new { success = true,result,total});
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> CreateDiscountCode(CreateDiscountCodeDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new { error = "Dữ liệu chưa hợp lệ", success = false });
            }
            try
            {
                var newEntity = mapper.Map<DiscountCode>(dto);
                await unitOfWork.DiscountCodes.Insert(newEntity);
                await unitOfWork.Save();
                return Ok(new { discountCode = newEntity, success = true });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> PutDiscountCode([FromBody] CreateDiscountCodeDTO dto, int id)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new { error = "Dữ liệu chưa hợp lệ", success = false });
            }
            try
            {
                var dc =  await unitOfWork.DiscountCodes.Get(q => q.Id == id);
                if (dc == null)
                {
                    return Ok(new { error = "Không tìm thấy dữ liệu", success = false });
                }
                mapper.Map(dto, dc);
                unitOfWork.DiscountCodes.Update(dc);
                await unitOfWork.Save();

                return Ok(new { discountCode = dc, success = true });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpDelete("{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteDC(int id)
        {
            try
            {
                var dc = await unitOfWork.DiscountCodes.Get(q => q.Id == id);
                if (dc == null)
                {
                    return Ok(new { success = false, msg = "Không tìm thấy mã!" });
                }
                await unitOfWork.DiscountCodes.Delete(dc.Id);
                await unitOfWork.Save();
                return Ok(new { success = true });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.ToString() });
            }
        }

        [HttpGet("applyDiscountCode")]
        [Authorize]
        public async Task<IActionResult> applyDiscountCode(string code)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { error = "error" });
            }
            try
            {
                DateTime today = DateTime.Today;
                var dc = await unitOfWork.DiscountCodes.Get(q => q.Code == code);
                if (dc == null)
                {
                    return Accepted(new { success = false, msg = "Mã không hợp lệ!" });
                }
                else if (dc.Status == 1)
                {
                    return Accepted(new { success = false, msg = "Mã đã được sử dụng!" });
                }
                else if (dc.StartDate>today)
                {
                    return Accepted(new { success = false, msg = "Mã chưa thể sử dụng!" });

                }
                else if (dc.EndDate<today)
                {
                    return Accepted(new { success = false, msg = "Mã đã hết hạn!" });
                }
                return Accepted(new { success = true, discountCode = dc });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.ToString() });
            }
        }

        [HttpPost("redeemDiscountCode")]
        [Authorize]
        public async Task<IActionResult> RedeemDiscount([FromBody]RedeemDiscountCodeDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new { error = "Dữ liệu chưa hợp lệ", success = false });
            }
            try
            {

                var user = await unitOfWork.Users.Get(q=>q.Id==dto.UserId);
                if (user==null)
                {
                    return Ok(new { success = false, msg = "Không tìm thấy user!" });
                }
                var requireCoins = 0;
                var dc = new DiscountCode();

                switch (dto.DicountMode)
                {
                    case "Amount10K":
                        requireCoins = (int) DiscountCodeCost.Amount10K;
                        dc.DiscountAmount = DiscountCodeValue.Amount10K.ToString("D");
                        break;
                    case "Amount20K":
                        requireCoins = (int)DiscountCodeCost.Amount20K;
                        dc.DiscountAmount = DiscountCodeValue.Amount20K.ToString("D");
                        break;
                    case "Amount50K":
                        requireCoins = (int)DiscountCodeCost.Amount50K;
                        dc.DiscountAmount = DiscountCodeValue.Amount50K.ToString("D");
                        break;
                    case "Percent10":
                        requireCoins = (int)DiscountCodeCost.Percent10;
                        dc.DiscountPercent = DiscountCodeValue.Percent10.ToString("D");
                        break;
                    case "Percent20":
                        requireCoins = (int)DiscountCodeCost.Percent20;
                        dc.DiscountPercent = DiscountCodeValue.Percent20.ToString("D");
                        break;
                    case "Percent50":
                        requireCoins = (int)DiscountCodeCost.Percent50;
                        dc.DiscountPercent = DiscountCodeValue.Percent50.ToString("D");
                        break;
                }
                if (user.Coins<requireCoins)
                {
                    return Ok(new { success = false, msg = "Không đủ shop xu!" });
                }


                dc.Code = Utility.RandomString(8);


                dc.StartDate = DateTime.Today;
                dc.EndDate = DateTime.Today.AddDays(30);

                await unitOfWork.DiscountCodes.Insert(dc);
                await unitOfWork.Save();

                return Ok(new {  discountCode=dc,success = true });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
