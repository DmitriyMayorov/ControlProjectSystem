import React, {useState, useEffect, AriaAttributes} from "react";
import WorkerObj from "../Enitities/WorkerObj";
import { Button, Table, Input } from "antd";
import type { TableProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import WorkerCreate from "./WorkersCreate";
// import { icons } from "antd/es/image/PreviewGroup";

interface PropsType {}

const Worker : React.FC<PropsType> = () => {

    const [workers, setWorkers] = useState<Array<WorkerObj>>([]);
    const [createModalIsShow, showCreateModel] = useState<boolean>(false);
    const [editingWorker, setEditingWorker] = useState<WorkerObj>();

    const removeWorker = (removeId: number | undefined) => setWorkers(workers.filter(({id}) => id !== removeId));

    const updateWorker = (worker : WorkerObj) => {
        setWorkers(
            workers.map((e) => {
                if (e.id === worker.id)
                    return worker;
                return e;
            })   
        );
    };

    const addWorker = (worker : WorkerObj) => setWorkers([...workers, worker]);

    useEffect(() => {
        const getWorkers = async() => {
            const requestOptions : RequestInit = {
                method: 'GET'
            };

            await fetch(`api/Workers`, requestOptions)
                .then(response => response.json())
                .then(
                    (data) => {
                        console.log(data)
                        setWorkers(data)
                    },
                    (error) => console.log(error) 
                );
        };
        getWorkers();
    }, [createModalIsShow]);

    const deleteWorker = async (id: number | undefined) => {
        const requestOptions: RequestInit = {
            method: 'DELETE'
        }

        return await fetch(`api/Workers/${id}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    removeWorker(id);
                    console.log(id);
                }
            },
            (error) => console.log(error)
            )
    }

    const editWorker = (obj: WorkerObj) => {
        setEditingWorker(obj);
        console.log(obj)
        showCreateModel(true)
    }

    const columns : TableProps<WorkerObj>["columns"] = [
        {
            title: "ФИО",
            dataIndex: "person",
            key: "person",
        },
        {
            title: "Номер пасспорта",
            dataIndex: "passportNum",
            key: "passportNum",
        },
        {
            title: "Серия пасспорта",
            dataIndex: "passportSeries",
            key: "passportSeries"
        },
        {
            title: "Должность",
            dataIndex: "position",
            key: "position",
        },
        {
            key: "Delete",
            render: (row : WorkerObj) => (
                <Button key="deleteButton"
                        type="primary"
                        onClick={() => deleteWorker(row.id)}
                        danger>
                            Удалить
                </Button>
            ),
        },
        {
            key: "Edit",
            render: (row : WorkerObj) => (
                <Button key="editButton"
                        type="primary"
                        onClick={() => editWorker(row)}>
                            Изменить
                </Button>
            ),
        }
    ]

    return (
        <React.Fragment>
            <WorkerCreate
                editingWorker={editingWorker}
                addWorker={addWorker}
                updateWorker={updateWorker}
                createModalIsShow={createModalIsShow}
                showCreateModel={showCreateModel}
            />
            <h3>Список работников</h3>
            <Button onClick={(e) => showCreateModel(true)}>Добавить работника</Button>
            <Table
                key="WorkerTable"
                dataSource={workers}
                columns={columns}
                pagination={{pageSize: 15}}
                scroll={{y: 1000}}
                bordered
            />
        </React.Fragment>
    );
};

export default Worker;