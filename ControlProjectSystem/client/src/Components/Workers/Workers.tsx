import React, {useState, useEffect} from "react";
import WorkerObj from "../Enitities/WorkerObj";
import { Button, Table } from "antd";
import type { TableProps } from "antd";
import WorkerCreate from "./WorkersCreate";

//Компонент, хранящий таблицу работников системы
//Содержит модальное окно добавления новых проектов WorkerCreate
//workers - массив работиков, получаемых через useEffect и GET запрос. Запрос отправляется при изменении значения переменной createModalIsShow
//Видимость модального окна зависит от значения createModalIsShow
//Колонки таблицы описаны в переменной columns. Вместе с колонками данных в таблице находятся кнопки удаления и изменения
//Для удаления отправляется DELETE запрос на сервер с id выбранного проекта. Удаление производится каскадно
const Worker : React.FC = () => {

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
            key: "person"
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
            <br/>
            <Button onClick={(e) => showCreateModel(true)}>Добавить работника</Button>
            <Table
                key="WorkerTable"
                dataSource={workers}
                columns={columns}
                pagination={{pageSize: 10}}
                scroll={{y: 1000}}
                bordered
            />
        </React.Fragment>
    );
};

export default Worker;