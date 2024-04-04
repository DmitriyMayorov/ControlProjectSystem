import React, { useState, useEffect } from "react";
import { Button, Table, Input } from "antd";
import type { TableProps } from "antd";
import TaskObj from "../Enitities/TaskObj";
import { useLocation, useNavigate } from "react-router-dom";
import TaskCreate from "./TaskCreate";

interface PropsType { }

const Task : React.FC<PropsType> = () => {

    const [tasks, setTasks] = useState<Array<TaskObj>>([]);
    const [createModalIsShow, showCreateModel] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

    const removeTask = (Id: number | undefined) => setTasks(tasks.filter(({ id }) => id !== Id));

    const addTask = (task : TaskObj) => setTasks([...tasks, task]);

    useEffect(() => {
        const getTask = async () => {

            const requestOptions: RequestInit = {
                method: 'GET'
            };

            await fetch(`api/Tasks`, requestOptions)
                .then(response => response.json())
                .then(
                    (data) => {
                        console.log(data);
                        var taskTemp : Array<TaskObj> = data;
                        console.log(taskTemp);
                        if (location.state.currentProject !== undefined) {
                            setTasks(taskTemp.filter(( task ) => task.idProject === location.state.currentProject.id));
                        } else {
                            throw "Exeption";
                        }
                    },
                    (error) => console.log(error)
                );
        };

        getTask();
    }, [createModalIsShow]);

    const deleteTask = async (id: number | undefined) => {
        const requestOptions: RequestInit = {
            method: 'DELETE'
        }

        return await fetch(`api/Tasks/${id}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    removeTask(id);
                    console.log(id);
                }
            },
                (error) => console.log(error)
            )
    };

    const onRowClick = (row: TaskObj) => {
        console.log(row);
        navigate(`/currentTask`, { state: { currentTask: row }});
    };

    const columns : TableProps<TaskObj>["columns"] = [
        {
            title: "Название задания",
            dataIndex: "name",
            key: "name",
        },
        {
            key: "Delete",
            render: (row : TaskObj) => (
                <Button key="deleteButton"
                        type="primary"
                        onClick={() => deleteTask(row.id)}
                        danger>
                            Удалить
                </Button>
            ),
        }
    ];

    return (
        <React.Fragment>
            <TaskCreate
                addTask={addTask}
                createModalIsShow={createModalIsShow}
                showCreateModel={showCreateModel}
            />
            <h3>{location.state.currentProject.name}</h3>
            <Button onClick={(e) => showCreateModel(true)}>Добавить задание</Button>
            <Table
                key="TasksTable"
                dataSource={tasks}
                columns={columns}
                pagination={{pageSize: 15}}
                scroll={{y: 1000}}
                bordered
                onRow={(record) => {
                    return {
                        onClick: () => {
                            onRowClick(record);
                        }
                    };
                }}
            />
        </React.Fragment>
    )
};
export default Task;