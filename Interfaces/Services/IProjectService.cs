using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Interfaces.DTO;

namespace Interfaces.Services
{
    public interface IProjectService
    {
        List<ProjectDTO> GetProjects();

        ProjectDTO GetProject(int id);

        void CreateProject(ProjectDTO project);
        void UpdateProject(ProjectDTO project);
        void DeleteProject(int id);
    }
}
