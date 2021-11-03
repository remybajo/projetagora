import React, { useState, useEffect, createElement } from "react";
import { useParams } from 'react-router-dom';
import {
  Radio,  Layout,  Menu,  Button,  Image,  Breadcrumb,  Card,  Avatar,  Divider,  Row,  Col,  Tabs,  List,  Space,  Comment,  Form,
  Input, Badge, Alert, Tooltip} from "antd";
import { connect } from "react-redux";

import { LikeOutlined, LikeFilled, DislikeOutlined, DislikeFilled} from "@ant-design/icons";

import Plot from 'react-plotly.js';
import SearchBar from "./Components/SearchBar";
import "./publication.css";
import EnTete from "./EnTete";
import SideBarDroite from "./SideBarDroite";
import AGORA from "../src/image/AGORA.png"

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
  const [counter, setCounter] = useState(0)
  const [icon, setIcon] = useState(<LikeFilled/>)
  const [likeComment, setLikeComment] = useState(false)
  const [gender, setGender] = useState();
  const [publicationTitre, setPublicationTitre] = useState();
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);


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
    setGender(body.gender);
    console.log("body gender ", body.gender)

  }

  //recupération données bar de recherche
  useEffect(() => {
    const findPublications = async () => {
        const toutePublication = await fetch("/searchPublication");
        const res_publication = await toutePublication.json();
        console.log("ma res_publication", res_publication.allPublications)
        setPublicationTitre(res_publication.allPublications)
    }; findPublications()
}, []);
var publicationT=publicationTitre

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
    } else if (!token) {
      setMessage(<Alert message="Veuillez vous identifier avant de voter." type="error" showIcon />);
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


 // requête pour envoi du vote en bdd, utilisée dans la fonction commentValidation()
  var sendComment = async () => {
    await fetch("/comments/sendComment", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `commentaire=${comment}&publication=${id}&date=${dateComment}&token=${token}&vote=${userVote}`,
    });
  };


  // validation du commentaire pour enregistrement bdd
  var commentValidation = () => {
    if (!comment) {
      setMessageCom(<Alert message="Aucun commentaire saisi" type="error" showIcon />);
    } else if (!token) {
      setMessageCom(<Alert message="Veuillez vous identifier pour envoyer un commentaire" type="error" showIcon />);
    } else if (!userVote) {
      setMessageCom(<Alert message="Veuillez voter avant d'envoyer un commentaire" type="error" showIcon />);
    } else {
      dateComment = dateFormat(Date.now());
      console.log("date commentaire: ", dateComment);
      sendComment();
      setComment("");
      setMessageCom(<Alert message="Votre commentaire a bien été envoyé." type="success" showIcon />);
      getSelectedPublication(); 
      //setCommentairesList([...commentairesList, commentaire])
      
      //setBoutonValiCom("");
      setBoutonValiCom("Annuler le commentaire");
    }
  };

  // GESTION DES LIKES SUR LES COMMENTAIRES


  var likeItem = (<span className="comment-action">0</span>)

  var handleLike = (i) => {
    var index = i.i
    console.log("liked index: ", index)
    var idComment = commentairesList[index]._id
    

    setLikeComment(true)

    // 3 lignes actuellement utilisées pour les pouces like
    setLikes(1);
    setDislikes(0);
    setAction('liked');


    commentairesList[index].nb_likes +=1;
    var updateLikeNb = commentairesList[index].nb_likes
    likeItem = (<span className="comment-action">1</span>)
    console.log("check commentaire clicked: ",commentairesList[index])
    

  
      var updateLikes = async () => {
        await fetch(`/comments/updateLikes?idComment=${idComment}`, {
          method: "PUT",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: "nbLikes=${updateLikeNb}",
        });
      };
     
    }
    console.log("commentaireslist w like", commentairesList);
    console.log("count ", count)

// Gerer les dislike -- ATTENTION - PAS TERMINé

