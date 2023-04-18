using MyNotesApi.DTOs;

namespace MyNotesApi.Services.Abstracts
{
    public interface IAuthService
    {
        public Task<LoginResponseDTO> Login(LoginRequestDTO requestBody);
        public Task<string> Register(RegisterRequestDTO requestBody);
    }
}
