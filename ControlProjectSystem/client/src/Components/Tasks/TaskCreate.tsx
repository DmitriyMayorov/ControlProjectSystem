import React, { useEffect, useState } from "react";
import { Input, Modal, Button, Form, Select, } from "antd";
import TaskObj from "../Enitities/TaskObj";
import ProjectObj from "../Enitities/ProjectObj";

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
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [idWorkerCoder, setIdWorkerCoder] = useState<number>(0);
    const [idWorkerAnalyst, setIdWorkerAnalyst] = useState<number>(0);
    const [idWorkerMentor, setIdWorkerMentor] = useState<number>(0);
    const [idWorkerTester, setIdWorkerTester] = useState<number>(0);
    const [idProject, setIdProject] = useState<number>(0);
    const [category, setCategory] = useState<string>("");
    const [state, setState] = useState<string>("Analyst");
    const [priority, setPriority] = useState<string>("");
    const [deadline, setDeadline] = useState<string>("");

    useEffect(() => {

        const getProjects = async () => {

            const requestOptions: RequestInit = {
                method: 'GET'
            };

            await fetch(`api/Projects`, requestOptions)
                .then(response => response.json())
                .then(
                    (data) => {
                        console.log("--------");
                        console.log(data);
                        setProjects(data);
                    },
                    (error) => console.log(error)
                );
        };

        getProjects();

        return () => {
            form.resetFields();
        }
    }, [form]);

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
                        type: "string",
                        message: "Выберите аналитика"
                    }
                ]}>
                    <Input
                        key="idWorkerAnalyst"
                        type="string"
                        name="idWorkerAnalyst"
                        placeholder=""
                        value={idWorkerAnalyst}
                        onChange={(e) => setIdWorkerAnalyst(Number(e.target.value))} />
                </Form.Item>
                <Form.Item name="idWorkerTester" label="Тестировщик" hasFeedback rules={[
                    {
                        required: true,
                        type: "string",
                        message: "Выберите тестировщика"
                    }
                ]}>
                    <Input
                        key="Position"
                        type="number"
                        name="Position"
                        placeholder=""
                        value={idWorkerTester}
                        onChange={(e) => setIdWorkerTester(Number(e.target.value))} />
                </Form.Item>
                <Form.Item name="idWorkerMentor" label="Техлид" hasFeedback rules={[
                    {
                        required: true,
                        type: "string",
                        message: "Выберите техлида"
                    }
                ]}>
                    <Input
                        key="idWorkerMentor"
                        type="string"
                        name="idWorkerMentor"
                        placeholder=""
                        value={idWorkerTester}
                        onChange={(e) => setIdWorkerMentor(Number(e.target.value))} />
                </Form.Item>
                <Form.Item name="idWorkerCoder" label="Программист" hasFeedback rules={[
                    {
                        required: true,
                        type: "string",
                        message: "Выберите программиста"
                    }
                ]}>
                    <Input
                        key="idWorkerCoder"
                        type="string"
                        name="idWorkerCoder"
                        placeholder=""
                        value={idWorkerTester}
                        onChange={(e) => setIdWorkerCoder(Number(e.target.value))} />
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
                    <Select defaultValue="low"
                        onChange={(e) => setPriority(e)} 
                        options={[
                            { value: "low", label: "Низкий" },
                            { value: "medium", label: "Средний" },
                            { value: "high", label: "Высокий" }
                        ]}
                    />
                </Form.Item>
                <Form.Item name="idWorkerTester" label="Срок окончания" hasFeedback rules={[
                    {
                        required: true,
                        type: "date",
                        message: "Выберите срок окончания работ"
                    }
                ]}>
                    <Input
                        key="Position"
                        type="date"
                        name="Position"
                        placeholder=""
                        value={idWorkerTester}
                        onChange={(e) => setDeadline(e.target.value)} />
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default TaskCreate;