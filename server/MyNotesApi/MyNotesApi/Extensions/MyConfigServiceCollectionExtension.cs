using Microsoft.AspNetCore.Http;
using MyNotesApi.Contexts;
using MyNotesApi.Helpers;
using MyNotesApi.Middlewares;
using MyNotesApi.Services.Abstracts;
using MyNotesApi.Services.Concretes;

namespace MyNotesApi.Extensions
{
    public static class MyConfigServiceCollectionExtension
    {
        public static IServiceCollection AddMyConfigs(
         this IServiceCollection services, IConfiguration config)
        //Buranın içerisine configuration için kullanacağımız classları ekleyebiliriz. `appsettings` içerisinden valueleri bind ettiğimiz bu classları daha sonra çağırarak bind edilen valuelere erişebiliriz
        {            
            services.AddCors(options => {
                options.AddPolicy("AllowAll",
                    policy => {
                        policy.
                        AllowAnyOrigin() //Gelen requestin hangi originden gelip gelmediğine bakmaz
                        .AllowAnyMethod() //Gelen requestin hangi metod[GET, POST, vs] olduğuna bakmaz
                        .AllowAnyHeader(); //Gelen tüm headerları kabul eder
                    });
            });
            services.Configure<JwtSettings>(config.GetSection(JwtSettings.JwtTokenSettings));
            services.Configure<RedisSettings>(config.GetSection(RedisSettings.RedisDbSettings));
            services.AddResponseCaching();
            return services;
        }
        public static IServiceCollection AddMyDependencyGroups( //Buraya ise servis registrationlarını ekleyebiliriz
             this IServiceCollection services)
        {
            
            services.AddDbContext<PostgreSqlDbContext>();
            services.AddSingleton<IRedisCacheService, RedisCacheService>();
            services.AddScoped<IAuthService, AuthService>();
            return services;
        }
        public static void AddMyMiddlewares(this IApplicationBuilder app)
        {
            app.UseCors("AllowAll");            
            app.UseMiddleware<CustomExceptionHandlerMiddleware>();
            app.UseMiddleware<MyCustomMiddleware>(); //Bu şekilde sınırsız miktarda middlewarei extensiona ekleyebliriz, eklenme sıralarına göre çalışırlar
            app.UseResponseCaching();
        }
    }
}
