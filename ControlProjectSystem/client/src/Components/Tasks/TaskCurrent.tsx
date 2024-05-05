import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import TaskObj from "../Enitities/TaskObj";
import { Button, Col, Input, List, Row, Select } from 'antd';
import TextArea from "antd/es/input/TextArea";
import React from 'react';
import ReactDOM from 'react-dom';
import DemoColumn from "./Plot";
import WorkerObj from "../Enitities/WorkerObj";

const TaskCurrent: React.FC = () => {

  const localtion = useLocation();
  const [currentTask, setCurrentTask] = useState<TaskObj>();
  const [messages, setMessages] = useState<Array<string>>([]);
  const [workers, setWorkers] = useState<Array<WorkerObj>>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [idWorkerCoder, setIdWorkerCoder] = useState<number>(0);
  const [idWorkerAnalyst, setIdWorkerAnalyst] = useState<number>(0);
  const [idWorkerMentor, setIdWorkerMentor] = useState<number>(0);
  const [idWorkerTester, setIdWorkerTester] = useState<number>(0);
  const [idProject, setIdProject] = useState<number>(0);
  const [category, setCategory] = useState<string>("Test");
  const [state, setState] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  useEffect(() => {
    // if (localtion.state.currentTask == undefined)
    //   console.log("ERROR! Task is not load!");
    console.log(localtion.state.currentTask);
    setCurrentTask(localtion.state.currentTask);
    setIdWorkerAnalyst(localtion.state.currentTask.idWorkerAnalyst);
    setIdWorkerCoder(localtion.state.currentTask.idWorkerCoder);
    setIdWorkerMentor(localtion.state.currentTask.idWorkerMentor);
    setIdWorkerTester(localtion.state.currentTask.idWorkerTester);
    setName(localtion.state.currentTask.name);
    setDescription(localtion.state.currentTask.description);
    setIdProject(localtion.state.currentTask.idProject);
    setCategory(localtion.state.currentTask.category);
    setState(localtion.state.currentTask.state);
    setPriority(localtion.state.currentTask.priority);
    setDeadline(localtion.state.currentTask.deadline);

    const getWorkers = async () => {
      const requestOptions: RequestInit = {
        method: 'GET'
      };

      await fetch(`api/Workers`, requestOptions)
        .then(response => response.json())
        .then(
          (data) => {
            console.log(data);
            setWorkers(data);
          },
          (error) => console.log(error)
        );
    };

    getWorkers();
  }, []);

  const editCurrentTask = async (task: TaskObj | undefined) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    };

    const response = await fetch(`api/Tasks/${task?.id}`, requestOptions);
    await response.json()
      .then(
        (data) => {
          if (response.ok) {
            console.log(data);
            setCurrentTask(task);
          }
        },
        (error) => console.log(error)
      );
  }

  const refresh = (id: number | undefined) => {
    const task: TaskObj = {
      id,
      name,
      description,
      idWorkerCoder,
      idWorkerAnalyst,
      idWorkerMentor,
      idWorkerTester,
      idProject,
      category,
      state,
      priority,
      deadline
    }
    editCurrentTask(task);
  }

  return (
    <>
      <Row>
        <Col flex="auto" style={{ margin: 20 }}>
          <Row>
            <Button style={{
              minWidth: 150,
              marginRight: 2,
              background: currentTask?.state === "Analyst" ? "green" : "white",
              color: currentTask?.state === "Analyst" ? "white" : "black"
            }}
              onClick={() => {
                setState("Analyst");
                refresh(currentTask?.id)
              }}>
              Аналитика
            </Button>
            <Button style={{
              minWidth: 150,
              marginRight: 2,
              background: currentTask?.state === "InProgress" ? "green" : "white",
              color: currentTask?.state === "InProgress" ? "white" : "black"
            }}
              onClick={() => {
                setState("InProgress");
                refresh(currentTask?.id)
              }}>
              В работу
            </Button>
            <Button style={{
              minWidth: 150,
              marginRight: 2,
              background: currentTask?.state === "Review" ? "green" : "white",
              color: currentTask?.state === "Review" ? "white" : "black"
            }}
              onClick={() => {
                setState("Review");
                refresh(currentTask?.id)
              }}>
              На ревью
            </Button>
            <Button style={{
              minWidth: 150,
              marginRight: 2,
              background: currentTask?.state === "Stage" ? "green" : "white",
              color: currentTask?.state === "Stage" ? "white" : "black"
            }}
              onClick={() => {
                setState("Stage");
                refresh(currentTask?.id)
              }}>
              Проверка на stage
            </Button>
            <Button style={{
              minWidth: 150,
              marginRight: 2,
              background: currentTask?.state === "Test" ? "green" : "white",
              color: currentTask?.state === "Test" ? "white" : "black"
            }}
              onClick={() => {
                setState("Test");
                refresh(currentTask?.id)
              }}>
              На тестирование
            </Button>
            <Button style={{
              minWidth: 150,
              marginRight: 2,
              background: currentTask?.state === "Ready" ? "green" : "white",
              color: currentTask?.state === "Ready" ? "white" : "black"
            }}
              onClick={() => {
                setState("Ready");
                refresh(currentTask?.id)
              }}>
              Готово
            </Button>
            <Button style={{ minWidth: 150, marginRight: 2 }} danger>
              Добавить время
            </Button>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <TextArea
              style={{ fontSize: 18 }}
              autoSize={{ maxRows: 1 }}
              value={currentTask?.name} 
              onChange={(e) => setName(e.target.name)}/>
          </Row>
          <TextArea
            style={{ marginTop: 10 }}
            autoSize={{ minRows: 8 }}
            value={currentTask?.description}
            onChange={(e) => setDescription(e.target.name)} />
          <Button style={{
            minWidth: 150,
            marginRight: 2,
          }}
            onClick={() => {
              refresh(currentTask?.id)
            }}>
            Сохранить описание
          </Button>
          <h3>Сообщения</h3>
          <List
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  description={item}
                />
              </List.Item>
            )}
          />
          <Input />
          <Button>
            Отправить
          </Button>
        </Col>
        <Col flex="300px">
          <div>Программист</div>
          <Select
            showSearch
            style={{ width: 290 }}
            key="idWorkerCoder"
            value={idWorkerCoder}
            placeholder="Search to Select"
            optionFilterProp="children"
            onChange={(value) => {
              setIdWorkerCoder(value);
              refresh(currentTask?.id);
            }}
          >
            {workers.map((object, id) => {
              return (
                <Select.Option value={object.id} key={id}>
                  {object.person}
                </Select.Option>
              );
            })}
          </Select>
          <div>Аналитик</div>
          <Select
            showSearch
            style={{ width: 290 }}
            key="idWorkerAnalyst"
            placeholder="Search to Select"
            optionFilterProp="children"
            value={idWorkerAnalyst}
            onChange={(value) => {
              setIdWorkerAnalyst(value);
              refresh(currentTask?.id);
            }}
          >
            {workers.map((object, id) => {
              return (
                <Select.Option value={object.id} key={id}>
                  {object.person}
                </Select.Option>
              );
            })}
          </Select>
          <div>Тестировщик</div>
          <Select
            showSearch
            style={{ width: 290 }}
            key="idWorkerTester"
            value={idWorkerTester}
            placeholder="Search to Select"
            optionFilterProp="children"
            onChange={(value) => {
              setIdWorkerTester(value);
              refresh(currentTask?.id);
            }}
          >
            {workers.map((object, id) => {
              return (
                <Select.Option value={object.id} key={id}>
                  {object.person}
                </Select.Option>
              );
            })}
          </Select>
          <div>Техлид</div>
          <Select
            showSearch
            style={{ width: 290 }}
            key="idWorkerMentor"
            value={idWorkerMentor}
            placeholder="Search to Select"
            optionFilterProp="children"
            onChange={(value) => {
              setIdWorkerMentor(value);
              refresh(currentTask?.id);
            }}
          >
            {workers.map((object, id) => {
              return (
                <Select.Option value={object.id} key={id}>
                  {object.person}
                </Select.Option>
              );
            })}
          </Select>
          <DemoColumn />
        </Col>
      </Row>
    </>
  );
};

ReactDOM.render(<DemoColumn />, document.getElementById('root'));
export default TaskCurrent;