import React from "react";
import { Outlet } from "react-router-dom";
import { NavLink, DropdownMenu, DropdownToggle, UncontrolledDropdown, DropdownItem } from "reactstrap";
import { Link } from "react-router-dom";
import UserObj from "../Enitities/UserObj";
import { Layout as LayoutAntd, Menu } from "antd";
import "./Layout.css";

import "bootstrap/dist/css/bootstrap.css";

const { Header, Content, Footer } = LayoutAntd;

const defaultRolesGuests = [
    {
      label: (
        <NavLink tag={Link} to="/">
          Система управления проектами 
        </NavLink>
      ),
      key: "1",
    },
];

const AnalystRoles = [
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
        <NavLink tag={Link} to="/projectsChoose">
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

const CoderRoles = [
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
          <NavLink tag={Link} to="/projectsChoose">
            Выбор проекта
          </NavLink>
        ),
        key: "2",
    },
];

const TesterRoles = [
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
          <NavLink tag={Link} to="/projectsChoose">
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
        key: "3",
    },
];

interface LayoutProps {
    ChooseUser: UserObj | null;
}

const Layout: React.FC<LayoutProps> = ({ ChooseUser }) => {
  return (
    <LayoutAntd className="informationAboutLogin">
      <Header style={{ display: "flex" }} >
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ minWidth: "1000px" }}
          items={
            ChooseUser?.roles.includes("Analyst")
              ? AnalystRoles
              : ChooseUser?.roles.includes("Coder")
              ? CoderRoles
              : ChooseUser?.roles.includes("Tester")
              ? TesterRoles :
              defaultRolesGuests
          }/>
          <UncontrolledDropdown>
            <DropdownToggle caret color="dark" right style={{minWidth: "130px"}}>
              {ChooseUser ? ChooseUser.email : "Гость"}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem tag={Link} to="/register" disabled={ChooseUser ? true : false}>
                Регистрация
              </DropdownItem>
              <DropdownItem tag={Link} to="/login" disabled={ChooseUser ? true : false} >
                Вход
              </DropdownItem>
              <DropdownItem tag={Link} to="/logout" disabled={ChooseUser ? false : true} >
                Выход
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
      </Header>
      <Content className="site-layout" style={{ minHeight: "100%" }}> <Outlet /> </Content>
      <Footer style={{ textAlign: "center" }}>Систсема управления программными проектами (СУПП)</Footer>
    </LayoutAntd>
  );
};
export default Layout;