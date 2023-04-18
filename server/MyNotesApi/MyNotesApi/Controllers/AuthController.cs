using IdentityModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using MyNotesApi.Contexts;
using MyNotesApi.DTOs;
using MyNotesApi.Entities;
using MyNotesApi.Helpers;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using MyNotesApi.Services.Abstracts;
using MyNotesApi.Helpers.Exceptions;
using System.Net;

namespace MyNotesApi.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IRedisCacheService _redisCacheService;
        private readonly IAuthService _authService;
        private readonly PostgreSqlDbContext _postgreSqlDbContext;        
        private readonly JwtSettings _jwtSettings;
        public AuthController(PostgreSqlDbContext postgreSqlDbContext, IOptions<JwtSettings> jwtSettings, IAuthService authService, IRedisCacheService redisCacheService
            )
        {
            _postgreSqlDbContext= postgreSqlDbContext;
            _jwtSettings= jwtSettings.Value;
            _authService= authService;
            _redisCacheService= redisCacheService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDTO requestBody)
        {
            string response = await _authService.Register(requestBody);
            return Ok(response);            
        }

        
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO requestBody)
        {
            LoginResponseDTO response = await _authService.Login(requestBody);
            return Ok(response);
        }
        /*
        [HttpGet("getCache")]
        public async Task<IActionResult> GetCache([FromQuery] string redisKey)
        {
            var retrievedValue = await _redisCacheService.GetValueAsync(redisKey);
            return Ok($"Retrieved Value: {retrievedValue}");
        }

        [HttpGet("postCache")]
        public async Task<IActionResult> PostCache([FromQuery] string redisKey, [FromQuery] string redisValue)
        {
            await _redisCacheService.SetValueAsync(redisKey, redisValue);
            return Ok($"Eklenen key: {redisKey} - Eklenen value: {redisValue}");
        }

        //[Authorize]
        [HttpGet("private1")]
        public async Task<IActionResult> Private1([FromQuery] string redisKey)
        {
            await _redisCacheService.Clear(redisKey);
            return Ok($"Silinen redis key: {redisKey}");
        }
        */
        private string GetJwtToken(JwtSettings jwtSettings, TimeSpan expiration, IEnumerable<Claim> claims = null)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.IssuerSigningKey));
            var token = new JwtSecurityToken(
                issuer: jwtSettings.ValidIssuer,
                audience: jwtSettings.ValidAudience,
                expires: DateTime.UtcNow.Add(expiration),
                claims: claims,
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            );
            
            return tokenHandler.WriteToken(token);
        }
    }
}
