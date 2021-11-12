import React, { useState, useEffect, createElement } from "react";
import { useParams } from 'react-router-dom';
import {
  Radio,  Layout,  Menu,  Button,  Image,  Breadcrumb,  Card,  Avatar,  Divider,  Row,  Col,  Tabs,  List,  Space,  Comment,  Form,
  Input, Badge, Alert, Tooltip, Modal, Statistic} from "antd";
import { connect } from "react-redux";

import { LikeOutlined, LikeFilled, DislikeOutlined, DislikeFilled, ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";

import Plot from 'react-plotly.js';
import SearchBar from "./Components/SearchBar";
import "./publication.css";
import EnTete from "./EnTete";
import SideBarDroite from "./SideBarDroite";
import AGORA from "../src/image/AGORA.png"
import Inscription from "./inscription";
import Header from "./Header";
import Commentaires from "./commentaires"

function Publication(props) {
  const { Footer, Sider, Content } = Layout;

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
  const [actionLike, setActionLike] = useState("");
  const [actionDislike, setActionDislike] = useState("");
  const [isConnect, setIsConnect] = useState(false);
  const [isConnectProfil, setIsConnectProfil] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [thumbUp, setThumbUp] = useState("");
  var newComment = {};
  var topComments = []

  const [idC, setIdC] = useState(0)


  const { TextArea } = Input;
  const { TabPane } = Tabs;

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
      setConnected(true);
    } else {
      setConnected(false)
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
  
    } else {
      setAlreadyVoted(false);
      setStatus(false);
      setAlreadyCommented(false)
    }
    setGender(body.gender);
    console.log("body gender ", body.gender)

    setMessage("")

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
  
  // Récup des nouveaux commentaires via le reducer pour le re-render des top commentaires
  // useEffect(() => {
  //   console.log("comment from reducer: ", props.commentairesList)
  //   setCommentairesList([...commentairesList, props.commentairesList[props.commentairesList.length-1]])
  //   //commentairesList.push(props.commentairesList)
  // }, [props.commentairesList])
  
  console.log("comment after update of commentairesList: ", commentairesList)

  // mise à jour de la sélection pour le vote
  useEffect(() => {
    setVote(selection);
    setMessage("");
    console.log("selection: ", selection)
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
      setVote("");
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
      // newComment = {commentaire: comment, vote: userVote, nb_likes: 0, nb_dislikes:0};
      // console.log("new comment object: ", newComment)
      // props.addComment(newComment);
      getSelectedPublication();
      setComment("");
      setMessageCom(<Alert message="Votre commentaire a bien été envoyé." type="success" showIcon />);
      //setCommentairesList([...commentairesList, commentaire])
      //setBoutonValiCom("");
      setBoutonValiCom("Annuler le commentaire");
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
//show Modal
  var showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (e) => {
    setIsModalVisible(false);
  };

  const handleCancel = (e) => {
    setIsModalVisible(false);
  };

  var handleClick = async () => {
    if (props.token == null) {
        setIsConnectProfil(false)}

        if (isConnectProfil == false){
      showModal();}
  };

  var deleteClick = (e) => {
    setIsConnectProfil(false)
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

      console.log('le i de la page publication', idC)

      console.log("check user id : ", user._id)
      
      console.log('see if update token: ', token)



  return (
    <Layout className='layout' style={{ margin: 10, backgroundColor:'white'}}>
    
      <Header/>
        
     
      <Layout>
        
        <SideBarDroite/>
      <Content>   
      <Row
        gutter={{ xs: 24, sm: 24, md: 12 }}
        className="site-layout-background"
        justify="center"
        align="top"
        style={{ margin:0, padding:0, height:"60%" }}
      >
        <div style={{ width:"100%", height:"100%", display: "flex" }}>

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
            <h1 style={{ color: "#37A4B2", fontSize: "200%", textAlign:'center'}}>
              {content.titre}
            </h1>

            <div style={{display:'flex', alignItems:'center', margin:10, padding:10}}>
            <img
              src={content.image}
              style={{ width: "40%", margin:5, position: "relative" }}
            />
            
            <p style={{padding:5}}>{content.texte}</p>

            </div>
          </Col>
          <Col span={8} className="gutter-row"
          style={{margin:5, display:'flex', flexDirection:'row', justifyContent:'center'}}>
           
            {alreadyVoted ?
            <div>
            <Plot
            data={data}
            layout={ {width:380, height: 380, title: 'Résultat du Vote',
             paper_bgcolor:'#F2F3F4', legend: {orientation: 'h', side: 'top'},
             showticklabels: true, showlegend:false, font:{fontWeight:'bold'}
                } } 
            />
           
            </div>

            :
            <div style={{width:300, height:350, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', position:'relative'}}> 
            <h2>VOTEZ</h2>
           
            <Radio.Button
                disabled={status} style={{backgroundColor: "#33EE22", margin:10, fontWeight:'bold'}} value="J'Adore"
                onClick={(e) => setSelection(e.target.value)} shape='round'
              > J'Adore  </Radio.Button>
                          
              <Radio.Button
                disabled={status} style={{backgroundColor: "#93c47d", margin:10, fontWeight:'bold'}} value="Je suis Pour"
                onClick={(e) => setSelection(e.target.value)} shape='round'
              > Je suis Pour  </Radio.Button>

              <Radio.Button
                disabled={status} style={{backgroundColor: "#ffd966", margin:10, fontWeight:'bold' }} value="Je suis Mitigé(e)"
                onClick={(e) => setSelection(e.target.value)} shape='round'
              > Je suis Mitigé(e)</Radio.Button>
                
            
                <Radio.Button
                disabled={status} style={{backgroundColor: "#ffa500", margin:10, fontWeight:'bold'}} value="Je suis Contre"
                onClick={(e) => setSelection(e.target.value)} shape='round'
              > Je suis Contre</Radio.Button>
            
            <Radio.Button
                disabled={status} style={{backgroundColor: "#f44336", margin:10, fontWeight:'bold'}} value="Je Déteste"
                onClick={(e) => setSelection(e.target.value)} shape='round'
              > Je Déteste</Radio.Button>
              

            <Button type="primary" size='large' disabled={status} onClick={() => voteValidation()}
            style={{marginTop:10}}>
              {boutonVali}
            </Button>
            {message}
        

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
              alignItems:'center',
              padding:20,
              margin: 5,
              color:"blue"
            }}
          >
            <h3>Top Commentaires</h3>

            <div>
              {connected == false ?

                <p style={{padding:20, fontSize:20, fontWeight:'bold',color: "#37A4B2", fontSize: "150%", textAlign:'center', backgroundColor:"lightgray",width:"100%", height:"100%"}}>
                CONNECTEZ-VOUS POUR ACCEDER AUX COMMENTAIRES
                </p>
                
              :

              <div>
                {alreadyVoted == false ?

                <p style={{padding:20, fontSize:20, fontWeight:'bold',color: "#37A4B2", fontSize: "150%", textAlign:'center', backgroundColor:"lightgray",width:"100%", height:"100%"}}>
                VOTEZ POUR ACCEDER AUX COMMENTAIRES
                </p>

                :

               <div> 
                {commentairesList.length == 0 ?
                <p style={{display:'flex', alignItems:'center'}}> Aucun commentaire publié pour le moment </p>
                
              :

              <div>
                {commentairesList.map((comment, i) => { 
                  return(
              <Commentaires vote={comment.vote} commentaire={comment.commentaire} nb_likes={comment.users_like.length} nb_dislikes={comment.users_dislike.length} id={comment._id} userId={user._id} alreadyLiked={comment.users_like.includes(user._id)} alreadyDisliked={comment.users_dislike.includes(user._id) }/>) })}
            </div>
            }
            </div>
              }
            </div> 

              }
            </div>
            
          </Col>
        </div>
      </Row>
      <Row  gutter={{ xs: 20, sm: 20, md: 12 }} style={{height:70}}>
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
              Vous avez voté
              <span style={{padding:20, fontWeight:'bold', fontStyle: 'normal', color:"orange",
              fontSize:30}}>{userVote}</span></p>

            :
            ""
          }
          </div>          
          
        </Col>
      </Row>

      <Row>
        <Col span={20} className="gutter-row" > 
          
          <div style={{width:"100%", display:'flex', justifyContent:'center', alignItems:'center'}}>
              {alreadyCommented == true ?

                
                <div style={{padding:16, fontSize:20, fontStyle: 'italic', width:"100%", height:"100%", display:'flex' , justifyContent:'center', alignItems:'center'}}>
                  Vous avez commenté    
                <span style={{padding:20, fontWeight:'bold', fontStyle: 'normal', color:'blue'}}>{userComment}</span>
                <Button
                  htmlType="submit"
                  onClick="{onSubmit}"
                  type="danger"
                  shape="round"
                  size="small"
                  onClick={() => commentSuppr()}
                >Supprimer le commentaire
                </Button> 
                {messageCom}
                </div>
                
              :
          <div style={{width:"100%"}}>
            {messageCom}
          <Form.Item>
            <TextArea
              rows={3}
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
          
          </div>
           }
           </div>
         

        </Col>
      </Row>
      <Row>
        <Col span={20} style={{color: "#37A4B2", fontSize: "150%", fontWeight:'bold' , margin:20}}> 
        TOUS LES COMMENTAIRES
        <Tabs defaultActiveKey="1">
          <TabPane tab="J'Adore" key="1">
          <div>
              {connected == false ?

                <p style={{padding:20, fontSize:20, fontWeight:'bold',color: "#37A4B2", fontSize: "150%", textAlign:'center', backgroundColor:"lightgray",width:"100%", height:"100%"}}>
                CONNECTEZ-VOUS POUR ACCEDER AUX COMMENTAIRES
                </p>                
              :

              <div>
                {alreadyVoted == false ?

                <p style={{padding:20, fontSize:20, fontWeight:'bold',color: "#37A4B2", fontSize: "150%", textAlign:'center', backgroundColor:"lightgray",width:"100%", height:"100%"}}>
                VOTEZ POUR ACCEDER AUX COMMENTAIRES
                </p>

                :

               <div> 
                {commentairesList.length == 0 ?
                <p style={{display:'flex', alignItems:'center'}}> Aucun commentaire publié pour le moment </p>
                
              :

              <div>
                {commentairesList.map((comment, i) => { 
                  if(comment.vote == "J'Adore") {
                    return(
              <Commentaires vote={comment.vote} commentaire={comment.commentaire} nb_likes={comment.users_like.length} nb_dislikes={comment.users_dislike.length} id={comment._id} userId={user._id} alreadyLiked={comment.users_like.includes(user._id)} alreadyDisliked={comment.users_dislike.includes(user._id) }/>)
                  }
                   })}
            </div>
            }
            </div>
              }
            </div> 
              }
            </div>
          </TabPane>
          <TabPane tab="Je suis Pour" key="2">
          <div>
              {connected == false ?

                <p style={{padding:20, fontSize:20, fontWeight:'bold',color: "#37A4B2", fontSize: "150%", textAlign:'center', backgroundColor:"lightgray",width:"100%", height:"100%"}}>
                CONNECTEZ-VOUS POUR ACCEDER AUX COMMENTAIRES
                </p>                
              :
              
              <div>
                {alreadyVoted == false ?

                <p style={{padding:20, fontSize:20, fontWeight:'bold',color: "#37A4B2", fontSize: "150%", textAlign:'center', backgroundColor:"lightgray",width:"100%", height:"100%"}}>
                VOTEZ POUR ACCEDER AUX COMMENTAIRES
                </p>

                :

               <div> 
                {commentairesList.length == 0 ?
                <p style={{display:'flex', alignItems:'center'}}> Aucun commentaire publié pour le moment </p>
                
              :

              <div>
                {commentairesList.map((comment, i) => { 
                  if(comment.vote == "Je suis Pour") {
                    return(
              <Commentaires vote={comment.vote} commentaire={comment.commentaire} nb_likes={comment.users_like.length} nb_dislikes={comment.users_dislike.length} id={comment._id} userId={user._id} alreadyLiked={comment.users_like.includes(user._id)} alreadyDisliked={comment.users_dislike.includes(user._id) }/>)
                  }
                   })}
            </div>
            }
            </div>
              }
            </div> 
              }
            </div>
          </TabPane>
          <TabPane tab="Je suis Mitigé(e)" key="3">
          <div>
              {connected == false ?

                <p style={{padding:20, fontSize:20, fontWeight:'bold',color: "#37A4B2", fontSize: "150%", textAlign:'center', backgroundColor:"lightgray",width:"100%", height:"100%"}}>
                CONNECTEZ-VOUS POUR ACCEDER AUX COMMENTAIRES
                </p>                
              :
              
              <div>
                {alreadyVoted == false ?

                <p style={{padding:20, fontSize:20, fontWeight:'bold',color: "#37A4B2", fontSize: "150%", textAlign:'center', backgroundColor:"lightgray",width:"100%", height:"100%"}}>
                VOTEZ POUR ACCEDER AUX COMMENTAIRES
                </p>

                :

               <div> 
                {commentairesList.length == 0 ?
                <p style={{display:'flex', alignItems:'center'}}> Aucun commentaire publié pour le moment </p>
                
              :

              <div>
                {commentairesList.map((comment, i) => { 
                  if(comment.vote == "Je suis Mitigé(e)") {
                    return(
              <Commentaires vote={comment.vote} commentaire={comment.commentaire} nb_likes={comment.users_like.length} nb_dislikes={comment.users_dislike.length} id={comment._id} userId={user._id} alreadyLiked={comment.users_like.includes(user._id)} alreadyDisliked={comment.users_dislike.includes(user._id) }/>)
                  }
                   })}
            </div>
            }
            </div>
              }
            </div> 
              }
            </div>
          </TabPane>
          <TabPane tab="Je suis Contre" key="4">
          <div>
              {connected == false ?

                <p style={{padding:20, fontSize:20, fontWeight:'bold',color: "#37A4B2", fontSize: "150%", textAlign:'center', backgroundColor:"lightgray",width:"100%", height:"100%"}}>
                CONNECTEZ-VOUS POUR ACCEDER AUX COMMENTAIRES
                </p>                
              :
              
              <div>
                {alreadyVoted == false ?

                <p style={{padding:20, fontSize:20, fontWeight:'bold',color: "#37A4B2", fontSize: "150%", textAlign:'center', backgroundColor:"lightgray",width:"100%", height:"100%"}}>
                VOTEZ POUR ACCEDER AUX COMMENTAIRES
                </p>

                :

               <div> 
                {commentairesList.length == 0 ?
                <p style={{display:'flex', alignItems:'center'}}> Aucun commentaire publié pour le moment </p>
                
              :

              <div>
                {commentairesList.map((comment, i) => { 
                  if(comment.vote == "Je suis Contre") {
                    return(
              <Commentaires vote={comment.vote} commentaire={comment.commentaire} nb_likes={comment.users_like.length} nb_dislikes={comment.users_dislike.length} id={comment._id} userId={user._id} alreadyLiked={comment.users_like.includes(user._id)} alreadyDisliked={comment.users_dislike.includes(user._id) }/>)
                  }
                   })}
            </div>
            }
            </div>
              }
            </div> 
              }
            </div>
          </TabPane>
          <TabPane tab="Je Déteste" key="5">
          <div>
              {connected == false ?

                <p style={{padding:20, fontSize:20, fontWeight:'bold',color: "#37A4B2", fontSize: "150%", textAlign:'center', backgroundColor:"lightgray",width:"100%", height:"100%"}}>
                CONNECTEZ-VOUS POUR ACCEDER AUX COMMENTAIRES
                </p>                
              :
              
              <div>
                {alreadyVoted == false ?

                <p style={{padding:20, fontSize:20, fontWeight:'bold',color: "#37A4B2", fontSize: "150%", textAlign:'center', backgroundColor:"lightgray",width:"100%", height:"100%"}}>
                VOTEZ POUR ACCEDER AUX COMMENTAIRES
                </p>

                :

               <div> 
                {commentairesList.length == 0 ?
                <p style={{display:'flex', alignItems:'center'}}> Aucun commentaire publié pour le moment </p>
                
              :

              <div>
                {commentairesList.map((comment, i) => { 
                  if(comment.vote == "Je Déteste") {
                    return(
              <Commentaires vote={comment.vote} commentaire={comment.commentaire} nb_likes={comment.users_like.length} nb_dislikes={comment.users_dislike.length} id={comment._id} userId={user._id} alreadyLiked={comment.users_like.includes(user._id)} alreadyDisliked={comment.users_dislike.includes(user._id) }/>)
                  }
                   })}
            </div>
            }
            </div>
              }
            </div> 
              }
            </div>
          </TabPane>
        </Tabs>
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
  },addComment: function(newComment){
        dispatch({ type: 'addComment', newComment: newComment},         
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
