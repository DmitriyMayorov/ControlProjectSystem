import React, { useEffect, useState } from "react";
import { Input, Modal, Button, Form, Select, } from "antd";
import TaskObj from "../Enitities/TaskObj";
import ProjectObj from "../Enitities/ProjectObj";
import WorkerObj from "../Enitities/WorkerObj";

interface PropsType {
    addTask: (worker: TaskObj) => void;
    createModalIsShow: boolean;
    showCreateModel: (value: boolean) => void;
}

const TaskCreate : React.FC<PropsType> = ({
    addTask,
    createModalIsShow, 
    showCreateModel
}) => {
    const [form] = Form.useForm();
    const [projects, setProjects] = useState<Array<ProjectObj>>([]);
    const [workers, setWorkers] = useState<Array<WorkerObj>>([]);
    const [workersAnalyst, setWorkersAnalyst] = useState<Array<WorkerObj>>([]);
    const [workersCoder, setWorkersCoder] = useState<Array<WorkerObj>>([]);
    const [workerMentor, setWorkersMentor] = useState<Array<WorkerObj>>([]);
    const [workersTester, setWorkersTester] = useState<Array<WorkerObj>>([]);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [idWorkerCoder, setIdWorkerCoder] = useState<number>(0);
    const [idWorkerAnalyst, setIdWorkerAnalyst] = useState<number>(0);
    const [idWorkerMentor, setIdWorkerMentor] = useState<number>(0);
    const [idWorkerTester, setIdWorkerTester] = useState<number>(0);
    const [idProject, setIdProject] = useState<number>(0);
    const [category, setCategory] = useState<string>("Test");
    const [state, setState] = useState<string>("Analyst");
    const [priority, setPriority] = useState<string>("");
    const [deadline, setDeadline] = useState<string>("");

    useEffect(() => {
        const getWorkers = () => {
            const requestOptions : RequestInit = {
                method: 'GET'
            };

            fetch(`http://localhost:5177/api/Workers`, requestOptions)
                .then(response => response.json())
                .then(
                    (data) => {
                        // console.log(data);
                        setWorkers(data);
                        // console.log(workers);
                    },
                    (error) => console.log(error) 
                );
        };

        const getProjects = () => {

            const requestOptions: RequestInit = {
                method: 'GET'
            };

            fetch(`http://localhost:5177/api/Projects`, requestOptions)
                .then(response => response.json())
                .then(
                    (data) => {
                        console.log(data);
                        setProjects(data);
                        console.log(projects);
                    },
                    (error) => console.log(error)
                );
        };

        getWorkers();
        getProjects();

        setWorkersAnalyst(workers.filter(({ position }) => position === "Analyst"));
        setWorkersCoder(workers.filter(({ position }) => position === "Coder"));
        setWorkersMentor(workers.filter(({ position }) => position === "Coder"));
        setWorkersTester(workers.filter(({ position }) => position === "Tester"));

        console.log(workers);
        return () => {
            form.resetFields();
        }
    }, []);

    const handleSubmit = (e: Event) => {
        const createTasks = async () => {
            const task : TaskObj = {
                name,
                description,
                idWorkerCoder,
                idWorkerAnalyst, 
                idWorkerMentor, 
                idWorkerTester,
                idProject,
                category,
                state,
                priority, 
                deadline
            }

            console.log(task);

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task)
            };

            const response = await fetch(`api/Tasks`, requestOptions);
            return await response.json()
                .then((data) => {
                    console.log(data)
                    if (response.ok) {
                        addTask(data);
                        form.resetFields();
                    }
                },
                (error) => console.log(error)
                );
        };
        createTasks();
    };

    return (
        <Modal open={createModalIsShow}
            title="Форма задания"
            onCancel={() => showCreateModel(false)}
            footer={[
                <Button
                    key="submitButton"
                    form="projectForm"
                    type="primary"
                    htmlType="submit"
                    onClick={() => showCreateModel(false)}>
                    Save
                </Button>,
                <Button key="closeButton" onClick={() => showCreateModel(false)} danger>
                    Close
                </Button>
            ]}>
            <Form id="projectForm" onFinish={handleSubmit} form={form}>
                <Form.Item name="name" label="Название задания" hasFeedback rules={[
                    {
                        required: true,
                        type: "string",
                        message: "Введите название задания"
                    }
                ]}>
                    <Input
                        key="nameTask"
                        type="text"
                        name="nameTask"
                        placeholder=""
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </Form.Item>
                <Form.Item name="description" label="Описание" hasFeedback rules={[
                    {
                        required: true,
                        type: "string",
                        message: "Введите описание задания"
                    }
                ]}>
                    <Input
                        key="description"
                        type="string"
                        name="description"
                        placeholder=""
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                </Form.Item>
                <Form.Item name="idWorkerAnalyst" label="Аналитик" hasFeedback rules={[
                    {
                        required: true,
                        type: "number",
                        message: "Выберите аналитика"
                    }
                ]}>
                    <Select
                        showSearch
                        key="idWorkerAnalyst"
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        onChange={(value) => setIdWorkerAnalyst(value)}
                    >
                        {workersAnalyst.map((object, id) => {
                            return (
                                <Select.Option value={object.id} key={id}>
                                    {object.person}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                <Form.Item name="idWorkerTester" label="Тестировщик" hasFeedback rules={[
                    {
                        required: true,
                        type: "number",
                        message: "Выберите тестировщика"
                    }
                ]}>
                    <Select
                        showSearch
                        key="idWorkerTester"
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        onChange={(value) => setIdWorkerTester(value)}
                    >
                        {workersTester.map((object, id) => {
                            return (
                                <Select.Option value={object.id} key={id}>
                                    {object.person}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                <Form.Item name="idWorkerMentor" label="Техлид" hasFeedback rules={[
                    {
                        required: true,
                        type: "number",
                        message: "Выберите техлида"
                    }
                ]}>
                    <Select
                        showSearch
                        key="idWorkerMentor"
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        onChange={(value) => setIdWorkerMentor(value)}
                    >
                        {workerMentor.map((object, id) => {
                            return (
                                <Select.Option value={object.id} key={id}>
                                    {object.person}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                <Form.Item name="idWorkerCoder" label="Программист" hasFeedback rules={[
                    {
                        required: true,
                        type: "number",
                        message: "Выберите программиста"
                    }
                ]}>
                    <Select
                        showSearch
                        key="idWorkerCoder"
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        onChange={(value) => setIdWorkerCoder(value)}
                    >
                        {workersCoder.map((object, id) => {
                            return (
                                <Select.Option value={object.id} key={id}>
                                    {object.person}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                <Form.Item name="idProject" label="Проект" hasFeedback rules={[
                    {
                        required: true,
                        type: "number",
                        message: "Выберите проект"
                    }
                ]}>
                    <Select
                        showSearch
                        key="idProject"
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        onChange={(value) => setIdProject(value)}
                    >
                        {projects.map((object, id) => {
                            return (
                                <Select.Option value={object.id} key={id}>
                                    {object.name}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                <Form.Item name="priority" label="Приоритет" hasFeedback rules={[
                    {
                        required: true,
                        type: "string",
                        message: "Выберите приоритет"
                    }
                ]}>
                    <Select
                        onChange={(e) => setPriority(e)} 
                        options={[
                            { value: "low", label: "Низкий" },
                            { value: "medium", label: "Средний" },
                            { value: "high", label: "Высокий" }
                        ]}
                    />
                </Form.Item>
                <Form.Item name="deadline" label="Срок окончания" hasFeedback rules={[
                    {
                        required: true,
                        type: "date",
                        message: "Выберите срок окончания работ"
                    }
                ]}>
                    <Input
                        key="deadline"
                        type="date"
                        name="deadline"
                        placeholder=""
                        value={idWorkerTester}
                        onChange={(e) => setDeadline(e.target.value)} />
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default TaskCreate;