using AutoMapper;
using DotNet6WebApi.Data;
using DotNet6WebApi.DTO;
using DotNet6WebApi.Helper;
using DotNet6WebAPI.Repository;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DotNet6WebApi.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountControler : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly IAuthManager authManager;
        private readonly SignInManager<AppUser> signInManager;
        public AccountControler(UserManager<AppUser> _userManager, IUnitOfWork _unitOfWork, IMapper _mapper, IAuthManager _authManager, SignInManager<AppUser> _signManager)
        {
            userManager = _userManager;
            signInManager = _signManager;
            unitOfWork = _unitOfWork;
            mapper = _mapper;
            authManager = _authManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                try
                {
                    var user = mapper.Map<AppUser>(dto);
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
                    var results = mapper.Map<SimpleUserDTO>(user);
                    var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
                    EmailHelper emailHelper = new EmailHelper();
                    string emailResponse = emailHelper.SendEmailConfirm(user.Email, token, dto.UserName);
                    return Ok(new { user = user, success = true, emailResponse = emailResponse });

                }
                catch (Exception ex)
                {
                    return BadRequest(new { error = ex.Message });
                }
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                if (!await authManager.ValidateUser(dto))
                {
                    var error = "Thông tin đăng nhập không chính xác! Xin hãy thử lại.";
                    return Accepted(new { success = false, msg = error });
                }
                AppUser u = await userManager.FindByEmailAsync(dto.Email);
                if (!u.EmailConfirmed)
                {
                    var error = "Bạn chưa xác thục tài khoản! Hãy kiểm tra email để xác thực.";
                    return Accepted(new { msg = error });
                }

                var roles = await userManager.GetRolesAsync(u);
                var results = mapper.Map<SimpleUserDTO>(u);
                results.Roles = roles;
                return Accepted(new { success = true, Token = await authManager.CreateToken(), user = results, roles });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
        [HttpPost("confirmEmail")]
        public async Task<IActionResult> ConfirmEmail([FromBody] ConfirmEmailDTO ce)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var user = await userManager.FindByEmailAsync(ce.email);
                if (user == null)
                {
                    var msg = "Người dùng không tồn tại";
                    return Accepted(new { msg, success = false });
                }
                var result = await userManager.ConfirmEmailAsync(user, ce.token);

                if (result.Succeeded)
                {
                    return Accepted(new { success = true });
                }
                else
                {
                    var msg = "Token không hợp lệ";
                    return Accepted(new { msg, success = false });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }

        }
        [HttpPost("requestNewPassword")]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            AppUser user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                var error = "Không tìm thấy tài khoản với email!";
                return Accepted(new { msg = error, success = false });
            }
            if (!await userManager.IsEmailConfirmedAsync(user))
            {
                var error = "Tài khoản chưa xác thực!";
                return Accepted(new { msg = error, success = false });
            }

            var token = await userManager.GeneratePasswordResetTokenAsync(user);
            EmailHelper emailHelper = new EmailHelper();
            string emailResponse = emailHelper.SendEmailResetPassword(user.Email, token, user.UserName);

            //var emailResponse = "true";

            return Accepted(new { success = emailResponse });
        }
        [HttpPost("confirmNewPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO unitDTO)
        {
            AppUser user = await userManager.FindByEmailAsync(unitDTO.Email);
            if (user == null)
            {
                var error = "Không tìm thấy tài khoản với email!";
                return Accepted(new { success = false, msg = error });
            }
            if (!await userManager.IsEmailConfirmedAsync(user))
            {
                var error = "Tài khoản chưa xác thực!";
                return Accepted(new { msg = error, success = false });
            }
            var result = await userManager.ResetPasswordAsync(user, unitDTO.Token, unitDTO.Password);
            if (result.Succeeded)
            {
                return Accepted(new { success = true });
            }
            else
            {
                var error = "Hành động không thành công. Xin hãy thử lại";
                return Accepted(new { success = false, msg = error });

            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAccountInfo(string id)
        {
            try
            {
                var user = await userManager.FindByIdAsync(id);
                if (user == null)
                {
                    return Ok(new { success = false, msg = "Không tìm thấy người dùng" });
                }
                var roles = await userManager.GetRolesAsync(user);
                var result = mapper.Map<SimpleUserDTO>(user);
                result.Roles=roles;
                return Ok(new { result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.ToString() });
            }
        }

        //[HttpPost]

        //public IActionResult ExternalLogin(string provider, string returnUrl = null)
        //{
        //    // Request a redirect to the external login provider.
        //    var redirectUrl = Url.Action(nameof(ExternalLoginCallback), "Account", new { returnUrl });
        //    var properties = signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
        //    return Challenge(properties, provider);
        //}
        //[TempData]
        //public string ErrorMessage { get; set; }
        //[HttpGet]
        //[AllowAnonymous]
        //public async Task<IActionResult> ExternalLoginCallback(string returnUrl = null)
        //{
       
        //    var info = await signInManager.GetExternalLoginInfoAsync();
        //    if (info == null)
        //    {
        //        return RedirectToAction(nameof(ExternalLogin));
        //    }
        //    // Sign in the user with this external login provider if the user already has a login.
        //    var result = await signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false, bypassTwoFactor: true);
        //    if (result.Succeeded)
        //    {
        //        var user = await userManager.FindByEmailAsync(info.Principal.FindFirstValue(ClaimTypes.Email));
        //        return Accepted(new { success = "OK", user=user });
        //        //_logger.LogInformation("User logged in with {Name} provider.", info.LoginProvider);
        //        //return RedirectToAction(nameof(returnUrl));
        //    }
        //    else
        //    {
        //        string email = string.Empty;
        //        string firstName = string.Empty;
        //        string lastName = string.Empty;
        //        string profileImage = string.Empty;
        //        //get google login user infromation like that.
        //        if (info.Principal.HasClaim(c => c.Type == ClaimTypes.Email))
        //        {
        //            email = info.Principal.FindFirstValue(ClaimTypes.Email);
        //        }
        //        if (info.Principal.HasClaim(c => c.Type == ClaimTypes.GivenName))
        //        {
        //            firstName = info.Principal.FindFirstValue(ClaimTypes.GivenName);
        //        }
        //        if (info.Principal.HasClaim(c => c.Type == ClaimTypes.GivenName))
        //        {
        //            lastName = info.Principal.FindFirstValue(ClaimTypes.Surname);
        //        }
        //        if (info.Principal.HasClaim(c => c.Type == "picture"))
        //        {
        //            profileImage = info.Principal.FindFirstValue("picture");
        //        }
        //        var user = new AppUser { UserName = email, Email = email, EmailConfirmed = true,imgUrl=profileImage };
        //        var result2 = await userManager.CreateAsync(user);
        //        if (result2.Succeeded)
        //        {
        //            result2 = await userManager.AddLoginAsync(user, info);
        //            if (result2.Succeeded)
        //            {
        //                //do somethng here
        //            }
        //        }
        //        return Accepted(new { success = "OK",user=user }); 
        //    }
        //}
    }
}
