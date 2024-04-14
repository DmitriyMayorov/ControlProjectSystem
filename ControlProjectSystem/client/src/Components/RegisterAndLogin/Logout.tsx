import React, { useEffect } from "react";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import UserObj from "../Enitities/UserObj";

interface PropsType {
  setUser: (value: UserObj | null) => void;
}

const LogOff: React.FC<PropsType> = ({ setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const LogOFF = async () => {

      const requestOptions = {
        method: 'POST',
      };
      const response = await fetch("api/account/logoff", requestOptions)

        if (response.status === 200) {
          setUser(null);
          navigate("/");
          notification.success({
            message: "Выход завершился удачно",
            placement: "topRight",
            duration: 2,
          });
        } 
        else {
          notification.error({
            message: "Сначала выполните вход",
            placement: "topRight",
            duration: 2,
          });
          navigate("/login");
        }
    }
    
    LogOFF();
  }, [navigate, setUser]);

  return <></>;
};

export default LogOff;