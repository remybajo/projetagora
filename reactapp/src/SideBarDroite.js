import { Link, Redirect } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
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
  Affix,
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
  const [theme, setTheme] = useState("");
  const [top, setTop] = useState(10);

  //Bade de donnée Data
  const themeData = [
    "Emploi",
    "Education",
    "Politique",
    "Evenement",
    "Environnement",
    "Sport",
    "Tourisme",
    "Tu as remarqué ?",
  ];

  var findClickTheme = (theme) => {
    setTheme(theme);
  };
  if (theme) {
    return <Redirect to={`/pageTheme/${theme}`} />;
  }

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

  var publiTheme = themeData.map((theme, i) => {
    return (
      <Menu.Item onClick={() => findClickTheme(theme)} key="i">
        {theme}
      </Menu.Item>
    );
  });

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
      <Affix offsetTop={top}>
        <Menu
          style={{ width: 200 }}
          defaultSelectedKeys={["1"]}
          // defaultOpenKeys={["sub1"]}
        >
          <Menu.Item key="1" icon={<MailOutlined />}>
            <Link to="/">Accueil</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Thématique">
            {publiTheme}
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
        <div style={{ marginLeft: "40px" }}>
          <TwitterOutlined
            style={{ fontSize: "20px", color: "#214C74" }}
            key="twitter"
          />
          <Divider type="vertical" />
          <FacebookOutlined
            style={{ fontSize: "20px", color: "#214C74" }}
            key="facebook"
          />
          <Divider type="vertical" />
          <LinkedinOutlined
            style={{ fontSize: "20px", color: "#214C74" }}
            key="linkedin"
          />
        </div>
      </Affix>
    </Sider>
  );
}

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, null)(SideBarDroite);
