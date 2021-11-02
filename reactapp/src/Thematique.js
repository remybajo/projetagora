import React from "react";
import { Col, Layout, Card, Row, Button } from "antd";
import "antd/dist/antd.css";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;

const { Meta } = Card;

// import {Redirect} from 'react-router-dom';
// import {connect} from 'react-redux';

function Thematique(props) {
  return (
    <>
      <Row justify="center">
        <Col span="4"></Col>
        <Col span="16">
          <h1
            style={{
              backgroundColor: "#214C74",
              color: "white",
              width: "100%",
              textAlign: "center",
              height: 50,
              justifyContent: "center",
              marginTop: 50,
            }}
          >
            Thématiques
          </h1>
        </Col>
        <Col span="4"></Col>
      </Row>
      <Row justify="start" display="flex">
        <Card
          style={{
            width: "100%",
            margin: "15px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          cover={
            <img
              alt="example"
              src="https://mcdn.wallpapersafari.com/medium/76/5/HJEso9.jpg"
              style={{ width: 200 }}
            />
          }
        >
          <div
            style={{
              justifyContent: "center",
              width: "75em",
              textAlign: "center",
            }}
          >
            <h3>
              EMPLOI{" "}
              <Button
                type="primary"
                shape="circle"
                icon={<SearchOutlined style={{ fontSize: "10px" }} />}
              ></Button>
            </h3>
          </div>
        </Card>
        <Card
          style={{
            width: "100%",
            margin: "15px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          cover={
            <img
              alt="example"
              src="../public/image/Emploi.jpg"
              style={{ width: 200 }}
            />
          }
        >
          <div
            style={{
              justifyContent: "center",
              width: "75em",
              textAlign: "center",
            }}
          >
            <h3>
              POLITIQUE{" "}
              <Button
                type="primary"
                shape="circle"
                icon={<SearchOutlined style={{ fontSize: "10px" }} />}
              ></Button>
            </h3>
          </div>
        </Card>
        <Card
          style={{
            width: "100%",
            margin: "15px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          cover={
            <img
              alt="example"
              src="../public/image/Politique.jpg"
              style={{ width: 200 }}
            />
          }
        >
          <Card
            style={{
              justifyContent: "center",
              width: "75em",
              textAlign: "center",
              display: "flex",
            }}
          >
            <h3>
              EDUCATION{" "}
              <Button
                type="primary"
                shape="circle"
                icon={<SearchOutlined style={{ fontSize: "10px" }} />}
              ></Button>
            </h3>
          </Card>
        </Card>
      </Row>
      <div
        style={{
          backgroundColor: "#FFF",
          color: "black",
        }}
      >
        <Row>
          <Col
            span={8}
            style={{
              backgroundColor: "grey",
              color: "black",
              width: "100%",
              textAlign: "center",

              justifyContent: "center",
            }}
          >
            col-8
          </Col>
          <Col
            span={8}
            style={{
              backgroundColor: "white",
              color: "black",
              width: "100%",
              textAlign: "center",

              justifyContent: "center",
            }}
          >
            col-8
          </Col>
          <Col
            span={8}
            style={{
              backgroundColor: "grey",
              color: "black",
              width: "100%",
              textAlign: "center",

              justifyContent: "center",
            }}
          >
            col-8
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Thematique;
