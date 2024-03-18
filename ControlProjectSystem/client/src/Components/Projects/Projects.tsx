import React, { useState, useEffect } from "react";
import ProjectObj from "../Enitities/ProjectObj";
import ProjectCreate from "./ProjectCreate";
import { Button, Table, Input } from "antd";
import type { TableProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

interface PropsType { }

const Project: React.FC<PropsType> = () => {

    const [projects, setProjects] = useState<Array<ProjectObj>>([]);
    const [createModalIsShow, showCreateModel] = useState<boolean>(false);
    const [editingProject, setEditingProject] = useState<ProjectObj>();

    const removeProject = (Id: number | undefined) => setProjects(projects.filter(({ id }) => id !== Id));

    const updateProject = (project : ProjectObj) => {
        setProjects(
            projects.map((e) => {
                if (e.id === project.id)
                    return project;
                return e;
            })
        );
    };
    const addProject = (project : ProjectObj) => setProjects([...projects, project]);

    useEffect(() => {
        const getProjects = async () => {

            const requestOptions: RequestInit = {
                method: 'GET'
            };

            await fetch(`http://localhost:5177/api/Projects`, requestOptions)
                .then(response => response.json())
                .then(
                    (data) => {
                        console.log(data);
                        setProjects(data);
                    },
                    (error) => console.log(error)
                );
        };
        getProjects();
    }, [createModalIsShow]);

    const deleteProject = async (id: number | undefined) => {
        const requestOptions: RequestInit = {
            method: 'DELETE'
        }

        return await fetch(`http://localhost:5177/api/Projects/${id}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    removeProject(id);
                    console.log(id);
                }
            },
                (error) => console.log(error)
            )
    }

    const editProject = (obj : ProjectObj) => {
        setEditingProject(obj);
        console.log(obj)
        showCreateModel(true);
    }

    const columns: TableProps<ProjectObj>["columns"] = [
        {
            title: "Название",
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
                        placeholder="Введите название"
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        onBlur={() => confirm()}
                ></Input>
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
            title: "Срок окончания проекта",
            dataIndex: "deadLine",
            key: "deadLine",
        },
        {
            key: "Delete",
            render: (row : ProjectObj) => (
                <Button key="deleteButton"
                        type="primary"
                        onClick={() => deleteProject(row.id)}
                        danger>
                            Удалить
                </Button>
            ),
        },
        {
            key: "Edit",
            render: (row : ProjectObj) => (
                <Button key="editButton"
                        type="primary"
                        onClick={() => editProject(row)}>
                            Изменить
                </Button>
            ),
        }
    ]

    return (
        <React.Fragment>
            <ProjectCreate
                editingProject={editingProject}
                addProject={addProject}
                updateProject={updateProject}
                createModalIsShow={createModalIsShow}
                showCreateModel={showCreateModel} />
            <h3>Список проектов</h3>
            <Button onClick={(e) => showCreateModel(true)}>Добавить проект</Button>
            <Table 
                key="ProjectTable"
                dataSource={projects}
                columns={columns}
                pagination={{pageSize: 15}}
                scroll={{y : 1000}}
                bordered
            />
        </React.Fragment>
    );
};

export default Project;
