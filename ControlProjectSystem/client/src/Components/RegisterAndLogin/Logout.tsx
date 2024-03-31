import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserObj from "../Enitities/UserObj";
import { notification } from "antd";
import axios from "axios";

interface PropsType {
  setUser: (value: UserObj | null) => void;
}

const LogOff: React.FC<PropsType> = ({ setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const logOff = async () => {

      const response = await axios.post("api/account/logoff");

      if (response.status === 200)
      {
        setUser(null);
            navigate("/");
            notification.success({
              message: "Выход завершился удачно",
              placement: "topRight",
              duration: 2,
            });
      }
      else if (response.status === 401)
      {
        notification.error({
          message: "Сначала выполните вход",
          placement: "topRight",
          duration: 2,
        });
        navigate("/login");
      }
    };
    
    logOff();
  }, [navigate, setUser]);

  return <></>;
};

export default LogOff;