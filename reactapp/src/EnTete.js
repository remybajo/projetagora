import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
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
import Inscription from "./inscription";
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const { Meta } = Card;
const { TabPane } = Tabs;

function EnTete(props) {
  console.log('les props de la page entete', props)
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [modal, setModal] = useState(false);

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
      setIsModalVisible(!isModalVisible);
    }
  };



  var connexion = "connexion/inscription"


  return (
    <Row>
      <Modal
        title={connexion}
        style={{ displayflex: 1, width: 150 }}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Inscription />{" "}
      </Modal>

      <Col span={6}>
        {" "}
        <Image
          preview={false}
          size={40}
          className="logo"
          width={200}
          src="./image/AGORA.png"
        />
      </Col>
      <Col span={6}></Col>
      <Col span={6}></Col>
      <Col span={6} className="social-icons">
        {" "}
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
        <div style={{ marginTop: 30 }}>
          {" "}
          <Button
            onClick={() => handleClick()}
            icon={<UserOutlined />}
            size={100}
            style={{ Color: "white", borderColor: "#214C74", width: 100 }}
          >
            Log-in
          </Button>
          <Divider type="vertical" />
          <Button
            type="primary"
            icon={<UserOutlined />}
            size={100}
            style={{ backgroundColor: "#214C74", borderColor: "#214C74", width: 100 }}
          >
            Log out
          </Button>
        </div>
      </Col>
    </Row>
  );
}

function mapStateToProps(state){
  return {token:state.token}
}
export default connect(
  mapStateToProps,
  null
 
)(EnTete)
