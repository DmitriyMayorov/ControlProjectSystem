import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TaskObj from "../Enitities/TaskObj";
import { Col, Row } from 'antd';

interface PropsType {}

const TaskCurrent : React.FC<PropsType> = () => {

    const localtion = useLocation();
    const [currentTask, setCurrentTask] = useState<TaskObj>();

    useEffect(() => {
        if (localtion.state.currentTask == undefined)
            console.log("ERROR! Task is not load!");
        console.log(localtion.state.currentTask);
        setCurrentTask(localtion.state.currentTask);
    }, []);

    return (
        <>
            <Row>
                <Col flex="auto">
                    <h2>Название задания: {currentTask?.name}</h2>
                </Col>
            </Row>
            <Row>
                <Col flex="auto">

                </Col>
                <Col flex="100px">

                </Col>
            </Row>
            <Row>
                <Col flex="auto">

                </Col>
            </Row>
        </>
    );
};

export default TaskCurrent;