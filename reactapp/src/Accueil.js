import React from "react";
import {
  Button,
  Layout,
  Menu,
  Breadcrumb,
  Image,
  Card,
  Avatar,
  Divider,
  Row,
  Col,
  Tabs,
  List,
  Space,
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
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

const { Meta } = Card;
const { TabPane } = Tabs;

const gridStyle = {
  width: "25%",
  textAlign: "center",
};

//questions aléatoires
const listData = [];
for (let i = 0; i < 10; i++) {
  listData.push({
    href: "https://ant.design",
    title: `THEME ${i + 1}`,
    avatar: "https://joeschmoe.io/api/v1/random",
    description: "sous-theme ou tag perso",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  });
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

// import {Redirect} from 'react-router-dom';
// import {connect} from 'react-redux';

function Accueil(props) {
  return (
    <Layout className="site-layout-background">
      <Row>
        <Col span={6}>
          {" "}
          <Image className="logo" width={200} src="./image/AGORA.png" />
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
        </Col>
      </Row>

      <Row>
        <Col span={18}>
          <Menu mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">Accueil</Menu.Item>
            <Menu.Item key="2">Thématique</Menu.Item>
            <Menu.Item  key="3">  Profil </Menu.Item>
          </Menu>
        </Col>

        <Col span={6}>
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
        </Col>
      </Row>

      <Layout className="site-layout-background">
        <Content
          style={{ padding: "0 24px", minHeight: 280, marginTop: "30px" }}
        >
          <div>
            <Row justify="center">
              <div className="card-container">
                <Tabs type="card">
                  <TabPane tab="A la une " key="1">
                    <p>-</p>
                    <Card
                      style={{ width: 700 }}
                      cover={
                        <img
                          alt="example"
                          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                      }
                      actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                      ]}
                    >
                      <Meta
                        avatar={
                          <Avatar src="https://joeschmoe.io/api/v1/random" />
                        }
                        title="La question ?"
                        description="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
                      />
                    </Card>
                  </TabPane>
                  <TabPane tab="Les plus populaire" key="2">
                    <p>Content of Tab Pane 2</p>
                    <Card
                      style={{ width: 800 }}
                      cover={
                        <img
                          alt="example"
                          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                      }
                      actions={[
                        <EllipsisOutlined key="ellipsis" />,
                        <EditOutlined key="edit" />,
                        <SettingOutlined key="setting" />,
                      ]}
                    >
                      <Meta
                        avatar={
                          <Avatar src="https://joeschmoe.io/api/v1/random" />
                        }
                        title="Card title"
                        description="This is the description"
                      />
                    </Card>
                  </TabPane>
                  <TabPane tab="Tab Title 3" key="3">
                    <p>Content of Tab Pane 3</p>
                    <Card
                      style={{ width: 800 }}
                      cover={
                        <img
                          alt="example"
                          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                      }
                      actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                      ]}
                    >
                      <Meta
                        avatar={
                          <Avatar src="https://joeschmoe.io/api/v1/random" />
                        }
                        title="Card title"
                        description="This is the description"
                      />
                    </Card>
                  </TabPane>
                </Tabs>
              </div>
            </Row>
            <Row justify="center">
              <Col span="2"></Col>
              <Col span="20">
                <h1
                  style={{
                    backgroundColor: "#214C74",
                    marginTop: "50px",
                    marginBottom: "50px",
                    color: "white",
                    width: "100%",
                    textAlign: "center",
                    height: 50,
                    justifyContent: "center",
                  }}
                >
                  Les questions
                </h1>
              </Col>
              <Col span="2"></Col>
            </Row>
          </div>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 3,
            }}
            dataSource={listData}
            footer={
              <div>
                <b>ant design</b> footer part
              </div>
            }
            renderItem={(item) => (
              <List.Item
                key={item.title}
                actions={[
                  <IconText
                    icon={StarOutlined}
                    text="156"
                    key="list-vertical-star-o"
                  />,
                  <IconText
                    icon={LikeOutlined}
                    text="156"
                    key="list-vertical-like-o"
                  />,
                  <IconText
                    icon={MessageOutlined}
                    text="2"
                    key="list-vertical-message"
                  />,
                ]}
                extra={
                  <img
                    width={272}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<a href={item.href}>{item.title}</a>}
                  description={item.description}
                />
                {item.content}
              </List.Item>
            )}
          />
          ,
          <Card
            title="Nos thématiques"
            style={{
              marginTop: "50px",
              textAlign: "center",
            }}
          >
            <Card.Grid style={gridStyle}>T’as remarqué?</Card.Grid>
            <Card.Grid hoverable={false} style={gridStyle}>
              emploi
            </Card.Grid>
            <Card.Grid style={gridStyle}>Education</Card.Grid>
            <Card.Grid style={gridStyle}>Politique</Card.Grid>
            <Card.Grid style={gridStyle}>Evenement</Card.Grid>
            <Card.Grid style={gridStyle}>environnement</Card.Grid>
            <Card.Grid style={gridStyle}>Sport</Card.Grid>
            <Card.Grid style={gridStyle}>Tourisme</Card.Grid>
          </Card>
          ,
        </Content>
        <Sider className="sidebar-layout-background" width={200} height={300}>
          <Divider orientation="left" plain>
            THÈMES
          </Divider>
          <p>
            Politique / Education / Sport / Projet et environnement / Evenement
            / Culture / Economie / Entreprise/ emploi /start up / Fait Divers /
            autre Debats Santé / Transport / Tourisme / voyage / Locale / France
            / T’as remarqué? / Idée
          </p>
        </Sider>
      </Layout>
      <Footer style={{ textAlign: "center" }}>footer</Footer>
    </Layout>
  );
}

export default Accueil;
