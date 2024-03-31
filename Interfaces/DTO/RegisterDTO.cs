using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interfaces.DTO
{
    public class RegisterDTO
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; } = null!;

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; } = null!;

        [Required]
        [Compare("Password", ErrorMessage = "Пароли не совпадают")]
        [DataType(DataType.Password)]
        public string PasswordConfirm { get; set; } = null!;

        [Range(0, int.MaxValue, ErrorMessage = "Пожалуйста введите корректный номер")]
        public int IdWorker { get; set; }

        [Required]
        public string Role { get; set; } = null!;
    }
}
