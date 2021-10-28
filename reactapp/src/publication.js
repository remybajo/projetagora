import React, { useState, useEffect } from "react";
import {
  Radio,  Layout,  Menu,  Button,  Image,  Breadcrumb,  Card,  Avatar,  Divider,  Row,  Col,  Tabs,  List,  Space,  Comment,  Form,
  Input,} from "antd";
import { connect } from "react-redux";

import {  SettingOutlined,  EditOutlined,  EllipsisOutlined,  DownloadOutlined,  TwitterOutlined,  FacebookOutlined,  LinkedinOutlined,
  UserOutlined,  MessageOutlined,  LikeOutlined,  StarOutlined,} from "@ant-design/icons";

import EnTete from "./EnTete";
import SideBarDroite from "./SideBarDroite";

function Publication(props) {
  const { Header, Footer, Sider, Content } = Layout;

  const [vote, setVote] = useState("");
  const [selection, setSelection] = useState("");
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [messageCom, setMessageCom] = useState("");
  const [boutonVali, setBoutonVali] = useState("Valider le choix");
  const [comment, setComment] = useState("");
  const [boutonValiCom, setBoutonValiCom] = useState("Envoyer le commentaire");
  const [currentPubli, setCurrentPubli] = useState()
  var date;
  var dateComment;
  var token = props.token;
  var publiToken = props.publiToken
  const { TextArea } = Input;

  var dateFormat = function (date) {
    var newDate = new Date(date);
    var format =
      newDate.getDate() +
      "/" +
      (newDate.getMonth() + 1) +
      "/" +
      newDate.getFullYear();
    return format;
  };


  useEffect(() => {
    setVote(selection);
    setMessage("");
    var affichePubli = async() => {
      var publiEC = await fetch('/publicationdb')
      const publi = await publiEC.json()
      console.log("ma publi",publi)
      setCurrentPubli(publi.publiEnCour)
      console.log("mon current", currentPubli)
    }
    affichePubli()
  }, [selection]);

  var sendVote = async () => {
    await fetch("/votes/sendVote", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `vote=${vote}&publication=""&date=${date}&token=""`,
    });
  };

  var voteValidation = () => {
    if (!vote) {
      setMessage("Veuillez choisir une option de vote avant de valider.");
    } else if (!status && boutonVali != "Annuler le vote") {
      setStatus(true);
      setMessage(
        "Votre vote a bien été pris en compte. Merci pour votre participation."
      );
      setBoutonVali("Annuler le vote");
      date = dateFormat(Date.now());
      console.log("date: ", date);
      sendVote();
    }
    if (boutonVali == "Annuler le vote") {
      setStatus(false);
      setBoutonVali("Valider le choix");
      setMessage("");
    }

    console.log(vote);
  };

  const data = [
    { auteur: "Ant Design Title 1", commentaire: "blablabla" },
    { auteur: "Ant Design Title 2", commentaire: "blablabla" },
  ];

  var sendComment = async () => {
    await fetch("/comments/sendComment", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `commentaire=${comment}&publication=""&date=${dateComment}&token=""`,
    });
  };

  var commentValidation = () => {
    console.log("commentaire: ", comment);
    if (!comment) {
      setMessageCom("Aucun commentaire saisi");
    } else {
      dateComment = dateFormat(Date.now());
      console.log("date commentaire: ", dateComment);
      sendComment();
      setMessageCom("Votre commentaire a bien été envoyé.");
      setComment("");
      setBoutonValiCom("");
      setBoutonValiCom("Annuler le commentaire");
    }
  };

  return (
    <Layout style={{ margin: 10 }}>
      <EnTete />

      <Row
        className="site-layout-background"
        justify="center"
        align="top"
        style={{ margin: 10 }}
      >
        <div style={{ display: "flex" }}>
          <Col span={4}>
            <Menu
              mode="vertical"
              defaultSelectedKeys={["2"]}
              style={{ margin: 10 }}
            >
              <Menu.Item key="1">Accueil</Menu.Item>
              <Menu.Item key="2">Thématique</Menu.Item>
              <Menu.Item key="3"> Profil </Menu.Item>
            </Menu>
          </Col>

          <Col
            span={10}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: 10,
            }}
          >
            <h1 style={{ color: "#37A4B2", fontSize: "200%" }}>
              {currentPubli.titre}
            </h1>

            <img
              src="../image/alaska.jpg"
              style={{ width: "30%", position: "relative" }}
            />

            <p>
            {currentPubli.texte}
            </p>
          </Col>
          <Col
            span={10}
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "beige",
            }}
          >
            <h1>Top Commentaires</h1>

            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item style={{ borderdColor: "#FFC806" }}>
                  <List.Item.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    auteur={data.auteur}
                    commentaire={data.commentaire}
                  />
                </List.Item>
              )}
            />
          </Col>
        </div>
      </Row>
      <Row>
        <Col
          span={14}
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "lightBlue",
          }}
        >
          <h1>VOTEZ</h1>

          <Radio.Group
            defaultValue="a"
            buttonStyle="solid"
            style={{ margin: 16, fontWeight: "bold", display: "flex" }}
          >
            <Radio.Button
              disabled={status}
              style={{ margin: 16, backgroundColor: "#FFC806" }}
              value="J'Adore"
              onClick={(e) => setSelection(e.target.value)}
            >
              J'Adore
            </Radio.Button>
          </Radio.Group>
          <Radio.Group
            defaultValue="a"
            buttonStyle="solid"
            style={{ margin: 16, fontWeight: "bold", display: "block" }}
          >
            <Radio.Button
              disabled={status}
              style={{ margin: 16, backgroundColor: "#EDAC06" }}
              value="Je suis Pour"
              onClick={(e) => setSelection(e.target.value)}
            >
              Je suis Pour
            </Radio.Button>
          </Radio.Group>
          <Radio.Group
            defaultValue="a"
            buttonStyle="solid"
            style={{ margin: 16, fontWeight: "bold", display: "block" }}
          >
            <Radio.Button
              disabled={status}
              style={{ margin: 16, backgroundColor: "#DAA419" }}
              value="Je suis Mitigé(e)"
              onClick={(e) => setSelection(e.target.value)}
            >
              Je suis Mitigé(e)
            </Radio.Button>
          </Radio.Group>
          <Radio.Group
            defaultValue="a"
            buttonStyle="solid"
            style={{ margin: 16, fontWeight: "bold", display: "block" }}
          >
            <Radio.Button
              disabled={status}
              style={{ margin: 16, backgroundColor: "#BE833D" }}
              value="Je suis Contre"
              onClick={(e) => setSelection(e.target.value)}
            >
              Je suis Contre
            </Radio.Button>
          </Radio.Group>
          <Radio.Group
            defaultValue="a"
            buttonStyle="solid"
            style={{ margin: 16, fontWeight: "bold", display: "block" }}
          >
            <Radio.Button
              disabled={status}
              style={{ margin: 16, backgroundColor: "#966215" }}
              value="Je Déteste"
              onClick={(e) => setSelection(e.target.value)}
            >
              Je Déteste
            </Radio.Button>
          </Radio.Group>

          <Button type="danger" shape="round" onClick={() => voteValidation()}>
            {" "}
            {boutonVali}
          </Button>

          {message}
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          AJOUTEZ UN COMMENTAIRE POUR ETAYER VOTRE VOTE (facultatif)
          <Form.Item>
            <TextArea
              rows={5}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tapez votre commentaire"
              value={comment}
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              onClick="{onSubmit}"
              type="primary"
              onClick={() => commentValidation()}
            >
              {boutonValiCom}
            </Button>
          </Form.Item>
          {messageCom}
        </Col>
      </Row>

      <Footer style={{ textAlign: "center" }}></Footer>
    </Layout>
  );
}

function mapStateToProps(state) {
  return { token: state.token, publiToken: state.publiToken };
}

export default connect(mapStateToProps, null)(Publication);
