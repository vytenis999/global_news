using Core.Entities.Identity;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AppIdentityDbContext>(opt =>
            {
                opt.UseSqlServer(configuration.GetConnectionString("IdentityConnection"));
            });

            services.AddIdentityCore<AppUser>(opt =>
            {
                // identity options
            })
            .AddEntityFrameworkStores<AppIdentityDbContext>()
            .AddSignInManager<SignInManager<AppUser>>();

            services.AddAuthentication();
            services.AddAuthorization();

            return services;
        }
    }
}
