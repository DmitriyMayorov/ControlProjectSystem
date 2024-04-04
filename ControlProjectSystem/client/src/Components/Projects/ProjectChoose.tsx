import React, { useState, useEffect } from "react";
import ProjectObj from "../Enitities/ProjectObj";
import { Button, Table, Input } from "antd";
import type { TableProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface PropsType { }

const ProjectChoose: React.FC<PropsType> = () => {

    const [projects, setProjects] = useState<Array<ProjectObj>>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getProjects = async () => {
            const requestOptions: RequestInit = {
                method: 'GET'
            };

            await fetch(`api/Projects`, requestOptions)
                .then(response => response.json())
                .then(
                    (data) => {
                        console.log(data);
                        setProjects(data);
                    },
                    (error) => console.log(error)
                ).catch(
                    (e) => console.log(e)
                );
        };
        getProjects();
    }, []);

    const columns: TableProps<ProjectObj>["columns"] = [
        {
            title: "Название",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Срок окончания проекта",
            dataIndex: "deadLine",
            key: "deadLine",
        },
    ]

    const onRowClick = (row: ProjectObj) => {
        navigate(`/currentProject`, { state: { currentProject: row }});
    };

    return (
        <React.Fragment>
            <h3>Проекты</h3>
            <Table 
                key="ProjectTable"
                dataSource={projects}
                columns={columns}
                pagination={{pageSize: 15}}
                scroll={{y : 1000}}
                onRow={(record) => {
                    return {
                        onClick: () => {
                            onRowClick(record)
                        }
                    };
                }}
                bordered
            />
        </React.Fragment>
    );
};

export default ProjectChoose;
