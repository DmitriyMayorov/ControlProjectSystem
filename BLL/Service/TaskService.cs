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
    public class TaskService : ITaskService
    {
        private IDbRepos db;
        public TaskService(IDbRepos db)
        {
            this.db = db;
        }

        public bool SaveChanges()
        {
            return (db.Save() > 0) ? true : false;
        }

        public List<TaskDTO> GetTasks()
        {
            return db.Tasks.GetList().Select(i => new TaskDTO(i)).ToList();
        }

        public List<TaskDTO> GetTasksByProjectID(int projectID)
        {
            return db.Tasks.GetList().Select(i => new TaskDTO(i)).Where(i => i.IDProject == projectID).ToList();
        }

        public List<TaskDTO> GetTaskByStatusTaskFromCurrentProject(ProjectDTO project, string status)
        {
            if (status == "Analyst")
                return db.Tasks.GetList().Select(i => new TaskDTO(i)).Where(i => i.IDProject == project.Id).ToList();
            else if (status == "Coder")
                return db.Tasks.GetList().Select(i => new TaskDTO(i)).
                                Where(i => i.IDProject == project.Id && (i.State == "InProgress" || i.State == "Review" || i.State == "Stage")).ToList();
            else if (status == "Tester")
                return db.Tasks.GetList().Select(i => new TaskDTO(i)).Where(i => i.IDProject == project.Id && (i.State == "Test")).ToList();
            else
                return new List<TaskDTO>();
        }

        public TaskDTO GetTask(int id)
        {
            return new TaskDTO(db.Tasks.GetItem(id));
        }

        public void CreateTask(TaskDTO task)
        {
            db.Tasks.Create(new DomainModel.Task()
            {
                Name = task.Name,
                Description = task.Description,
                State = task.State,
                Category = task.Category,
                Idproject = task.IDProject,
                IdworkerAnalyst = task.IDWorkerAnalyst,
                IdworkerCoder = task.IDWorkerCoder,
                IdworkerMentor = task.IDWorkerMentor,
                IdworkerTester = task.IDWorkerTester,
                Deadline = task.Deadline,
                Priority = task.Priority,
            });
            SaveChanges();
        }

        public void UpdateTask(TaskDTO taskdto)
        {
            DomainModel.Task? task = db.Tasks.GetItem(taskdto.Id);
            if (task == null)
                return;
            task.Name = taskdto.Name;
            task.Description = taskdto.Description;
            task.Idproject = taskdto.IDProject;
            task.State = taskdto.State;
            task.Category = taskdto.Category;
            task.IdworkerAnalyst = taskdto.IDWorkerAnalyst;
            task.IdworkerCoder = taskdto.IDWorkerCoder;
            task.IdworkerMentor = taskdto.IDWorkerMentor;
            task.IdworkerTester = taskdto.IDWorkerTester;
            task.Deadline = taskdto.Deadline;
            task.Priority = taskdto.Priority;
            SaveChanges();
        }

        public void DeleteTask(int id)
        {
            db.Tasks.Delete(id);
            SaveChanges();
        }

        public bool ToInProgress(TaskDTO task)
        {
            DomainModel.Task? taskCurrent = db.Tasks.GetItem(task.Id);
            if (taskCurrent == null || taskCurrent.State == "Ready")
                return false;
            taskCurrent.State = "InProgress";
            SaveChanges();
            return true;
        }

        public bool ToReview(TaskDTO task)
        {
            DomainModel.Task? taskCurrent = db.Tasks.GetItem(task.Id);
            if (taskCurrent == null || taskCurrent.State != "InProgress")
                return false;
            taskCurrent.State = "Review";
            SaveChanges();
            return true;
        }

        public bool ToStage(TaskDTO task)
        {
            DomainModel.Task? taskCurrent = db.Tasks.GetItem(task.Id);
            if (taskCurrent == null || taskCurrent.State != "Review")
                return false;
            taskCurrent.State = "Stage";
            SaveChanges();
            return true;
        }

        public bool ToTest(TaskDTO task)
        {
            DomainModel.Task? taskCurrent = db.Tasks.GetItem(task.Id);
            if (taskCurrent == null || taskCurrent.State != "Stage")
                return false;
            taskCurrent.State = "Test";
            SaveChanges();
            return true;
        }

        public bool ToReady(TaskDTO task)
        {
            DomainModel.Task? taskCurrent = db.Tasks.GetItem(task.Id);
            if (taskCurrent == null || taskCurrent.State != "Test")
                return false;
            taskCurrent.State = "Ready";
            SaveChanges();
            return true;
        }
    }
}