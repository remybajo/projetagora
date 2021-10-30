
import { Link, Redirect } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
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
  Space,
  List,
  Statistic,
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
  ArrowRightOutlined,
} from "@ant-design/icons";
import EnTete from "./EnTete";
import SideBarDroite from "./SideBarDroite";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const { Meta } = Card;
const { TabPane } = Tabs;



const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function PageTheme(props) {

const [latest, setLatest] = useState([])
const [themeArticle, setThemeArticle] = useState([])

  useEffect(() => {
    const Politique = async () => {
      var rawResponse = await fetch('/publicationdb');
      const response = await rawResponse.json();
      setLatest(response.publicationTheme);

     console.log(latest)
     console.log(response)

     }
    Politique();
    // cherche()
    
  }, []);

  const [lastPublications, setLastPublications] = useState(latest);
  const listData = [];
 var publiCards = latest.map((article, i) => {
 var toRead = article;
  for (let i = 0; i < 2; i++) {
    listData.push({
      
    //   title: article.titre,
    //   image: article.image,
    //   content: article.text
     });
  }
    return (
    <List
    
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 1,
      }}
      
      dataSource={listData}
      
      
      renderItem={(item) => (
        <List.Item
        
         
          extra={
            <img
              width={272}
              alt="logo"
              src={article.image}
            />
            
          }
        >
          
          <List.Item.Meta
            title={<a href={`/publication/${toRead._id}`}>{article.titre}</a>}
            description={article.texte}
          />

        </List.Item>

        
        
        
      )} 
    /> 
   
  
    );
  });
  
 

  return (
    <Layout className="site-layout-background">
      
      
      {" "}
      <EnTete />
      <Layout className="site-layout-background">
        <SideBarDroite />
        <Content
          style={{ padding: "0 24px", minHeight: 280, marginTop: "30px" }}
        >
          <Col span="16">
            <h1
              style={{
                backgroundColor: "#214C74",
                color: "white",
                width: "100%",
                textAlign: "center",
                height: 50,
                justifyContent: "center",
                marginBottom: 50,
                marginLeft: 200,
              }}
            >
              Politique
            </h1>
          </Col>
          <Col span={12}>
            <Statistic title="Nombre de Publications" value={publiCards.length} />
          </Col>
         {publiCards}
         <List
        footer={
          <div>
            <b>Voir le reste des commentaires</b> <ArrowRightOutlined />
          </div>
         
        } />
        </Content>
      
       
      </Layout>
      <Footer>
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
    </Layout>
  );
      }

export default PageTheme;
