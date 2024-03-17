interface TaskObj 
{
    id?: number
    name: string
    description: string
    idWorkerCoder: number
    idWorkerAnalyst: number
    idWorkerMentor: number
    idWorkerTester: number
    idProject: number
    category: string
    state: string
    priority: string
    deadline: string
}

export default TaskObj;