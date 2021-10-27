import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
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
  Tag,
  BackTop,
  Badge,
  Modal,
  Carousel,
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
import EnTete from "./EnTete";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const { Meta } = Card;
const { TabPane } = Tabs;

const gridStyle = {
  width: "25%",
  textAlign: "center",
};

//questions aléatoires
const listData = [];
for (let i = 0; i < 3; i++) {
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inscription, setInscription] = useState();

  //fonction du modal
  var showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (e) => {
    setIsModalVisible(false);
  };

  const handleCancel = (e) => {
    setIsModalVisible(false);
  };

  var handleClickCreer = async () => {
    if (props.token == null) {
      showModal();
    } else {
      return <Redirect to="/nouvelPublication" />;
    }
  };

  var handleClick = async () => {
    if (props.token == null) {
      showModal();
    } else {
      return <Redirect to="/" />;
    }
  };

  var redirection = async () => {
    console.log("coucou!!");
    // if(inscription == false){
    setInscription(true);
    // if(true == true){
    // return <Redirect to='/inscription'/>}
    console.log(inscription);
    console.log("oui, oui, oui, par ici tout va bien");
  };

  if (inscription) {
    return <Redirect to="/inscription" />;
  }

  if (inscription) {
    return <Redirect to="/inscription" />;
  }

  return (
    /* header */
    <Layout className="site-layout-background">
      <EnTete />

      <Row></Row>

      <Layout className="site-layout-background">
        <Sider className="site-layout-background">
          {" "}
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
            <Menu.Item key="2" icon={<CalendarOutlined />}>
              <Link to="/completerProfil">Mon compte</Link>
            </Menu.Item>

            <Menu.Item key="link" icon={<EditOutlined />}>
              <a
                href="https://ant.design"
                target="_blank"
                rel="noopener noreferrer"
              >
                Nouvelle publication
              </a>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content
          style={{ padding: "0 24px", minHeight: 280, marginTop: "30px" }}
        >
          <div>
            <Row justify="center">
              <div className="card-container">
                <Tabs type="card">
                  <TabPane tab="A la une " key="1">
                    <Card
                      style={{ width: 700 }}
                      cover={
                        <img
                          alt="avatar"
                          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                      }
                      actions={[
                        <Badge count={1000} overflowCount={999}>
                          <Avatar icon={<UserOutlined />} />
                        </Badge>,
                        <EditOutlined key="edit" />,
                        <Button type="primary" danger>
                          Réagir
                        </Button>,
                      ]}
                    >
                      <Meta
                        avatar={
                          <Avatar src="https://joeschmoe.io/api/v1/random" />
                        }
                        title="La question ?"
                        description="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
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
                        <Badge count={1000} overflowCount={999}>
                          <Avatar icon={<UserOutlined />} />
                        </Badge>,
                        <EditOutlined key="edit" />,

                        <Button
                          style={{
                            backgroundColor: "#E2A916",
                            borderColor: "#E2A916",
                          }}
                        >
                          Réagir
                        </Button>,
                        ,
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

          <Card
            title="Nos thématiques"
            style={{
              marginTop: "50px",
              marginBottom: "50px",
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
        </Content>

        <Sider className="sidebar-layout-background" width={200} height={300}>
          <Divider orientation="left" plain>
            THÈMES
          </Divider>
          <p>
            <Tag>
              <a href="https://"> Foot</a>
            </Tag>
            <Tag>
              <a href="https://"> stationnement</a>
            </Tag>
            <Tag>
              <a href="https://"> lycee</a>
            </Tag>
            <Tag>
              <a href="https://"> restaurent </a>
            </Tag>
            <Tag>
              <a href="https://"> piscine</a>
            </Tag>
            <Tag>
              <a href="https://"> salle de sport</a>
            </Tag>
            ecole / micro entreprise/ salons /metro / travaux / autre Debats
            centre de sante / residence/ quaie / stade / insecurité / ville /
            autre / Idée
          </p>
        </Sider>
      </Layout>
      <Footer style={{ textAlign: "left" }}>
        {" "}
        <Row>
          <Col span={8}>
            NOTRE GROUPE
            <ul class="un">
              <li>A propos</li>
              <li>Notre vision</li>
              <li>Contact</li>
            </ul>
          </Col>
          <Col span={8}>
            {" "}
            ASSISTANCE
            <ul class="un">
              <li>Aide</li>
              <li>Guide</li>
              <li>Mentions legales</li>
              <li>CGU</li>
              <li>Cookies</li>
            </ul>
          </Col>
          <Col span={8}>
            {" "}
            RESEAUX SOCIAUX
            <ul class="un">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Twitter</li>
            </ul>
          </Col>
        </Row>
      </Footer>
      <>
        <BackTop />
      </>
    </Layout>
  );
}

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, null)(Accueil);
