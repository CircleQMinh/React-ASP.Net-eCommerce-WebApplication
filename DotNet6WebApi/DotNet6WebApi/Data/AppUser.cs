using Microsoft.AspNetCore.Identity;

namespace DotNet6WebApi.Data
{
    public class AppUser:IdentityUser
    {
        public string? imgUrl { get; set; }
    }
}
