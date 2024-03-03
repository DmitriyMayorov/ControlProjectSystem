using DomainModel;
using Interfaces.DTO;
using Interfaces.Repository;
using Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinesLogic.Service
{
    public class ProjectService : IProjectService
    {
        private IDbRepos db;
        public ProjectService(IDbRepos db)
        {
            this.db = db;
        }

        public bool SaveChanges()
        {
            return (db.Save() > 0) ? true : false;
        }

        public List<ProjectDTO> GetProjects()
        {
            return db.Projects.GetList().Select(i => new ProjectDTO(i)).ToList();
        }

        public ProjectDTO GetProject(int id)
        {
            return new ProjectDTO(db.Projects.GetItem(id));
        }

        public void CreateProject(ProjectDTO project)
        {
            db.Projects.Create(new Project() { Name = project.Name, DeadLine = project.DeadLine });
            SaveChanges();
        }

        public void UpdateProject(ProjectDTO project)
        {
            Project? proj = db.Projects.GetItem(project.Id);
            if (proj == null)
                return;
            proj.Name = project.Name;
            proj.DeadLine = project.DeadLine;
            SaveChanges();
        }

        public void DeleteProject(int id)
        {
            db.Projects.Delete(id);
        }
    }
}
