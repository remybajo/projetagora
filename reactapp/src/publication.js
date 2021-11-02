import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {
  Radio,  Layout,  Menu,  Button,  Image,  Breadcrumb,  Card,  Avatar,  Divider,  Row,  Col,  Tabs,  List,  Space,  Comment,  Form,
  Input, Badge, Alert} from "antd";
import { connect } from "react-redux";

import { LikeOutlined, LikeFilled, Icon} from "@ant-design/icons";

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
  const [commentaire, setCommentaire] = useState("");
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
  const [count, setCount] = useState(0);
  const [icon, setIcon] = useState(<LikeFilled/>)
  const [likeComment, setLikeComment] = useState(false)

  const { TextArea } = Input;

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  var date;
  var dateComment;
  var token = props.token;
  
  const [content, setContent] = useState({_id:"",thematique:"", titre:"" ,texte: "", image: "", date_publication: '', statut: "", motsCle: '',
  publiToken: "", user_id: "", __v: ""});

  const [user, setUser] = useState({ id:"", username: "",  email: "", password:"", token: "", __v: 0,
  gender: "", dateOfBirth: null, CSP: "", civilState: "", numberOfcChild: ""});


  var dateFormat = function (date) {
    var newDate = new Date(date);
    var format = newDate.getFullYear()  + "/" + (newDate.getMonth() + 1) + "/" + newDate.getDate()  ;
    return format;
  };

  const getSelectedPublication = async() => {
    const publication = await fetch(`/publications/selectedPublication?id=${id}&token=${token}`)
    var body = await publication.json();

    //récupérer la publication
    setContent(body.publiToDisplay);

    // si l'utilisateur n'est pas loggé, cacher des éléments
    if(token)  {
      setConnected(true)
    }
    
    // recuperation des commentaires liés à la publication
    setCommentairesList(body.comments);
    //recuperations des stats liées à la publication
    setStats(body.stats);

    // récupérer les données du user
    if(token) {
      if(token == body.user.token){
        setUser(body.user)
      }
    }

    //vérifier si l'utilisateur a déjà voté et récupérer son vote le cas échéant
    if (token) {
      var voted = body.votes.filter(vote => vote.user_id == body.user._id);
      if (voted.length > 0) {
        setAlreadyVoted(true);
        setStatus(true)
        setUserVote(voted[0].vote)
      }

      var commented = body.comments.filter(comment => comment.user_id == body.user._id);
      if (commented.length > 0) {
        setAlreadyCommented(true)
        setUserComment(commented[0].commentaire)
      } else {
        setAlreadyCommented(false)
      }
  
    }

  }

  //récupérer le contenu de la publication sélectionnée, des commentaires associés et des stats associées
  useEffect(async() => {
    // Afficher tout
    getSelectedPublication(); 
  },[])

  useEffect(() => {
    getSelectedPublication()
  }, [token])

  useEffect(() => {
    setCommentairesList(props.commentairesList)
  }, [props.commentairesList])
  

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
      setMessage(<Alert message="Votre vote a bien été pris en compte. Merci pour votre participation." type="success" showIcon />);
      setAlreadyVoted(true);
      date = dateFormat(Date.now());
      console.log("date: ", date);
      sendVote();
      getSelectedPublication(); 
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
      setComment("");
      getSelectedPublication(); 
      setMessageCom(<Alert message="Votre commentaire a bien été envoyé." type="success" showIcon />);
      //setCommentairesList([...commentairesList, commentaire])
      
      //setBoutonValiCom("");
      setBoutonValiCom("Annuler le commentaire");
    }
  };

  var handleLike = (id_clicked) => {
    setLikeComment(!likeComment)
    console.log("commentaire cliked",id_clicked)
    
    
    if (likeComment == true) {
      for (var i=0; i<commentairesList.length; i++){
        if (commentairesList[i]._id == id_clicked) {
          commentairesList[i].nb_likes +=1;
          props.updateNbLikes(commentairesList);
          setCount(count+1);
          //setIcon(<LikeOutlined/>);
        }
      }
    } else {
      for (var i=0; i<commentairesList.length; i++){
        if (commentairesList[i]._id == id_clicked) {
          if(commentairesList[i].nb_likes > 0)
          commentairesList[i].nb_likes -=1;
          props.updateNbLikes(commentairesList)
          //setIcon(<LikeFilled/>);
        }
          }
      }

      // var sendlike = async () => {
      //   await fetch("/votes/sendLike", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
      //     body: `comment_id=${id}&publication=${id}&date=${date}&token=${token}`,
      //   });
      // };
     
    }
    console.log("commentaireslist w like", commentairesList);
    console.log("count ", count)
  

  // supprimer son commentaire
  var commentSuppr = async () => {
    setUserComment("");
    await fetch(`/publications/deleteComment?id=${id}&token=${token}`, {
      method: 'DELETE'
    });
    setMessageCom("Le commentaire a bien été supprimé.")
    getSelectedPublication(); 
  
    //setAlreadyCommented(false)
  }

  // if(commentairesList) {
  //   console.log("liste des comments: ",commentairesList);
  //   console.log("stats: ", stats);
  // } else {
  //   <p>Aucun commentaire publié</p>
  // }

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
  
    console.log("a voté?", alreadyVoted);
    console.log("userVote ", userVote);
    console.log("connected: ", connected);
    console.log("user comments: ", userComment)
    console.log("type of stats ", stats[0])
    console.log("selection: ", selection);
    console.log("vote: ", userVote)
    console.log("connected? ", connected)
    console.log("user ", user)
    
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
      //marker: 
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
           
            {alreadyVoted ?
            <Plot
            data={data}
            layout={ {width: 500, height: 500, title: 'Résultat du Vote',
             paper_bgcolor:'beige'
                } } 
            />

            :
            <div style={{height:500, backgroundColor:'beige' ,display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}> 
            <h1>VOTRE VOTE</h1>
          
          
            <Radio.Group
              defaultValue="a"
              buttonStyle="solid"
              style={{ margin: 10, fontWeight: "bold", display:'flex', flexDirection:'column' }}
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

          </div>

            }

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
                <List.Item key={item._id}>
                  <List.Item.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title=""
                    description={item.commentaire}
                  />
                  {[
                    <Badge count={item.nb_likes} overflowCount={999} style={{cursor:'pointer'}} >
                    <Avatar icon={icon} onClick={() => handleLike(item._id)}/>
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
          <div>
          {alreadyVoted == true ?

              <p style={{padding:20, fontSize:20, fontStyle: 'italic'}}>
              Vous avez validez le vote suivant pour cette publication: 
              <span style={{padding:20, fontWeight:'bold', fontStyle: 'normal', color:"orange"}}>{userVote}</span></p>

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

                
                <p style={{padding:16, fontSize:20, fontStyle: 'italic', width:"100%", height:"100%"}}>
                  Votre Commentaire:    
                <span style={{padding:20, fontWeight:'bold', fontStyle: 'normal', color:'blue'}}>{userComment}</span>
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
  return { token: state.token, publiToken: state.publiToken, commentairesList: state.commentairesList };
}

function mapDispatchToProps(dispatch) {
  return {
      addToken: function (token) {
          dispatch({ type: 'addToken', token: token },         
          )
  }, updateNbLikes: function(commentairesList){
        dispatch({ type: 'updateLikes', listComments: commentairesList},         
          )
  }
}
}

export default connect
(mapStateToProps,
  mapDispatchToProps
  )(Publication);
