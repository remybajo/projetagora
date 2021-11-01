import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {
  Radio,  Layout,  Menu,  Button,  Image,  Breadcrumb,  Card,  Avatar,  Divider,  Row,  Col,  Tabs,  List,  Space,  Comment,  Form,
  Input, Badge, Alert} from "antd";
import { connect } from "react-redux";

import { LikeOutlined, LikeFilled} from "@ant-design/icons";

import Plot from 'react-plotly.js';

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
  const [currentPubli, setCurrentPubli] = useState();
  const [publiExist, setPubliExist] = useState(false);
  const [list, setList] = useState();
  const [stats, setStats] = useState();
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [alreadyCommented, setAlreadyCommented] = useState(false);
  const [userVote, setUserVote] = useState();
  const [userComment, setUserComment] = useState("");
  const [connected, setConnected] = useState(false);
  const { TextArea } = Input;

  var date;
  var dateComment;
  var token = props.token;
  
  const [content, setContent] = useState({_id: "",thematique:"", titre:"" ,texte: "", image: "", date_publication: '', statut: "", motsCle: '',
  publiToken: "", user_id: "", __v: ""});


  var dateFormat = function (date) {
    var newDate = new Date(date);
    var format = newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear();
    return format;
  };


  //récupérer le contenu de la publication sélectionnée, des commentaires associés et des stats associées
  useEffect(async() => {
    console.log("id: ", {id})
    const getSelectedPublication = async() => {
      const publication = await fetch(`/publications/selectedPublication?id=${id}&token=${token}`)
      var body = await publication.json();

      //récupérer la publication
      setContent(body.publiToDisplay);

      // si l'utilisateur n'est pas loggé, cacher des éléments
      if(body.userConnected)  {
        setConnected(true)
      }
      // recuperation des commentaires
      setCommentairesList(body.comments);
      //recuperations des stats
      setStats(body.stats);
      // vérifier si l'utilisateur a déjà voté et récupérer son vote le cas échéant
      setAlreadyVoted(body.alreadyVoted)
      setUserVote(body.userVote);
      setAlreadyCommented(body.alreadyCommented);
    
      if (body.alreadyVoted == true) {
        setStatus(true)
      }
      if(body.alreadyCommented == true) {
        setUserComment(body.userComment)
      }
    }
    // Afficher tout
    getSelectedPublication(); 
  
  },[])

  useEffect(() => {
    if(token) {
      setConnected(true)
    }
  }, [token])

  

  // mise à jour de la sélection pour le vote
  useEffect(() => {
    setVote(selection);
    setMessage("");
  }, [selection]);

  // requête pour l'envoi du vote en bdd - utilisée dans la fonction voteValidation()
  var sendVote = async () => {
    await fetch("/votes/sendVote", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `vote=${vote}&publication=${id}&date=${date}&token=${token}`,
    });
  };

  // validation du vote au click sur bouton valider

  var voteValidation = () => {
    if (!vote) {
      setMessage(<Alert message="Veuillez choisir une option de vote avant de valider." type="error" showIcon />);
    } else if (vote && !status) {
      setStatus(true);
      setMessage(<Alert message="Votre vote a bien été pris en compte. Merci pour votre participation." type="success" showIcon />
      );
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

  // useEffect(() => {
  //   if(message == "Votre vote a bien été pris en compte. Merci pour votre participation.");
  //   setAlreadyVoted(true)
  // },[message])


 // requête pour envoi du vote en bdd, utilisée dans la fonction commentValidation()
  var sendComment = async () => {
    await fetch("/comments/sendComment", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `commentaire=${comment}&publication=${id}&date=${dateComment}&token=${token}`,
    });
  };


  // validation du commentaire pour enregistrement bdd
  var commentValidation = () => {
    if (!comment) {
      setMessageCom(<Alert message="Aucun commentaire saisi" type="error" showIcon />);
    } else {
      dateComment = dateFormat(Date.now());
      console.log("date commentaire: ", dateComment);
      sendComment();
      setMessageCom(<Alert message="Votre commentaire a bien été envoyé." type="success" showIcon />);
      setCommentairesList([...commentairesList, comment])
      setComment("");
      setBoutonValiCom("");
      setBoutonValiCom("Annuler le commentaire");
    }
  };

  // useEffect(() => {
  //   if(messageCom == "Votre commentaire a bien été envoyé.");
  //   setAlreadyCommented(true);
  // },[messageCom])

 

  // supprimer son commentaire
  var commentSuppr = async () => {
    setUserComment("");
    await fetch(`/publications/deleteComment?id=${id}&token=${token}`, {
      method: 'DELETE'
    });
    setMessageCom("Le commentaire a bien été supprimé.")
    setAlreadyCommented(false)
  }

  if(commentairesList) {
    console.log("liste des comments: ",commentairesList);
    console.log("stats: ", stats);
  } else {
    <p>Aucun commentaire publié</p>
  }

  // mise en forme des arrays pour graphiques
  //const [labels, setLabels] = useState([]);
  //const [values, setValues] = useState([]);;

  var labels = [];
  var values = [];

  if(stats) {
    
    stats.map(stat => labels.push(stat._id));
    stats.map(stat => values.push(stat.userCount));
    
    console.log("labels: ", labels);
    console.log("values: ", values);
    console.log('labels', Array.isArray(labels));
    console.log('values', Array.isArray(values))
    console.log("a voté?", alreadyVoted);
    console.log("userVote ", userVote);
    console.log("connected: ", connected);
    console.log("user comments: ", userComment)
    console.log("type of stats ", stats[0])
    console.log("selection: ", selection);
    console.log("vote: ", vote)
    console.log("connected? ", connected)
    
  }

  var voteArea = () => {
    if (alreadyVoted == true) {
      setStatus(true)
    } 
  }


  var data = [
    {
      values: values,
      labels: labels,
      type: "pie",
    },
  ];


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
        style={{ margin: 5, padding:5 }}
      >
        <div style={{ width:"100%", display: "flex" }}>

          <Col
            span={8} className="gutter-row"
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
          <Col span={8} className="gutter-row"
          style={{margin:5}}>
           
            <Plot
            data={data}
            layout={ {width: 500, height: 500, title: 'Résultat du Vote'} } />
          
          </Col>
          <Col
            span={8} className="gutter-row"
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor:"#FFFFFF",
              border: "2px solid beige",
              padding:20,
              margin: 5,
              color:"blue"
            }}
          >
            <h5>Top Commentaires</h5>

            <div>
              {connected == false ?

                <p style={{padding:20, fontSize:20, fontWeight:'bold', backgroundColor:"lightgray",width:"100%", height:"100%"}}>
                CONNECTEZ-VOUS POUR ACCEDER AUX COMMENTAIRES
                </p>
                
              :

            <List
              itemLayout="horizontal"
              dataSource={commentairesList}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title=""
                    description={item.commentaire}
                  />
                  {[

                    <Badge count={2} overflowCount={999}>
                    <Avatar icon={<LikeFilled/>} />
                    
                    <Avatar icon={<LikeOutlined/>} />
                  </Badge>
                  
                  ]}
                </List.Item>
                
              )}
            />
              }
            </div>
            
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
          <h1>VOTRE VOTE</h1>
          
          
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
            > J'Adore
            </Radio.Button>
          
            <Radio.Button
              disabled={status}
              style={{ margin: 16, backgroundColor: "#EDAC06" }}
              value="Je suis Pour"
              onClick={(e) => setSelection(e.target.value)}
            >
              Je suis Pour
            </Radio.Button>
            <Radio.Button
              disabled={status}
              style={{ margin: 16, backgroundColor: "#DAA419" }}
              value="Je suis Mitigé(e)"
              onClick={(e) => setSelection(e.target.value)}
            >
              Je suis Mitigé(e)
            </Radio.Button>
          
            <Radio.Button
              disabled={status}
              style={{ margin: 16, backgroundColor: "#BE833D" }}
              value="Je suis Contre"
              onClick={(e) => setSelection(e.target.value)}
            >
              Je suis Contre
            </Radio.Button>
          
            <Radio.Button
              disabled={status}
              style={{ margin: 16, backgroundColor: "#966215" }}
              value="Je Déteste"
              onClick={(e) => setSelection(e.target.value)}
            >
              Je Déteste
            </Radio.Button>
            

          <Button type="danger" shape="round" disabled={status} onClick={() => voteValidation()}>
            {" "}
            {boutonVali}
          </Button>
          {message}
          </Radio.Group>
          <div>
          {alreadyVoted == true ?

              <p style={{padding:20, fontSize:20}}>
              Vous avez validez le vote suivant pour cette publication: 
              <span style={{padding:20, fontWeight:'bold', backgroundColor:"orange"}}>{userVote}</span></p>

            :
            ""
          }
          </div>
          
          
        </Col>
      </Row>

      <Row>
        <Col span={24} className="gutter-row"> 
          
          <div>
              {alreadyCommented == true ?

                
                <p style={{padding:20, fontSize:20, fontWeight:'bold',width:"100%", height:"100%"}}>
                  Votre Commentaire:    
                <span style={{padding:20, fontWeight:'bold', backgroundColor:"beige"}}>{userComment}</span>
                <Button
                  htmlType="submit"
                  onClick="{onSubmit}"
                  type="primary"
                  onClick={() => commentSuppr()}
                >
                Supprimer le commentaire
                </Button> 
                {messageCom}
                </p>
                
              :
          <div>
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
          </div>
           }
           </div>
         

        </Col>
      </Row>
      </Content> 
      </Layout>
      <Footer style={{ textAlign: "center" }}></Footer>
    </Layout>
  );
}

function mapStateToProps(state) {
  return { token: state.token, publiToken: state.publiToken };
}

export default connect(mapStateToProps, null)(Publication);
