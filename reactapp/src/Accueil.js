import React, { useState, useEffect, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import {
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
} from "antd";
import "antd/dist/antd.css";
import { connect } from "react-redux";
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
} from "@ant-design/icons";

import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";

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
  const [allPublications, setAllPublications] = useState([]);

  //Récupération les publications à l'initialisation
  useEffect(() => {
    const findPublications = async () => {
      console.log("init latest: ", latest);
      const publications = await fetch("publications/lastPublications");
      const body = await publications.json();
      // console.log("3 articles", body.latest);
      setLatest(body.latest);
      console.log(body);
    };
    findPublications();
    console.log("check push: ", latest);

    // recup de toutes les publications
    const allPublications = async () => {
      const listPublications = await fetch("publications/allPublications");
      const response = await listPublications.json();
      console.log("all: ", response.allPublications);
      setAllPublications(response.allPublications);
    };
    allPublications();
  }, []);

  // var cherche = async () => {
  //   const pourLaUne = await fetch("/publicationalaune");
  //   pourLaUneJ = await pourLaUne.json();
  //   setpublicationALaUne(pourLaUneJ.publiaccueil)
  //   console.log("et dans publicationALaUne?", publicationALaUne);
  //   }

  const [lastPublications, setLastPublications] = useState(latest);

  // var lienarticle = () => {
  //   props.addPubliToken(publicationALaUne.publiToken);
  //   setAtteindreArticle(true)
  // }

  // if (atteindreArticle) {
  //   return <Redirect to="/publication" />;
  // }

  // if (inscription) {
  //   return <Redirect to="/inscription" />;
  // }

  var toRead;

  // if(publicationALaUne){
  //   var title = publicationALaUne.titre
  //   var description = publicationALaUne.texte
  //   var image = publicationALaUne.image
  // }

  //   if(populaire){
  //     var title = publicationALaUne.titre
  //     var description = publicationALaUne.texte
  //     var image = publicationALaUne.image
  //     console.log('autre tab')
  //   }

  var publiCards = latest.map((publication, i) => {
    var toRead = publication;
    return (
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={publication.image}
          alt="First slide"
        />
        <Carousel.Caption
          style={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            height: "30%",
            backgroundColor: "lightBlue",
            padding: 0,
            margin: 0,
          }}
        >
          <h3>{publication.titre}</h3>
          <p>{publication.texte}</p>
          <Link to={`/publication/${toRead._id}`}>
            <Button type="button" class="btn-danger">
              REAGIR
            </Button>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
    );
  });

  return (
    /* header */
    <Layout className="site-layout-background">
      <div id="head">
        <div>
          <Image
            preview={false}
            size={40}
            className="logo"
            width={200}
            src="./image/AGORA.png"
          />
        </div>
        <div>
          {" "}
          <p style={{ marginLeft: "50px" }}>
            {" "}
            Donnez votre avis d'une manière différente{" "}
          </p>
          <Button
            type="primary"
            size={100}
            style={{
              backgroundColor: "rgba(240, 52, 52, 1)",
              borderColor: "rgba(240, 52, 52, 1)",
              marginLeft: "50px",
            }}
          >
            Poster votre publication
          </Button>
        </div>
      </div>

      <Layout className="site-layout-background">
        <SideBarDroite />
        <Content
          style={{ padding: "0 24px", minHeight: 500, marginTop: "30px" }}
        >
          <Row justify="center">
            <Tabs type="card" style={{ width: 900, height: 600, padding: 15 }}>
              <TabPane tab="A la une " key="1">
                <Carousel>{publiCards}</Carousel>
              </TabPane>
              <TabPane tab="Les plus populaire" key="2">
                <Carousel>{publiCards}</Carousel>
              </TabPane>
            </Tabs>
          </Row>

          <Row>
            <Col
              justify="start"
              span={12}
              style={{
                backgroundColor: "transparent",
                textAlign: "center",
                marginTop: "70px",
              }}
            >
              <h3> Votre publication interesse-t-elle du monde ?</h3>
              <p>
                Découvrez les avis des autres utilisateurs... Lorem Ipsum is
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised
                in the 1960s with the release of Letraset sheets containing
                Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
              <DownCircleFilled
                style={{
                  fontSize: "60px",
                  color: "#214C74",
                  marginTop: "50px",
                }}
              />
            </Col>
            <Col id="illustration2" span={12}>
              col
            </Col>
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
                  borderRadius: "30px",
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
            dataSource={allPublications}
            footer={
              <div>
                <b>ant design</b> footer part
              </div>
            }
            renderItem={(publication) => (
              <List.Item
                key={publication.titre}
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
                extra={<img width={272} alt="logo" src={publication.image} />}
              >
                <List.Item.Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={
                    <Link to={`/publication/${publication._id}`}>
                      {publication.titre}
                    </Link>
                  }
                  description={publication.texte}
                />
                {/* "{item.content}" */}
              </List.Item>
            )}
          />
          <Row
            style={{
              backgroundColor: "blue",
            }}
          >
            <Col
              span={12}
              style={{
                backgroundColor: "transparent",
                textAlign: "center",
              }}
            >
              {" "}
              <h3> Votre publication interesse-t-elle du monde ?</h3>
              <p>
                Découvrez les avis des autres utilisateurs... Lorem Ipsum is
                simply dummy text of the printing and typesetting industry.
              </p>
            </Col>

            <Col
              span={12}
              style={{
                backgroundColor: "transparent",

                textAlign: "center",
              }}
            >
              <Button
                type="primary"
                size={100}
                style={{
                  backgroundColor: "rgba(240, 52, 52, 1)",
                  borderColor: "rgba(240, 52, 52, 1)",
                  marginLeft: "50px",
                }}
              >
                LOG IN
              </Button>
              <Button
                type="primary"
                size={100}
                style={{
                  backgroundColor: "rgba(140, 52, 52, 1)",
                  borderColor: "rgba(140, 52, 32, 1)",
                  marginLeft: "50px",
                }}
              >
                LOG OUT
              </Button>
            </Col>
          </Row>
          <Card
            title="Nos thématiques"
            style={{
              marginTop: "50px",
              marginBottom: "50px",
              textAlign: "center",
            }}
          >
            <Card.Grid style={gridStyle}>T’as remarqué?</Card.Grid>
            <Card.Grid style={gridStyle}>emploi</Card.Grid>
            <Card.Grid style={gridStyle}>Education</Card.Grid>
            <Card.Grid style={gridStyle}>Politique</Card.Grid>
            <Card.Grid style={gridStyle}>Evenement</Card.Grid>
            <Card.Grid style={gridStyle}>environnement</Card.Grid>
            <Card.Grid style={gridStyle}>Sport</Card.Grid>
            <Card.Grid style={gridStyle}>Tourisme</Card.Grid>
          </Card>
        </Content>
      </Layout>
      <Footer className="footer" style={{ textAlign: "left" }}>
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
    goToPublication: function (toRead) {
      dispatch({ type: "readPublication", selectPublication: toRead });
    },
    addPubliToken: function (publiToken) {
      dispatch({ type: "addPubliToken", publiToken: publiToken });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Accueil);
