using DomainModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interfaces.DTO
{
    public class UserDTO
    {
        public string username { get; set; } = null!;

        public string email { get; set; } = null!;

        public int? workerId { get; set; } = null!;

        public string roles { get; set; } = null!;
    }
}
