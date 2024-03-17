import React, { useEffect, useState } from "react";
import { Input, Modal, Button, Form, } from "antd";
import WorkerObj from "../Enitities/WorkerObj";

interface PropsType {
    editingWorker: WorkerObj | undefined;
    addWorker: (worker: WorkerObj) => void;
    updateWorker: (worker : WorkerObj) => void;
    createModalIsShow: boolean;
    showCreateModel: (value: boolean) => void;
}

const WorkerCreate : React.FC<PropsType> = ({
    editingWorker,
    addWorker,
    updateWorker,
    createModalIsShow, 
    showCreateModel
}) => {
    const [form] = Form.useForm();
    const [person, setPerson] = useState<string>("");
    const [passportNum, setPassportNum] = useState<number>(0);
    const [passportSeries, setPassportSeries] = useState<number>(0);
    const [position, setPosition] = useState<string>("");
    const [isEdit, setIsEdit] = useState<boolean>(false);

    useEffect(() => {
        if (editingWorker !== undefined)
        {
            form.setFieldsValue({
                person: editingWorker.person,
                passportNum: editingWorker.passportNum,
                passportSeries: editingWorker.passportSeries,
                position: editingWorker.position
            });

            setPerson(editingWorker.person);
            setPassportNum(editingWorker.passportNum);
            setPassportSeries(editingWorker.passportSeries);
            setPosition(editingWorker.position);
            setIsEdit(true);
        }
        return () => {
            form.resetFields();
            setIsEdit(false);
        }
    }, [editingWorker, form]);

    const handleSubmit = (e: Event) => {
        const createWorker = async () => {
            const worker : WorkerObj = {
                person,
                passportNum, 
                passportSeries, 
                position
            }

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(worker)
            };

            const response = await fetch(`http://localhost:5177/api/Workers`, requestOptions);
            return await response.json()
                .then((data) => {
                    console.log(data)
                    if (response.ok) {
                        addWorker(data);
                        setIsEdit(false);
                        form.resetFields();
                    }
                },
                (error) => console.log(error)
                );
        };

        const editWorker = async (id : number | undefined) => {
            const worker: WorkerObj = {
                id,
                person,
                passportNum, 
                passportSeries, 
                position
            };

            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(worker)
            };

            const response = await fetch(`http://localhost:5177/api/Workers/${id}`, requestOptions);
            await response.json()
                .then(
                    (data) => {
                        if (response.ok) {
                            console.log(data)
                            updateWorker(data);
                            setIsEdit(false);
                            form.resetFields();
                        }
                    },
                    (error) => console.log(error)
                );
        };

        if (isEdit) {
            if (editingWorker !== undefined) {
                console.log(editingWorker.id);
                editWorker(editingWorker.id);
            }
        }
        else createWorker();
    };

    return (
        <Modal open={createModalIsShow}
            title="Форма работника"
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
                <Form.Item name="person" label="ФИО" hasFeedback rules={[
                    {
                        required: true,
                        type: "string",
                        message: "Введите ФИО (Фамилию, имя и отчество)"
                    }
                ]}>
                    <Input
                        key="FullName"
                        type="text"
                        name="FullName"
                        placeholder="Введите ФИО (Фамилию, имя и отчество)"
                        value={person}
                        onChange={(e) => setPerson(e.target.value)} />
                </Form.Item>
                <Form.Item name="passportNum" label="Номер пасспорта" hasFeedback rules={[
                    {
                        required: true,
                        type: "string",
                        message: "Введите номер пасспорта"
                    }
                ]}>
                    <Input
                        key="PassportNum"
                        type="string"
                        name="PassportNum"
                        placeholder="Введите номер паспорта"
                        value={passportNum}
                        onChange={(e) => setPassportNum(Number(e.target.value))} />
                </Form.Item>
                <Form.Item name="passportSeries" label="Серия пасспорта" hasFeedback rules={[
                    {
                        required: true,
                        type: "string",
                        message: "Введите серию пасспорта"
                    }
                ]}>
                    <Input
                        key="PassportSeries"
                        type="string"
                        name="PassportSeries"
                        placeholder="Введите серию пасспорта"
                        value={passportSeries}
                        onChange={(e) => setPassportSeries(Number(e.target.value))} />
                </Form.Item>
                <Form.Item name="position" label="Должность" hasFeedback rules={[
                    {
                        required: true,
                        type: "string",
                        message: "Введите должность"
                    }
                ]}>
                    <Input
                        key="Position"
                        type="string"
                        name="Position"
                        placeholder="Введите должность"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)} />
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default WorkerCreate;