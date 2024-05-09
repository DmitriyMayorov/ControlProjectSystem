import React, { useEffect, useState } from "react";
import TrackObj from "../Enitities/TrackObj";
import { Input, Modal, Button, Form, InputNumber } from "antd";

interface TrackProps {
    createModalIsShow: boolean;
    showCreateModel: (value: boolean) => void;
    idTask: number | undefined;
    idWorker: number | undefined;
    statusTask: string | undefined;
    CreateModelIsShowFunction: (value : boolean) => void;
}

const Track: React.FC<TrackProps> = ({
    createModalIsShow,
    showCreateModel,
    idTask,
    idWorker,
    statusTask,
    CreateModelIsShowFunction
}) => {

    const [form] = Form.useForm();
    const [countHours, setCountHours] = useState<number>(0);
    const dateTrack = new Date().toISOString().split("T")[0];

    useEffect(() => {
        form.resetFields();
    }, [createModalIsShow, form]);

    const handleSubmit = () => {

        console.log("SUBMIT");

        const creatTrack = async () => {

            const track: TrackObj = {
                idTask,
                dateTrack,
                countHours,
                idWorker,
                statusTask
            }

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(track)
            };

            const response = await fetch(`api/Tracks`, requestOptions);
            return await response.json()
                .then((data) => {
                    console.log(data)
                    if (response.ok) {
                        console.log(data);
                        form.resetFields();
                    }
                },
                    (error) => console.log(error)
                );
        };

        creatTrack();
    };

    return (
        <Modal open={createModalIsShow}
            title="Форма треккинга времени"
            onCancel={() => CreateModelIsShowFunction(false)}
            footer={[
                <Button
                    key="submitButton"
                    form="trackForm"
                    type="primary"
                    htmlType="submit"
                    onClick={() => {handleSubmit(); CreateModelIsShowFunction(false)}}>
                    Save
                </Button>,
                <Button key="closeButton" onClick={() => CreateModelIsShowFunction(false)} danger>
                    Close
                </Button>
            ]}>
            <Form id="trackForm" form={form}>
                <Form.Item name="countHours" label="Количество часов" hasFeedback rules={[
                    {
                        required: true,
                        message: "Введите количество часов"
                    }
                ]}>
                    <InputNumber
                        style={{minWidth: 300}}
                        key="countHours"
                        type="number"
                        name="countHours"
                        placeholder="Введите количество часов"
                        value={countHours}
                        onChange={(e) => setCountHours(Number(e))}/>
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default Track;