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

function EnTete(props) {
  return (
    <Row>
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
        <div>
          {" "}
          <Button
            icon={<UserOutlined />}
            size={100}
            style={{ Color: "#214C74", borderColor: "#214C74" }}
          >
            Log in
          </Button>
          <Divider type="vertical" />
          <Button
            type="primary"
            size={100}
            style={{ backgroundColor: "#214C74", borderColor: "#214C74" }}
          >
            Log out
          </Button>
        </div>
      </Col>
    </Row>
  );
}

export default EnTete;
