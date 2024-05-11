import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Form, Checkbox } from "antd";
import { Link } from "react-router-dom";
import LoginObj from "../Enitities/LoginObj";
import UserObj from "../Enitities/UserObj";
import { notification } from "antd";
import axios from "axios";

interface LoginProps {
  setUser: (value: UserObj) => void;
}

//Компонент авторизации содержит в качестве переменных состояния useState поля авторизации сущности LoginObj(интерфейса)
//сообщение - переменная, сожержащая информацию об успешном или неуспешном входе
//Для авторизации отправляется POST запрос на сервер на api/account/login с передачей выбранных данных через axios, поскольку у данного инструмента
//более устойчивая установка куки, в отличии от fetch.  withCredentials: true служит для установки куки
//хук useNavigate служит для навигации
//Пароль проходит валидацию, ходя здесь она не обязательная (обязательна для регистрации)
const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [message, setMessage] = useState<Array<string>>([]);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setMessage([]);
    const model: LoginObj = {
      email,
      password,
      rememberMe,
    };

    const login = async () => {
      const response = await axios.post('api/account/login', model, {
        withCredentials: true, 
      })

      console.log(response);

      if (response.status === 200) {
        setMessage(["Вход завершился удачно"]);
        notification.success({
          message: "Вход завершился удачно",
          placement: "topRight",
          duration: 2,
        });

        setUser(response.data.responseUser);
        navigate("/");
      } else {
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

  return (
    <>
      <Form onFinish={handleSubmit}>
        <br />
        <Form.Item
          name="email"
          label="Email"
          hasFeedback
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 13 }}
          rules={[
            {
              required: true,
              message: "Введите Email",
            },
          ]}
        >
          <Input name="email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Пароль"
          hasFeedback
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 13 }}
          rules={[
            {
              required: true,
              message: "Введите пароль",
            },
            () => ({
              validator(_, value) {
                if (/^.(?=.*[a-zA-Z])(?=.*[!#$%&? _"])(?=.{8,}).*$/.test(value))
                  return Promise.resolve();
                return Promise.reject(
                  new Error(
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
        <Form.Item name="rememberMe" wrapperCol={{ offset: 5, span: 16 }}>
          <Checkbox
            value={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}>
            Запомнить меня?
          </Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 16 }}>
          {message && message.map((value, key) => <p key={key}>{value}</p>)}
          <br />
          <Button htmlType="submit" type="primary">
            Вход
          </Button>
          <br />
          <Link to="/register">Страница регистрации</Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;