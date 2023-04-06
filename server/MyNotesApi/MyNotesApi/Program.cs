using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.Extensions.Configuration;
using MyNotesApi.Extensions;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);
//var multiplexer = ConnectionMultiplexer.Connect(builder.Configuration.GetSection("RedisDbSettings:Host").Value);
//builder.Services.AddSingleton<IConnectionMultiplexer>(multiplexer);
// Add services to the container.
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMyConfigs(builder.Configuration).AddMyDependencyGroups();

var app = builder.Build();
//app.UseCookiePolicy(cookiePolicyOptions);
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.AddMyMiddlewares();
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
