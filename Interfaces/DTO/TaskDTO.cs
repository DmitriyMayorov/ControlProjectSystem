using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interfaces.DTO
{
    public class TaskDTO
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string Description { get; set; } = null!;

        public int? IDWorkerCoder { get; set; }

        public int? IDWorkerAnalyst { get; set; }

        public int? IDWorkerMentor { get; set; }

        public int? IDWorkerTester { get; set; }

        public int IDProject { get; set; }

        public string Category { get; set; } = null!;

        public string State { get; set; } = null!;

        public string Priority { get; set; } = null!;

/*        public int? IDWorkerCreater { get; set; }*/

        public DateOnly? Deadline { get; set; }

        public WorkerDTO? WorkerAnalyst { get; set; }

        public WorkerDTO? WorkerCoder { get; set; }

        public WorkerDTO? WorkerTechlid { get; set; }

        public WorkerDTO? WorkerTester { get; set; }

        public ProjectDTO Project { get; set; } = null!;

        public TaskDTO() { }

        public TaskDTO(DomainModel.Task tk)
        {
            Id = tk.Id;
            Name = tk.Name;
            Description = tk.Description;
            IDWorkerCoder = tk.IdworkerCoder;
            IDWorkerAnalyst = tk.IdworkerAnalyst;
            IDWorkerMentor = tk.IdworkerMentor;
            IDWorkerTester = tk.IdworkerTester;
            IDProject = tk.Idproject;
            Category = tk.Category;
            State = tk.State;
            Priority = tk.Priority;
            Deadline = tk.Deadline;

            Project = new ProjectDTO(tk.IdprojectNavigation);
        }
    }
}
