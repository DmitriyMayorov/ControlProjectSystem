import React, { useState, useEffect } from "react";
import ProjectObj from "../Enitities/ProjectObj";
import { Button, Table, Input } from "antd";
import type { TableProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import TaskObj from "../Enitities/TaskObj";
import { useLocation } from "react-router-dom";
import TaskCreate from "./TaskCreate";

interface PropsType { }

const Task : React.FC<PropsType> = () => {

    const [tasks, setTasks] = useState<Array<TaskObj>>([]);
    const [createModalIsShow, showCreateModel] = useState<boolean>(false);
    const [editingTask, setEditingTask] = useState<TaskObj>();
    const location = useLocation();

    const removeTask = (Id: number | undefined) => setTasks(tasks.filter(({ id }) => id !== Id));

    const updateTask = (task : TaskObj) => {
        setTasks(
            tasks.map((e) => {
                if (e.id == task.id)
                    return task;
                return e;
            })
        )
    };

    const addTask = (task : TaskObj) => setTasks([...tasks, task]);

    useEffect(() => {
        const getTask = async () => {

            const requestOptions: RequestInit = {
                method: 'GET'
            };

            await fetch(`http://localhost:5177/api/Tasks`, requestOptions)
                .then(response => response.json())
                .then(
                    (data) => {
                        console.log(data);
                        setTasks(data);
                    },
                    (error) => console.log(error)
                );
            
            if (location.state.currentProject !== undefined)
                setTasks(tasks.filter(({ idProject }) => idProject === location.state.currentProject.id));
            else
                throw "Error";
        };
        getTask();
    }, [createModalIsShow]);

    const deleteTask = async (id: number | undefined) => {
        const requestOptions: RequestInit = {
            method: 'DELETE'
        }

        return await fetch(`http://localhost:5177/api/Tasks/${id}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    removeTask(id);
                    console.log(id);
                }
            },
                (error) => console.log(error)
            )
    };

    const editTask = (obj : TaskObj) => {
        setEditingTask(obj);
        console.log(obj)
        showCreateModel(true);
    };

    const columns : TableProps<TaskObj>["columns"] = [
        {
            title: "Название задания",
            dataIndex: "name",
            key: "name",
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => (
                <React.Fragment>
                    <Input
                        autoFocus
                        placeholder="Введите название задания"
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        onBlur={() => confirm()}>
                    </Input>
                    <Button onClick={() => confirm()} type="primary" key="serchButton">
                        Поиск
                    </Button>
                    <Button 
                        onClick={() => {
                            clearFilters ? clearFilters() : setSelectedKeys([]);
                            confirm();
                        }}
                        type="primary"
                        danger
                        key="dropFilter">
                            Сброс фильтра
                </Button>
                </React.Fragment>
            ),
            filterIcon: () => <SearchOutlined />,
            onFilter: (value, record) =>
              record.name.toLowerCase().includes(value.toString().toLowerCase()),
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
        },
        {
            key: "Edit",
            render: (row : TaskObj) => (
                <Button key="editButton"
                        type="primary"
                        onClick={() => editTask(row)}>
                            Изменить
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
            />
        </React.Fragment>
    )
};
export default Task;