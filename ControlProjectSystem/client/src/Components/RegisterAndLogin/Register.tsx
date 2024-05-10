import React, { useState } from "react";
import { Input, Button, Form, Radio, Select } from "antd";
import { Link } from "react-router-dom";
import RegisterObj from "../Enitities/RegisterObj";
import { notification } from "antd";
import axios from "axios";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordChecked, setCheckedPassword] = useState<string>("");
  const [idWorker, setIdWorker] = useState<number>(0);
  const [role, setRole] = useState<string>("");

  const [error, setError] = useState<Array<string>>([]);

  const handleSubmit = () => {
    setError([]);

    const model: RegisterObj = {
      email,
      password,
      passwordChecked,
      idWorker,
      role,
    };

    const register = async () => {
      const response = await axios.post("api/account/register", model, {
        withCredentials: true,
      });
  
      notification.success({
        message: "Регистрация завершилась удачно",
        placement: "topRight",
        duration: 2,
      });
  
      if (response.data.error !== undefined) {
        console.log(response.data.error);
        setError(["Регистрация завершилась неудачно "].concat(response.data.error));
      } else {
        setError([response.data.message]);
      }
    };
    register();
  };

  return (
    <>
      <Form onFinish={handleSubmit}>
        <br/>
        <Form.Item
          name="Role"
          label="Роль"
          hasFeedback
          rules={[{ required: true, type:"string", message: "Выберите роль" }]}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
          >
            <Select
                onChange={(e) => setRole(e)} 
                options={[
                { value: "Analyst", label: "Аналитик" },
                { value: "Coder", label: "Программист" },
                { value: "Tester", label: "Тестировщик" }
                ]}
                style={{maxWidth: "40%"}}
            />
        </Form.Item>
        <Form.Item
          name="workerId"
          label="Номер работника"
          hasFeedback
          labelCol={{ span: 8 }}
          style={{maxWidth: "80%"}}
          rules={[
              {
                required: true,
                message: "Введите Email",
              },
              () => ({
                validator(ruleObject, value) 
                {
                  if (Number(value) === parseInt(value))
                    return Promise.resolve();
                  return Promise.reject(
                    new Error("Введите существующий уникальный номер")
                  );
                },
              }),
            ]
          }
        >
          <Input
            name="workerId"
            onChange={(e) => setIdWorker(Number(e.target.value))}
            value={idWorker}
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="email"
          hasFeedback
          labelCol={{ span: 8 }}
          style={{maxWidth: "80%"}}
          rules={[
            {
              required: true,
              message: "Введите email",
            },
          ]}>
          <Input name="email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Пароль"
          hasFeedback
          labelCol={{ span: 8 }}
          style={{maxWidth: "80%"}}
          rules={[
            {
              required: true,
              message: "Введите пароль",
            },
            () => ({
              validator(ruleObject, value) 
              {
                if (/^.*(?=.*[a-zA-Z])(?=.*[!#@$%&? _"])(?=.{8,}).*$/.test(value))
                  return Promise.resolve();
                return Promise.reject(
                  new Error
                  (
                    "Ваш пароль должен содержать символы верхнего и нижнего регистров и спецсимволы. Количество симолов больше 8"
                  )
                );
              },
            }),
          ]}
        >
          <Input.Password
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="checkedPassword"
          label="Повторите заново пароль"
          dependencies={["password"]}
          hasFeedback
          labelCol={{ span: 8 }}
          style={{maxWidth: "80%"}}
          rules={[
            {
              required: true,
              message: "Повторите пароль",
            },
            ({ getFieldValue }) => 
            ({
              validator(ruleObject, value) 
              {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Пароли не совпадают"));
              },
            }),
          ]}
        >
          <Input.Password
            name="checkedPassword"
            onChange={(e) => setCheckedPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 16 }}>
          <Button htmlType="submit" type="primary">
            Регистрация
          </Button>
          {error && error.map((value, key) => <p key={key}>{value}</p>)}
          <br />
          <Link to="/login">Страница входа</Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default Register;