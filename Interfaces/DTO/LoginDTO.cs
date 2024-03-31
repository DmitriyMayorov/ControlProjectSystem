using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interfaces.DTO
{
    public class LoginDTO
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; } = null!;
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Пароль")]
        public string Password { get; set; } = null!;
        [Display(Name = "Запомнить?")]
        public bool RememberMe { get; set; }
    }
}
