using DomainModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interfaces.DTO
{
    public class ProjectDTO
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public DateOnly DeadLine { get; set; }

        public ProjectDTO() { }

        public ProjectDTO(Project pr)
        {
            Id = pr.Id;
            Name = pr.Name;
            DeadLine = pr.DeadLine;
        }
    }
}
