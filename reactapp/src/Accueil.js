import React, { useState, useEffect, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import {Layout, Menu, Breadcrumb, Image, Card, Avatar, Divider, Row, Col, Tabs, List, Space, Tag, BackTop,
  Badge, Modal} from "antd";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { SettingOutlined, EditOutlined, EllipsisOutlined, DownloadOutlined, TwitterOutlined, FacebookOutlined, LinkedinOutlined,
  UserOutlined, MessageOutlined, LikeOutlined, StarOutlined, MailOutlined, CalendarOutlined, AppstoreOutlined, LinkOutlined,
} from "@ant-design/icons";

import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button'

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
 
  const [inscription, setInscription] = useState();
  const [latest, setLatest] = useState([]);

 //Récupération les publications à l'initialisation
  useEffect(()=> {
    
    const findPublications = async() => {
      console.log("init latest: ", latest)
      const publications = await fetch('publications/lastPublications')
      const body = await publications.json();
      console.log(body.latest)
      setLatest([...latest, body.latest]);      
      
    }
      findPublications()    
  },[])

  const [lastPublications, setLastPublications] = useState(latest)

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
  
  var toRead;
  // var publiCards = latest.map((publication,i)=>{
  //   toRead = publication[i];
  //   return (<Card key={i}
  //   style={{ width: 700 }}
  //   cover={
  //     <img
  //       alt="avatar"
  //       src={publication[i].image}
  //     />
  //   }
  //   actions={[
  //     <Badge count={1000} overflowCount={999}>
  //       <Avatar icon={<UserOutlined />} />
  //     </Badge>,
  //     <EditOutlined key="edit" />,
  //     <Button type="primary" danger onClick={()=> console.log("click détecté sur: ", toRead._id)}>
  //       <Link to={`/publication/${toRead._id}`}>Reagir</Link>
  //     </Button>
  //   ]}
  // >
  //   <Meta
  //     avatar={
  //       <Avatar src="https://joeschmoe.io/api/v1/random" />
  //     }
  //     title={publication[i].titre}
  //     description={publication[i].texte}
  //   />
  // </Card>)
  // })

  var publiCards = latest.map((publication,i)=>{
      toRead = publication[i];
      return (
        <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={publication[i].image}
                      alt="First slide"

                    />
                    <Carousel.Caption style={{display:'flex',flexDirection:'column' ,width:"80%",height:"30%", backgroundColor:"lightBlue", padding:0, margin:0}}>
                      <h3>{publication[i].titre}</h3>
                      <p>{publication[i].texte}</p>
                    <Link to={`/publication/${toRead._id}`}><Button type="button" class="btn-danger">REAGIR</Button></Link>
                    </Carousel.Caption>
                  </Carousel.Item>)
                             
            
  })


  return (
    /* header */
    <Layout className="site-layout-background">
      <EnTete/>

      <Layout className="site-layout-background">
        <SideBarDroite />
        <Content
          style={{ padding: "0 24px", minHeight: 280, marginTop: "30px" }}
        >
          
            
              <Row justify="center" >
                <Tabs type="card">
                  <TabPane tab="A la une " key="1" >

                  <Carousel style={{width:900, padding:15}}>
                    {publiCards}
                  
                  </Carousel>
                    
                   
                  </TabPane>
                  <TabPane tab="Les plus populaire" key="2">

                  <Carousel style={{width:900}}>
                    {publiCards}
                  
                  </Carousel>

                  </TabPane>
                 </Tabs> 
                </Row>
            
            <Row justify="center" >
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

function mapDispatchToProps(dispatch){
  return {
    goToPublication: function(toRead){
      dispatch({type: 'readPublication',
        selectPublication: toRead
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Accueil);
