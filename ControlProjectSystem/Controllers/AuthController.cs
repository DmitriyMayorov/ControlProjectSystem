using DomainModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Interfaces.DTO;
using BusinesLogic.Service;
using Interfaces.Services;

namespace ControlProjectSystem.Controllers
{
    [ApiController]
    public class AuthController : Controller
    {
        private IWorkerService _workerService;
        private SignInManager<User>? signInManager;
        private UserManager<User>? userManager;
        private RoleManager<IdentityRole> roleManager;

        public AuthController(IWorkerService workerService, SignInManager<User> signInManager, UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            _workerService = workerService;
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }
        private Task<User> GetCurrentUserAsync() => userManager.GetUserAsync(HttpContext.User);

        [HttpPost]
        [Route("api/account/register")]
        public async Task<IActionResult> Register(RegisterDTO reg)
        {
            if (!ModelState.IsValid ||
                userManager == null ||
                signInManager == null)
            {
                var errorMsg = new
                {
                    message = "Неверные входные данные",
                    error = ModelState.Values.SelectMany(e => e.Errors.Select(er => er.ErrorMessage))
                };
                return Created("", errorMsg);
            }

            User user = new User()
            {
                UserName = reg.Email,
                Email = reg.Email,
                idWorker = reg.idWorker
            };

            if (await roleManager.RoleExistsAsync(reg.Role))
            {
                //Добавление нового пользователя
                var result = await userManager.CreateAsync(user, reg.Password);
                //Если успешно, тот добавление куки и роли к пользователю
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, reg.Role);
                    await signInManager.SignInAsync(user, false);
                    return Ok(new { message = "Добавлен новый пользователь: " + user.UserName });
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        //Получение ошибок
                        ModelState.AddModelError(string.Empty, error.Description);
                    }
                    var errorMsg = new
                    {
                        //Создание сообщения об ошибки 
                        message = "Пользователь не добавлен",
                        error = ModelState.Values.SelectMany(e => e.Errors.Select(er => er.ErrorMessage))
                    };
                    return Created("", errorMsg);
                }
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { message = "Ошибка", error = "Роли не существует" });
            }
        }

        [HttpPost]
        [Route("api/account/login")]
        public async Task<IActionResult> Login(LoginDTO login)
        {
            //Невалидность
            if (!ModelState.IsValid ||
                userManager == null ||
                signInManager == null)
            {
                var errorMsg = new
                {
                    message = "Неверные входные данные",
                    error = ModelState.Values.SelectMany(e => e.Errors.Select(er => er.ErrorMessage))
                };
                return Created("", errorMsg);
            }

            //Проверка авторизации
            var result = await signInManager.PasswordSignInAsync(login.Email, login.Password, login.RememberMe, false);
            if (result.Succeeded)
            {
                User? user = await userManager.GetUserAsync(HttpContext.User);
                IEnumerable<string> roles = await userManager.GetRolesAsync(user);
                //Созание DTO на пользователя для передачи авторизованного пользователя на клиентскую часть
                UserDTO responseUser = new UserDTO()
                {
                    username = user.UserName,
                    email = user.Email,
                    workerId = user.idWorker,
                    roles = roles.First()
                };
                return Ok(new { message = "Выполнен вход", userName = login.Email, responseUser });
            }
            else
            {
                ModelState.AddModelError("", "Неправильный логин и (или) пароль");
                var errorMsg = new
                {
                    message = "Вход не выполнен",
                    error = ModelState.Values.SelectMany(e => e.Errors.Select(er => er.ErrorMessage))
                };
                return Created("", errorMsg);
            }
        }

        [HttpPost]
        [Route("api/account/logoff")]
        public async Task<IActionResult> Logoff()
        {
            User usr = await GetCurrentUserAsync();
            if (usr == null)
            {
                return Unauthorized(new { message = "Сначала выполните вход" });
            }

            //Удаление куки и выход из авторизованного пользователя
            await signInManager.SignOutAsync();
            return Ok(new { message = "Выполнен выход", userName = usr.UserName });
        }

        [HttpGet]
        [Route("api/account/isauthenticated")]
        public async Task<IActionResult> IsAuthenticated()
        {
            User responseUser = await GetCurrentUserAsync();
            //Получение пользователя и общая проверка на авторизацию
            if (responseUser == null)
            {
                return Unauthorized(new { message = "Вы Гость. Пожалуйста, выполните вход" });
            }
            //Получение роли
            IList<string>? roles = await userManager.GetRolesAsync(responseUser);
            string? userRole = roles.FirstOrDefault();
            //Отправление DTO пользователя с полученной для него ролью
            UserDTO mainuser = new UserDTO()
            {
                username = responseUser.UserName,
                email = responseUser.Email,
                workerId = responseUser.idWorker,
                roles = userRole
            };
            return Ok(mainuser);

        }
    }
}
