import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
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

  var { id } = useParams();
  
  const [vote, setVote] = useState("");
  const [selection, setSelection] = useState("");
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [messageCom, setMessageCom] = useState("");
  const [boutonVali, setBoutonVali] = useState("Valider le choix");
  const [comment, setComment] = useState("");
  const [boutonValiCom, setBoutonValiCom] = useState("Envoyer le commentaire");
  const [commentairesList, setCommentairesList] = useState([]);
  var date;
  var dateComment;
  var token = props.token;
  const { TextArea } = Input;

  const [content, setContent] = useState({_id: "",thematique:"", titre:"" ,texte: "", image: "", date_publication: '', statut: "", motsCle: '',
  publiToken: "", user_id: "", __v: ""});


  var dateFormat = function (date) {
    var newDate = new Date(date);
    var format = newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear();
    return format;
  };

  useEffect(() => {
    setVote(selection);
    setMessage("");
  }, [selection]);

  //récupérer le contenu de la publication sélectionnée sur l'accueil
  useEffect(async() => {
    console.log("id: ", {id})
    console.log("sans accolades: ",id)
    const getSelectedPublication = async() => {
      const publication = await fetch(`/publications/selectedPublication?id=${id}`)
    
    var body = await publication.json();
    console.log("body received: ", body.publiToDisplay)
    setContent(body.publiToDisplay)
    }
    getSelectedPublication()
  },[])  
    

  useEffect(()=> {
    const getComments = async() => {
      const comments = await fetch(`comments/showComments?id=${id}`)
      const body = await comments.json();
      console.log("body comments: ",body.comments)
      setCommentairesList([...commentairesList, body.comments]);      
    }
      getComments()    
  },[])

  var sendVote = async () => {
    await fetch("/votes/sendVote", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `vote=${vote}&publication=${id}&date=${date}&token=${token}`,
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

 
  var sendComment = async () => {
    await fetch("/comments/sendComment", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `commentaire=${comment}&publication=${id}&date=${dateComment}&token=${token}`,
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
      <Layout>
        
        <SideBarDroite/>
      <Content style={{margin:10}}>   
      <Row
        gutter={{ xs: 24, sm: 24, md: 12 }}
        className="site-layout-background"
        justify="center"
        align="top"
        style={{ margin: 0, padding:0 }}
      >
        <div style={{ width:"100%", display: "flex" }}>

          <Col
            span={12} className="gutter-row"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: 5,
              border:'2px solid #37A4B2',
              
            }}
          >
            <h1 style={{ color: "#37A4B2", fontSize: "200%" }}>
              {content.titre}
            </h1>

            <img
              src={content.image}
              style={{ width: "70%", position: "relative" }}
            />

            <p>{content.texte}</p>
          </Col>
          <Col
            span={12} className="gutter-row"
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor:"#FFFFFF",
              border: "2px solid beige",
              margin:5
            }}
          >
            <h5>Top Commentaires</h5>
          
            <List
              itemLayout="horizontal"
              dataSource={commentairesList}
              renderItem={(item) => (
                <List.Item style={{ borderdColor: "#FFC806" }}>
                  <List.Item.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    auteur={commentairesList._id}
                    commentaire={commentairesList.commentaire}
                    date = {commentairesList.date}
                  />
                </List.Item>
              )}
            />
          </Col>
        </div>
      </Row>
      <Row gutter={{ xs: 24, sm: 24, md: 12 }}>
        <Col
        className="gutter-row"
          span={24}
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
        <Col span={24} className="gutter-row"> 
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
      </Content> 
      </Layout>
      <Footer style={{ textAlign: "center" }}></Footer>
    </Layout>
  );
}

function mapStateToProps(state) {
  return { token: state.token};
}

export default connect(mapStateToProps, null)(Publication);
