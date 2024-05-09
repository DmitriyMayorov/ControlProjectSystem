import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import TaskObj from "../Enitities/TaskObj";
import { Button, Col, Input, List, Row, Select, Skeleton } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
import DemoColumn from "./Plot";
import WorkerObj from "../Enitities/WorkerObj";
import MessageObj from "../Enitities/MessageObj";
import Track from "../Track/Track";
import InfiniteScroll from 'react-infinite-scroll-component';

const { TextArea } = Input;

const TaskCurrent: React.FC = () => {

  const location = useLocation();
  const [currentTask, setCurrentTask] = useState<TaskObj>();
  const [messages, setMessages] = useState<Array<MessageObj>>([]);
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
  const [createModalIsShow, showCreateModel] = useState<boolean>(false)
  const [refreshFlag, setRefreshFlag] = useState<boolean>(true);
  const [textMessage, setTextMessage] = useState<string>("");
  const dateMessage = new Date().toISOString().split("T")[0];

  useEffect(() => {
    refresh(currentTask?.id);
  }, [idWorkerCoder, idWorkerAnalyst, idWorkerMentor, idWorkerTester, state]);

  useEffect(() => {
    console.log(location.state.currentTask.state);
    setCurrentTask(location.state.currentTask);
    setIdWorkerAnalyst(location.state.currentTask.idWorkerAnalyst);
    setIdWorkerCoder(location.state.currentTask.idWorkerCoder);
    setIdWorkerMentor(location.state.currentTask.idWorkerMentor);
    setIdWorkerTester(location.state.currentTask.idWorkerTester);
    setName(location.state.currentTask.name);
    setDescription(location.state.currentTask.description);
    setIdProject(location.state.currentTask.idProject);
    setCategory(location.state.currentTask.category);
    setState(location.state.currentTask.state);
    setPriority(location.state.currentTask.priority);
    setDeadline(location.state.currentTask.deadline);

    getWorkers();
    getMessages();
  }, []);

  const CreateModelIsShowFunction = (value: boolean) => {
    if (value) {
      showCreateModel(value);
    }
    else {
      setRefreshFlag(!refreshFlag);
      showCreateModel(value);
    }
  }

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

  const getMessages = async () => {
    const requestOptions: RequestInit = {
      method: 'GET'
    };

    await fetch(`api/Messages`, requestOptions)
      .then(response => response.json())
      .then(
        (data) => {
          console.log(data);
          const tempArray = data as Array<MessageObj>;
          const temp: Array<MessageObj> = tempArray.filter(message => message.idTask === location.state.currentTask.id);
          setMessages(temp);
        },
        (error) => console.log(error)
      );
  }

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

  const refresh = async (id: number | undefined) => {
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

  const addListMessage = async (message: MessageObj) => setMessages([...messages, message]);

  const addMessage = async () => {

    const idTask: number = Number(currentTask?.id);
    const idworker: number = currentTask?.state === "Analyst" ? Number(currentTask?.idWorkerAnalyst) :
      currentTask?.state === "InProgress" ? Number(currentTask?.idWorkerCoder) :
        currentTask?.state === "Review" ? Number(currentTask?.idWorkerMentor) :
          currentTask?.state === "Stage" ? Number(currentTask?.idWorkerCoder) :
            currentTask?.state === "Test" ? Number(currentTask?.idWorkerTester) :
              currentTask?.state === "Ready" ? Number(currentTask?.idWorkerAnalyst) :
                Number(currentTask?.idWorkerAnalyst);

    const message: MessageObj = {
      textMessage,
      dateMessage,
      idTask,
      idworker
    }

    console.log(message);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    };

    const response = await fetch(`api/Messages`, requestOptions);
    return await response.json()
      .then((data) => {
        if (response.ok) {
          console.log("ADD NEW MESSAGE");
          addListMessage(data);
          console.log(data);
        }
      },
        (error) => console.log(error)
      );
  }

  return (
    <>
      <Track
        createModalIsShow={createModalIsShow}
        showCreateModel={showCreateModel}
        idTask={location.state.currentTask.id}
        idWorker={
          currentTask?.state === "Analyst" ? currentTask?.idWorkerAnalyst :
            currentTask?.state === "InProgress" ? currentTask?.idWorkerCoder :
              currentTask?.state === "Review" ? currentTask?.idWorkerMentor :
                currentTask?.state === "Stage" ? currentTask?.idWorkerCoder :
                  currentTask?.state === "Test" ? currentTask?.idWorkerTester :
                    currentTask?.state === "Ready" ? currentTask?.idWorkerAnalyst :
                      currentTask?.idWorkerAnalyst
        }
        statusTask={currentTask?.state}
        CreateModelIsShowFunction={CreateModelIsShowFunction}
      />
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
              }}>
              Готово
            </Button>
            <Button style={{ minWidth: 150, marginRight: 2 }}
              onClick={() => CreateModelIsShowFunction(true)} danger>
              Добавить время
            </Button>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <TextArea
              style={{ fontSize: 18 }}
              autoSize={{ maxRows: 1 }}
              value={name}
              onChange={(e) => setName(e.target.value)} />
          </Row>
          <TextArea
            style={{ marginTop: 10 }}
            autoSize={{ minRows: 8 }}
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
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
          <InfiniteScroll
            dataLength={messages.length}
            hasMore={messages.length < 1}
            loader={<Skeleton paragraph={{ rows: 1 }} active />}
            next={getMessages}>
            <List
              style={{ minHeight: 230, maxHeight: 230 }}
              itemLayout="horizontal"
              dataSource={messages}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    description={item.textMessage}
                  />
                </List.Item>
              )}
            />
          </InfiniteScroll>
          <Input id="input" value={textMessage} onChange={(e) => setTextMessage(e.target.value)} />
          <Button onClick={() => { addMessage(); setTextMessage(""); }}>
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
              setIdWorkerCoder(() => value);
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
          <DemoColumn idtask={Number(location.state.currentTask.id)} refreshFlag={refreshFlag} />
        </Col>
      </Row>
    </>
  );
};

ReactDOM.render(<DemoColumn idtask={0} refreshFlag={true} />, document.getElementById('root'));
export default TaskCurrent;