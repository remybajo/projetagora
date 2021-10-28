import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Button,
  Layout,
  Menu,
  Image,
  Card,
  Avatar,
  Divider,
  Row,
  Col,
  Tabs,
} from "antd";
import "antd/dist/antd.css";
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
  DownloadOutlined,
  TwitterOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  UserOutlined,
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  LinkOutlined,
} from "@ant-design/icons";
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const { Meta } = Card;
const { TabPane } = Tabs;

function SideBarDroite(props) {
  return (
    <Sider className="site-layout-background">
      {" "}
      <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
      >
        <Menu.Item key="1" icon={<MailOutlined />}>
          <Link to="/">Accueil</Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Thématique">
          <Menu.Item key="3">
            <Link to="/">Politique</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/">Culture</Link>
          </Menu.Item>
          <Menu.Item key="4">Débats</Menu.Item>
          <Menu.Item key="4">Economie / emploi </Menu.Item>
          <Menu.Item key="4">Education </Menu.Item>
          <Menu.Item key="4">entreprise/start up </Menu.Item>
          <Menu.Item key="4">Evenement</Menu.Item>
          <Menu.Item key="4">Fait Divers / autre </Menu.Item>
          <Menu.Item key="4">France </Menu.Item>
          <Menu.Item key="4">Idée</Menu.Item>
          <Menu.Item key="4">Etranger</Menu.Item>
          <Menu.Item key="4">Politique</Menu.Item>
          <Menu.Item key="4">Projet environnement</Menu.Item>
          <Menu.Item key="4">Santé</Menu.Item>
          <Menu.Item key="4">Sport</Menu.Item>
          <Menu.Item key="4">T’as remarqué?</Menu.Item>
          <Menu.Item key="4">Tourisme / voyage </Menu.Item>
          <Menu.Item key="4">Transport</Menu.Item>
        </SubMenu>
        <Menu.Item key="2" icon={<CalendarOutlined />}>
          <Link to="/nouvelPublication">Mon compte</Link>
        </Menu.Item>

        <Menu.Item key="link" icon={<EditOutlined />}>
          
        <Link to="/nouvelPublication">Nouvelle publication</Link> 
          
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SideBarDroite;
