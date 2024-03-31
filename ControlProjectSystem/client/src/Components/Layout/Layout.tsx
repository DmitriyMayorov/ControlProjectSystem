import React from "react";
import { Outlet } from "react-router-dom";
import { NavLink, DropdownMenu, DropdownToggle, UncontrolledDropdown, DropdownItem } from "reactstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import UserObj from "../Enitities/UserObj";
import { Layout as LayoutAntd, Menu } from "antd";
import "./Layout.css";

const { Header, Content, Footer } = LayoutAntd;

const defaultItems = [
  {
    label: (
      <NavLink tag={Link} to="/">
        Система управления проектами 
      </NavLink>
    ),
    key: "1",
  },
];

const AnalystRoleModel = [
    {
        label: (
        <NavLink tag={Link} to="/">
            Система управления проектами 
        </NavLink>
        ),
        key: "1",
    },
    {
        label: (
        <NavLink tag={Link} to="/projectChoose">
            Выбор проекта
        </NavLink>
        ),
        key: "2",
    },
    {
        label: (
        <NavLink tag={Link} to="/workers">
            База работников
        </NavLink>
        ),
        key: "3",
    },
    {
        label: (
        <NavLink tag={Link} to="/projects">
            База проектов
        </NavLink>
        ),
        key: "4",
    },
];

const CoderRoleModel = [
    {
        label: (
          <NavLink tag={Link} to="/">
            Система управления проектами 
          </NavLink>
        ),
        key: "1",
    },
    {
        label: (
          <NavLink tag={Link} to="/projectChoose">
            Выбор проекта
          </NavLink>
        ),
        key: "2",
    },
];

const TesterRoleModel = [
    {
        label: (
          <NavLink tag={Link} to="/">
            Система управления проектами 
          </NavLink>
        ),
        key: "1",
    },
    {
        label: (
          <NavLink tag={Link} to="/projectChoose">
            Выбор проекта
          </NavLink>
        ),
        key: "2",
    },
    {
        label: (
        <NavLink tag={Link} to="/projects">
            База проектов
        </NavLink>
        ),
        key: "4",
    },
];

interface PropsType {
    user: UserObj | null;
}

const Layout: React.FC<PropsType> = ({ user }) => {
  return (
    <LayoutAntd className="layout">
      <Header
        style={{
          display: "flex",
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ minWidth: "800px" }}
          items={
            user?.roles.includes("Analyst")
              ? AnalystRoleModel
              : user?.roles.includes("Coder")
              ? CoderRoleModel
              : user?.roles.includes("Tester")
              ? TesterRoleModel :
              defaultItems
          }
        ></Menu>
        <div style={{ marginLeft: "auto" }}>
          <UncontrolledDropdown>
            <DropdownToggle caret color="dark" right>
              Аккаунт
            </DropdownToggle>
            <DropdownMenu dark right>
              <DropdownItem text>
                {user ? user.email : "Не авторизован"}
              </DropdownItem>
              <DropdownItem
                tag={Link}
                to="/register"
                disabled={user ? true : false}
              >
                Регистрация
              </DropdownItem>
              <DropdownItem
                tag={Link}
                to="/login"
                disabled={user ? true : false}
              >
                Вход
              </DropdownItem>
              <DropdownItem
                tag={Link}
                to="/logout"
                disabled={user ? false : true}
              >
                Выход
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </Header>
      <Content className="site-layout" style={{ minHeight: "100%" }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: "center" }}>Систсема управления программными проектами (СУПП)</Footer>
    </LayoutAntd>
  );
};
export default Layout;