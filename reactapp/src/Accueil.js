import React, { useState, useEffect, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Layout, Menu, Breadcrumb, Image, Card, Avatar, Divider, Row, Col, Tabs, List, Space, Tag, BackTop,
  Badge, Modal, Carousel} from "antd";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { SettingOutlined, EditOutlined, EllipsisOutlined, DownloadOutlined, TwitterOutlined, FacebookOutlined, LinkedinOutlined,
  UserOutlined, MessageOutlined, LikeOutlined, StarOutlined, MailOutlined, CalendarOutlined, AppstoreOutlined, LinkOutlined,
} from "@ant-design/icons";
import EnTete from "./EnTete";
import SideBarDroite from "./SideBarDroite";
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

  // console.log('les props de l"accueil', props.publiaccueil)

 
  const [inscription, setInscription] = useState();
  const [latest, setLatest] = useState([]);
  const [publiToken, setPubliToken] = useState()
  const [publicationALaUne, setpublicationALaUne] = useState(pourLaUneJ);
  const [populaire, setPopulaire] = useState(false)
  const [atteindreArticle, setAtteindreArticle] = useState(false)
  // const []
  var pourLaUneJ = publicationALaUne

 //Récupération les publications à l'initialisation
  useEffect(()=> {
    
    // const findPublications = async() => {
    //   console.log("init latest: ", latest)
    //   const publications = await fetch('publications/lastPublications')
    //   const body = await publications.json();
    //   console.log(body.latest)
    //   setLatest([...latest, body.latest]);      
      
    // }
    //   findPublications()



  
      cherche()
  },[])

  var cherche = async () => {
    const pourLaUne = await fetch("/publicationalaune");
    pourLaUneJ = await pourLaUne.json();
    setpublicationALaUne(pourLaUneJ.publiaccueil)
    console.log("et dans publicationALaUne?", publicationALaUne);
    }


  
  const [lastPublications, setLastPublications] = useState(latest)

  var lienarticle = () => {
    props.addPubliToken(publicationALaUne.publiToken);
    setAtteindreArticle(true)
  }


  if (atteindreArticle) {
    return <Redirect to="/publication" />;
  }

  if (inscription) {
    return <Redirect to="/inscription" />;
  }
  

  // var publiCards = publicationALaUne.map((publication,i)=>{
    var publiCard = <Button type="primary" danger>rien</Button>

    if(publicationALaUne){
    var title = publicationALaUne.titre
    var description = publicationALaUne.texte
  }

    if(populaire){
      var title = publicationALaUne.titre
      var description = publicationALaUne.texte
      console.log('autre tab')
    }


    if (publicationALaUne){
    var publiCard = (<Card key='0'
                      style={{ width: 700 }}
                      cover={
                        <img
                          alt="avatar"
                          src={publicationALaUne.image}
                        />
                        
                      }
                      actions={[
                        <Badge count={1000} overflowCount={999}>
                          <Avatar icon={<UserOutlined />} />
                        </Badge>,
                        <EditOutlined key="edit" />,
                        <Button type="primary" danger onClick={(() => lienarticle())}>
                          Réagir
                        </Button>,
                      ]}
                      >
                      <Meta
                        avatar={
                          <Avatar src="https://joeschmoe.io/api/v1/random" />
                        }
                        title={title}
                        description={description}
                      />
                    </Card>)}
  
  console.log("et dans publicationALaUne?", publicationALaUne);

  var handleClick = () => {
  setPopulaire(true)
  setpublicationALaUne(false)
  console.log("mon handleClick")
}
  
  return (
    /* header */
    <Layout className="site-layout-background">
      <EnTete />

      <Row></Row>

      <Layout className="site-layout-background">
        <SideBarDroite />
        <Content
          style={{ padding: "0 24px", minHeight: 280, marginTop: "30px" }}
        >
          <div>
            <Row justify="center">
              <div className="card-container">
                <Tabs type="card">
                  <TabPane tab="A la une " key="1">

                  <Carousel dotPosition="bottom" dots="true" autoplay style={{ width: 700}}>
                    {publiCard}
                  </Carousel>
                    
                   
                  </TabPane>
                  <TabPane tab="Les plus populaire" key="2" onClick={() => handleClick()}>
                    <p>Content of Tab Pane 2</p>
                    {publiCard}
                  </TabPane>
                  <TabPane tab="Tab Title 3" key="3">
                    <p>Content of Tab Pane 3</p>
                    {publiCard}
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

function mapDispatchToProps(dispatch) {
  return {
    addPubliToken: function (publiToken) {
      dispatch({ type: "addPubliToken", publiToken: publiToken });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Accueil);