var handleDislike = (i) => {
  var index = i.i;
  console.log("disliked index : ", index)
  var idComment = commentairesList[index]._id
   
  setLikes(0);
  setDislikes(1);
  setAction('disliked');

  if(commentairesList[index].nb_likes>0){
    commentairesList[index].nb_likes -=1 ;
  var updateLikeNb = commentairesList[index].nb_likes
  likeItem = (<span className="comment-action">1</span>)
  console.log("check commentaire clicked: ",commentairesList[index])
  }
}
  

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

  var labels = [];
  var values = [];
  var genderLabels = [];
  var genderValues = [];

  if(gender) {
    gender.map(gender => genderLabels.push(gender.genre));
    gender.map(gender => genderValues.push(gender.nbre));
  }

  if(stats) {
    
    stats.map(stat => labels.push(stat._id));
    stats.map(stat => values.push(stat.userCount));
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
      hoverinfo: 'none',
      text: labels,
      hoverinfo: 'none'
    }];

    var dataGender = [
      {
        values: genderValues, 
        labels: genderLabels,
        type: "pie",
        hoverinfo: 'none',
        text: genderLabels,
        hoverinfo: 'none',
        marker: {'colors': [
          "#FFC806",  //adore
          "#EDAC06",  //pour
       
         ] 
      },
      }];


  return (
    <Layout className='layout' style={{ margin: 10, backgroundColor:'white'}}>
    
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
      <div className="searchbar" style={{display:"flex", justifyContent:"center"}}>
      <SearchBar  placeholder="chercher une publication" data={publicationT}/>
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
      <Layout>
        
        <SideBarDroite/>
      <Content style={{margin:0}}>   
      <Row
        gutter={{ xs: 24, sm: 24, md: 12 }}
        className="site-layout-background"
        justify="center"
        align="top"
        style={{ margin: 10, padding:10, height:"60%" }}
      >
        <div style={{ width:"100%", height:"100%", display: "flex" }}>

          <Col
            span={9} className="gutter-row"
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

            <div style={{display:'flex', alignItems:'center'}}>
            <img
              src={content.image}
              style={{ width: "40%", margin:5, position: "relative" }}
            />
            
            <p style={{padding:5}}>{content.texte}</p>

            </div>
          </Col>
          <Col span={7} className="gutter-row"
          style={{margin:5, display:'flex', flexDirection:'row', justifyContent:'center'}}>
           
            {alreadyVoted ?
            <div>
            <Plot
            data={data}
            layout={ {width: 400, height: 400, title: 'Résultat du Vote',
             paper_bgcolor:'#F2F3F4', legend: {orientation: 'h', side: 'top'},
             showticklabels: true, showlegend:false
                } } 
            />
           
            </div>

            :
            <div style={{height:"90%", width:"100%",display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}> 
            <h1>VOTEZ</h1>
          
          
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
          {/* <Col span={4} className="gutter-row"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems:'center',
              backgroundColor:"#FFFFFF",
              padding:0,
              margin: 0,
              color:"blue"
            }}>
              <h5>Qui a voté ? </h5>
          <Plot
            data={dataGender}
            layout={ {width: 200, height: 200, margin:0, title: 'Genre',
             paper_bgcolor:'#919191', legend: {orientation: 'h', side: 'top'},
             showticklabels: true, showlegend:false
                } } 
            />
          </Col> */}
          <Col
            span={7} className="gutter-row"
            style={{
              display: "flex",
              flexDirection: "column",
             
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
              <div>
                {commentairesList.map((comment, i) => {
                  return(
              <Comment
              actions={[
                <Tooltip key="comment-basic-like" title="Like">
                  <span onClick={() => handleLike({i})}>
                    {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                    <span className="comment-action">{likes}</span>
                  </span>
                </Tooltip>,
                <Tooltip key="comment-basic-dislike" title="Dislike">
                  <span onClick={() => handleDislike({i})}> 
                    {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                    <span className="comment-action">{dislikes}</span>
                  </span>
                </Tooltip>,
                <span key="comment-basic-reply-to" style={{backgroundColor:'beige'}}>{comment.nb_likes + " likes"}</span>,
              ]}
              author={comment.vote}
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
              content={
                <p>{comment.commentaire}</p>
              }
              />) })}
            </div>

              }
            </div>
            
          </Col>
        </div>
      </Row>
      <Row  gutter={{ xs: 20, sm: 20, md: 12 }} style={{height:"20%"}}>
        <Col
        className="gutter-row"
          span={20}
          style={{
            display: "flex",
            justifyContent:'center',
            alignItems: "center",
            
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
        <Col span={20} className="gutter-row" > 
          
          <div style={{width:"100%", display:'flex', justifyContent:'center'}}>
              {alreadyCommented == true ?

                
                <div style={{padding:16, fontSize:20, fontStyle: 'italic', width:"100%", height:"100%", display:'flex', justifyContent:'center'}}>
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
                </div>
                
              :
          <div style={{width:"100%"}}>
          <Form.Item>
            <TextArea
              rows={4}
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




{/* Afficher tous les commentaires */}



       
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
