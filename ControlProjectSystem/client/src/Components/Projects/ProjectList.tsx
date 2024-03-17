import React, { useState, useEffect } from "react";
import ProjectObj from "../Enitities/ProjectObj";
import { Button, Table, Input } from "antd";
import type { TableProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface PropsType { }

const ProjectList: React.FC<PropsType> = () => {

    const [projects, setProjects] = useState<Array<ProjectObj>>([]);

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
    }, []);

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
    ]

    return (
        <React.Fragment>
            <h3>Проекты</h3>
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

export default ProjectList;
