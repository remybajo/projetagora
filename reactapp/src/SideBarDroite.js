import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Inscription from "./inscription";
import { connect } from "react-redux";
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
  Modal,
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConnect, setIsConnect] = useState(false);
  const [isConnectProfil, setIsConnectProfil] = useState(false);

  var showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (e) => {
    setIsModalVisible(false);
  };

  const handleCancel = (e) => {
    setIsModalVisible(false);
  };

  var handleClick = async () => {
    if (props.token == null) {
      showModal();
    } else {
      setIsConnect(true);
    }
  };

  if (isConnect) {
    return <Redirect to="/pageprofil" />;
  }

  var handleClickPubli = (e) => {
    if (props.token == null) {
      showModal();
    } else {
      setIsConnectProfil(true);
    }
  };

  if (isConnectProfil) {
    return <Redirect to="/nouvelPublication" />;
  }

  return (
    <Sider className="site-layout-background">
      <Modal
        title="connexion/inscription"
        style={{ displayflex: 1, width: 150 }}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Inscription />{" "}
      </Modal>{" "}
      <Menu
        style={{ width: 200 }}
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
        <Menu.Item
          onClick={() => handleClick()}
          key="2"
          icon={<CalendarOutlined />}
        >
          Mon compte
        </Menu.Item>

        <Menu.Item
          onClick={() => handleClickPubli()}
          key="link"
          icon={<EditOutlined />}
        >
          Nouvelle publication
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, null)(SideBarDroite);
