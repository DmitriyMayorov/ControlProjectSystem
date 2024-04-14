import React, { useState } from "react";
import { Input, Button, Form, Radio, Select } from "antd";
import { Link } from "react-router-dom";
import RegisterObj from "../Enitities/RegisterObj";
import { notification } from "antd";

interface PropsType {}

const Register: React.FC<PropsType> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordChecked, setCheckedPassword] = useState<string>("");
  const [workerId, setWokerId] = useState<number>(0);
  const [role, setRole] = useState<string>("");

  const [error, setError] = useState<Array<string>>([]);

  const handleSubmit = () => {
    setError([]);

    const model: RegisterObj = {
      email,
      password,
      passwordChecked,
      workerId,
      role,
    };

    const register = async () => {

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(model)
      };

      const response = await fetch(`api/account/register`, requestOptions);

      if (response.ok) 
      {
        const data = await response.json();
        notification.success({
          message: "Регистрация завершилась удачно",
          placement: "topRight",
          duration: 2,
        });
        if (data.error !== undefined) {
          console.log(data.error);
          setError(
            ["Регистрация завершилась неудачно "].concat(data.error)
          );
        } 
        else 
        {
          setError([data.message]);
        }
      } 
      else 
      {
        notification.error({
          message: "Регистрация завершилась неудачно",
          placement: "topRight",
          duration: 2,
        });
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
            onChange={(e) => setWokerId(Number(e.target.value))}
            value={workerId}
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
                if (/^.*(?=.*[a-zA-Z])(?=.*[!#$%&? _"])(?=.{8,}).*$/.test(value))
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