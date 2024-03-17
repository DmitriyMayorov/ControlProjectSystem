import React, { useState, useEffect } from "react";
import ProjectObj from "../Enitities/ProjectObj";
import { Button, Table, Input } from "antd";
import type { TableProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import TaskObj from "../Enitities/TaskObj";

interface PropsType { }

// const Task : React.FC<PropsType> = () => {

//     const [tasks, setTasks] = useState<Array<TaskObj>>([]);
//     const [createModalIsShow, showCreateModel] = useState<boolean>(false);
//     const [editingTask, setEditingTask] = useState<TaskObj>();

//     const removeTask = (Id: number | undefined) => setTasks(tasks.filter(({ id }) => id !== Id));

//     const updateTask = (task : TaskObj) => {
//         setTasks(
//             tasks.map((e) => {
//                 if (e.id == task.id)
//                     return task;
//                 return e;
//             })
//         )
//     }

//     useEffect(() => {
//         const getProjects = async () => {
//             const requestOptions: RequestInit = {
//                 method: 'GET'
//             };

//             await fetch(`http://localhost:5177/api/Task`, requestOptions)
//                 .then(response => response.json())
//                 .then(
//                     (data) => {
//                         console.log(data);
//                         setTasks(data);
//                     },
//                     (error) => console.log(error)
//                 );
//         };
//         getProjects();
//     }, [createModalIsShow]);

//     const deleteProject = async (id: number | undefined) => {
//         const requestOptions: RequestInit = {
//             method: 'DELETE'
//         }

//         return await fetch(`http://localhost:5177/api/Task/${id}`, requestOptions)
//             .then((response) => {
//                 if (response.ok) {
//                     removeTask(id);
//                     console.log(id);
//                 }
//             },
//                 (error) => console.log(error)
//             )
//     }

//     const editProject = (obj : TaskObj) => {
//         setEditingTask(obj);
//         console.log(obj)
//         showCreateModel(true);
//     }

// }