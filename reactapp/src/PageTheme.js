import React, { useState, useEffect, useRef } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import {
  Layout,
  Menu,
  Card,
  Row,
  Col,
  Tabs,
  Space,
  List,
  Statistic,
  Image,
  Button,
  Divider,

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
  DownCircleFilled,
  SolutionOutlined,
  ArrowRightOutlined,
  EditFilled,
} from "@ant-design/icons";
import EnTete from "./EnTete";
import SideBarDroite from "./SideBarDroite";
import "antd/dist/antd.css";
import Politique from "../src/image/Politique.jpg";
import Education from "../src/image/Education.jpg";
import Emploi from "../src/image/Emploi.jpg";
import Environnement from "../src/image/Environnement.jpg";
import Evenement from "../src/image/Evenement.jpg";
import Remarquer from "../src/image/Remarquer.jpg";
import Sport from "../src/image/Sport.jpg";
import Tourisme from "../src/image/Tourisme.jpg";
import PiedDePage from "./piedDePage";
import AGORA from "../src/image/AGORA.png"
import SearchBar from "./Components/SearchBar";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const { Meta } = Card;
const { TabPane } = Tabs;

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: "https://ant.design",
    title: `Question ${i + 1}`,
    avatar: "https://joeschmoe.io/api/v1/random",
    description: "Badge",
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

function PageTheme(props) {
  var { theme } = useParams();
  const [latest, setLatest] = useState([]);
  const [themeArticle, setThemeArticle] = useState(theme);
  const [publicationTitre, setPublicationTitre] = useState();

  //   useEffect(() => {
  //      Thematique();

  //   }, []);

  useEffect(() => {
    const Thematique = async () => {
      var rawResponse = await fetch(`/publicationdb?theme=${theme}`);
      const response = await rawResponse.json();

      setLatest(response.publicationTheme);
    };
    Thematique();
  }, [theme]);

  //test

  console.log("pagetheme mon latest", latest);
  useEffect(() => {
    const findPublications = async () => {
        const toutePublication = await fetch("/searchPublication");
        const res_publication = await toutePublication.json();
        console.log("ma res_publication", res_publication.allPublications)
        setPublicationTitre(res_publication.allPublications)
    }; findPublications()
}, []);
var publicationT=publicationTitre

  return (
    <Layout className="site-layout-background">
      {" "}
      <div id="head" style={{display:"flex"}}>
      
      <div >
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <Image
          preview={false}
          size={40}
          className="logo"
          width={150}
          src={AGORA}
        />
         <div className="searchbar" style={{display:"flex", justifyContent:"center"}}>
        <SearchBar  placeholder="chercher une publication" data={publicationT}/>
      </div>
        <div>
          {" "}
          <Button
          size={20}
            type="text"
            style={{
             
              backgroundColor: "#214C74",
              borderColor: "#214C74",
            }}
          >
            LOG IN
          </Button>
          
          <Button
            type="link"
            style={{
              backgroundColor: "transparent",
              color: "#214C74",

              borderColor: "transparent",
            }}
          >
            LOG OUT
          </Button>
          </div>
          </div>
        <div>
         <p style={{ marginLeft: "50px", fontWeight:"bold" }}>
          {" "}
          Donnez votre avis d'une manière différente{" "}
        </p>
        </div>
      </div>
     
      <div>
        
       
        
        <Button
          type="primary"
          size={100}
          style={{
            backgroundColor: "rgba(240, 52, 52, 1)",
            borderColor: "rgba(240, 52, 52, 1)",
            marginLeft: "50px",
            boxShadow: "1px 15px 10px grey",
          }}
        >
          Poster votre publication
        </Button>
      </div>

      
      
    </div>
      
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
              {theme}
            </h1>
          </Col>
          <Col span={12}>
            <Statistic title="Nombre de questions" value={latest.length} />
          </Col>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 3,
            }}
            dataSource={latest}
            footer={
              <div>
                <b>Voir le reste des commentaires</b> <ArrowRightOutlined />
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
                extra={<img width={272} alt="image de theme" src={Politique} />}
              >
                <List.Item.Meta
                  title={
                    <Link to={`/publication/${item._id}`}>{item.titre}</Link>
                  }
                  description={item.texte}
                />
                {item.content}
              </List.Item>
            )}
          />
        </Content>
      </Layout>
      <PiedDePage />
    </Layout>
  );
}

export default PageTheme;
