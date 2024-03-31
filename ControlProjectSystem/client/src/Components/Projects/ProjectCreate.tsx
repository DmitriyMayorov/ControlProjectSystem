import React, { useEffect, useState } from "react";
import ProjectObj from "../Enitities/ProjectObj";
import { Input, Modal, Button, Form } from "antd";

interface PropsType {
    editingProject: ProjectObj | undefined;
    addProject: (project: ProjectObj) => void;
    updateProject: (project: ProjectObj) => void;
    createModalIsShow: boolean;
    showCreateModel: (value: boolean) => void;
}

const ProjectCreate: React.FC<PropsType> = ({
    editingProject,
    addProject,
    updateProject,
    createModalIsShow,
    showCreateModel
}) => {

    const [form] = Form.useForm();
    const [name, setProjectName] = useState<string>("");
    const [deadLine, setProjectDeadline] = useState<string>(new Date().toISOString().split("T")[0]);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    useEffect(() => {
        if (editingProject !== undefined)
        {
            form.setFieldsValue({
                name: editingProject.name,
                deadLine: editingProject.deadLine
            });
            setProjectName(editingProject.name);
            setProjectDeadline(editingProject.deadLine);
            setIsEdit(true);
        }
        return () => {
            form.resetFields();
            setIsEdit(false);
        };
    }, [editingProject, form]);

    const handleSubmit = (e: Event) => {
        const createProject = async () => {
            const project: ProjectObj = {
                name,
                deadLine
            }

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(project)
            };

            const response = await fetch(`api/Projects`, requestOptions);
            return await response.json()
                .then((data) => {
                    console.log(data)
                    if (response.ok) {
                        addProject(data);
                        setIsEdit(false);
                        form.resetFields();
                    }
                },
                    (error) => console.log(error)
                );
        };

        const editProject = async (id: number | undefined) => {
            const project: ProjectObj = {
                id,
                name,
                deadLine
            }

            const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(project)
            };

            const response = await fetch(`api/Projects/${id}`, requestOptions);
            await response.json()
                .then(
                    (data) => {
                        if (response.ok) {
                            console.log(data)
                            updateProject(data);
                            setIsEdit(false);
                            form.resetFields();
                        }
                    },
                    (error) => console.log(error)
                );
        };

        if (isEdit) {
            if (editingProject !== undefined) {
                console.log(editingProject.id);
                editProject(editingProject.id);
            }
        }
        else createProject();
    };

    return (
        <Modal open={createModalIsShow}
            title="Форма проекта"
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
                <Form.Item name="name" label="Название" hasFeedback rules={[
                    {
                        required: true,
                        message: "Введите назвнаие проекта"
                    }
                ]}>
                    <Input
                        key="nameProject"
                        type="text"
                        name="nameProject"
                        placeholder="Введите название проекта"
                        value={name}
                        onChange={(e) => setProjectName(e.target.value)} />
                </Form.Item>
                <Form.Item name="deadline" label="Срок окончания" hasFeedback rules={[
                    {
                        required: false,
                        type: "date",
                        message: "Введите срок окончания проекта"
                    }
                ]}>
                    <Input
                        key="deadline"
                        type="date"
                        name="deadline"
                        placeholder="Введите срок окончания проекта"
                        value={deadLine}
                        onChange={(e) => setProjectDeadline(e.target.value)} />
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default ProjectCreate;