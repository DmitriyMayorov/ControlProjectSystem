import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Form, Checkbox } from "antd";
import { Link } from "react-router-dom";
import LoginObj from "../Enitities/LoginObj";
import UserObj from "../Enitities/UserObj";
import { notification } from "antd";
import axios from "axios";


interface ResponseModel {
  message: string;
  responseUser: UserObj;
}

interface PropsType {
  setUser: (value: UserObj) => void;
}

const Login: React.FC<PropsType> = ({ setUser }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberme] = useState<boolean>(false);
  const [message, setMessage] = useState<Array<string>>([]);
  const navigate = useNavigate();


  // handle submit event for the form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setMessage([]);
    const model: LoginObj = {
      email,
      password,
      rememberMe,
    };

    const login = async () => {
        const response =  await axios.post<ResponseModel>("api/account/login", model);
        if (response.status === 200)
        {
          setMessage(["Вход завершился удачно"]);
            notification.success({
              message: "Вход завершился удачно",
              placement: "topRight",
              duration: 2,
            });

            setUser(response.data.responseUser);
            // Переход на главную страницу
            navigate("/");
        }
        else
        {
          setMessage(["Вход завершился неудачно"]);
            notification.error({
              message: "Вход завершился неудачно",
              placement: "topRight",
              duration: 2,
            });
        }
    };

    login();
  };

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 14 },
  };

  return (
    <div className="containerbox">
      <Form onFinish={handleSubmit} {...layout}>
        <h3>Вход</h3>
        <Form.Item
          name="email"
          label="Email"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Введите Email",
            },
            {
              type: "email",
              message: "Введите корректный Email",
            },
          ]}
        >
          <Input name="email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Пароль"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Введите пароль",
            },
            () => ({
              validator(_, value) {
                if (
                  /^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? _"]).*$/.test(
                    value
                  )
                )
                  return Promise.resolve();
                return Promise.reject(
                  new Error(
                    "Пароль должен должен состоять минимум из 6 символов, содержать только латинские символы, содержать заглавные, строчные буквы, цифры и специальные символы"
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
        <Form.Item name="rememberMe" wrapperCol={{ offset: 5, span: 16 }}>
          <Checkbox
            value={rememberMe}
            onChange={(e) => setRememberme(e.target.checked)}
          >
            Запомнить?
          </Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
          {message && message.map((value, key) => <p key={key}>{value}</p>)}
          <br />
          <Button htmlType="submit" type="primary">
            Вход
          </Button>
          <br />
          <Link to="/register">На страницу регистрации</Link>
        </Form.Item>
      </Form>
      <br />
    </div>
  );
};

export default Login;