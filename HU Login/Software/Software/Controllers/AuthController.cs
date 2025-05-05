using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Software.Business;
using Software.Models.Request;

namespace Software.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest("Datos de entrada inválidos");

            var response = await _authService.LoginAsync(request);

            if (response == null)
                return Unauthorized("Credenciales incorrectas");

            return Ok(response);
        }
    }
}
