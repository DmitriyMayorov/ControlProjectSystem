import React, { useEffect } from "react";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import UserObj from "../Enitities/UserObj";
import axios from "axios";

interface LogoutProps {
  setUser: (value: UserObj | null) => void;
}

//Компонент выхода из системы 
//Отправляется POST запрос на выход через axios. При этом, если запрос обработан успешно, то производится перенаправление на базовую страницу проекта
const LogOff: React.FC<LogoutProps> = ({ setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const LogOFF = async () => {

      await axios.post('api/account/logoff', null, {
        withCredentials: true, 
      }).then(function (response) {
          if (response.status === 200) {
            setUser(null);
            navigate("/");
            notification.success({
              message: "Вы вышли из аккаунта",
              placement: "topRight",
              duration: 3,
            });
          } else {
            notification.error({
              message: "Сначала выполните вход",
              placement: "topRight",
              duration: 2,
            });
            navigate("/login");
          }
        });
    }

    LogOFF();
  }, [navigate, setUser]);

  return <></>;
};

export default LogOff;