import React, {useState, useEffect} from 'react';
import { Radio, Layout, Menu, Button, Image, Breadcrumb, Card, Avatar, Divider, Row, Col, Tabs, List, Space, Comment, Form, Input  } from 'antd';
import { connect } from 'react-redux'

import { SettingOutlined, EditOutlined, EllipsisOutlined, DownloadOutlined, TwitterOutlined, FacebookOutlined, LinkedinOutlined, UserOutlined,
  MessageOutlined, LikeOutlined, StarOutlined} from "@ant-design/icons";

function Publication(props) {

    const { Header, Footer, Sider, Content } = Layout;
    const [vote, setVote] = useState('');
    const [selection, setSelection] = useState('')
    const [status, setStatus] = useState(false);
    const [message, setMessage] = useState('');
    const [messageCom, setMessageCom] = useState('');
    const [boutonVali, setBoutonVali] = useState('Valider le choix');
    const [comment, setComment] = useState('');
    var date;
    var dateComment;
    var token = props.token
    const { TextArea } = Input;

    var dateFormat = function(date){
      var newDate = new Date(date);
      var format = newDate.getDate()+'/'+(newDate.getMonth()+1)+'/'+newDate.getFullYear();
      return format;
    }


    useEffect(() => {
      setVote(selection);
      setMessage("");
    },[selection])

    var sendVote = async() => {
      await fetch('/votes/sendVote', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `vote=${vote}&publication=""&date=${date}&token=""`
    })
    }

    var voteValidation = () => {
      if (!vote) {
        setMessage("Veuillez choisir une option de vote avant de valider.")
      } else if (!status && boutonVali != "Annuler le vote") {
        setStatus(true);
        setMessage("Votre vote a bien été pris en compte. Merci pour votre participation.")
        setBoutonVali("Annuler le vote")
        date = dateFormat(Date.now());
        console.log("date: ",date);
        sendVote();
      } 
      if (boutonVali == "Annuler le vote") {
        setStatus(false);
        setBoutonVali("Valider le choix");
        setMessage("");
    }

    console.log(vote);
  }

  const data = [
    { auteur: 'Ant Design Title 1', commentaire: 'blablabla'},
    { auteur: 'Ant Design Title 2', commentaire: 'blablabla'},
  ]

  var sendComment = async() => {
    await fetch('/comments/sendComment', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `commentaire=${comment}&publication=""&date=${dateComment}&token=""`
  })
  }

  var commentValidation = () => {
    console.log("commentaire: ", comment)
    if (!comment) {
      setMessageCom("Veuillez choisir une option de vote avant de valider.")
    } else {
      dateComment = dateFormat(Date.now());
      console.log("date commentaire: ",dateComment);
      sendComment();
      setMessageCom("Votre commentaire a bien été envoyé.")
    }
  }

   
    return (
      
      <Layout style={{margin:10}}>

      <Row style={{height:'5%', backgroundColor:'#37A4B2', margin:10}}>
        <Col span={4}>
          <Image className="logo" width={150} src="./image/AGORA.png" />
        </Col>
      

        <Col span={6}>
          <Button
            icon={<UserOutlined />}
            size={100}
            style={{ Color: "#214C74", borderColor: "#214C74" }}
          >
            Log in
          </Button>
          <Divider type="vertical" />
          <Button
            type="primary"
            size={100}
            style={{ backgroundColor: "#214C74", borderColor: "#214C74" }}
          >
            Log out
          </Button>
        </Col>
        <Col span={6} className="social-icons">
          {" "}
          <TwitterOutlined
            style={{ fontSize: "20px", color: "#214C74" }}
            key="twitter"
          />
          <Divider type="vertical" />
          <FacebookOutlined
            style={{ fontSize: "20px", color: "#214C74" }}
            key="facebook"
          />
          <Divider type="vertical" />
          <LinkedinOutlined
            style={{ fontSize: "20px", color: "#214C74" }}
            key="linkedin"
          />
        </Col>
      </Row>

      
      <Row className="site-layout-background" justify="center" align="top" style={{margin:10}}>
      
      <div style={{display:'flex'}}>
        
      <Col span={4}  >
          <Menu mode="vertical" defaultSelectedKeys={["2"]} style={{margin:10}}>
            <Menu.Item key="1">Accueil</Menu.Item>
            <Menu.Item key="2">Thématique</Menu.Item>
            <Menu.Item  key="3">  Profil </Menu.Item>
          </Menu>
        </Col>

        <Col span={10} style={{display:"flex", flexDirection:'column', alignItems:"center", justifyContent:'center', margin:10}} >

          <h1 style={{color: "#37A4B2", fontSize:"200%" }}>Que penseriez-vous d'annuler la dette publique ?</h1>

          <img src="../image/alaska.jpg" style={{width: "30%", position:"relative"}}/>

          <p>
Par Marion Simon-Rainaud
Publié le 18 févr. 2021 à 7:00Mis à jour le 18 févr. 2021 à 15:44
La sortie du tunnel pandémique semble encore lointaine, et pourtant, des voix s'élèvent déjà pour penser « l'après », et notamment sur le plan économique. En ce moment, la dette publique est des sujets qui alimentent le plus les plateaux télé, les fréquences radios et les colonnes des journaux.

Car, dans l'absolu, les chiffres inquiètent. La dette française* a littéralement explosé en 2020 en franchissant largement la barre symbolique des 100 % du PIB pour s'établir à près de 120 %, contre 98 % en 2019. En quarante ans, le poids de la dette a été multiplié par six, puisqu'il s'établissait à 20 % du PIB en 1980. « La France vit au-dessus de ses moyens », « la dette est un fardeau pour les générations futures », a-t-on l'habitude d'entendre. Mais la question peut se poser en d'autres termes : la capacité d'un pays à rembourser dépend de sa capacité à se faire financer dans les années futures, c'est-à-dire la possibilité d'emprunter à nouveau. Mais, derrière le débat des chiffres, se cachent en fait plusieurs visions de la dette, et par extension de la société.

        </p>
        </Col>
        <Col span={10} style={{display:'flex', flexDirection:'column', backgroundColor:'beige'}}>
          <h1>Top Commentaires</h1>

        <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={item => (
                    <List.Item style={{borderdColor: "#FFC806"}}>
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
        
        <Col span={14} style={{display:'flex', alignItems:'center', backgroundColor:'lightBlue'}}>
        <h1>VOTEZ</h1>
          

          <Radio.Group defaultValue="a" buttonStyle="solid" style={{ margin: 16, fontWeight: 'bold', display:'flex' }}>
            <Radio.Button disabled={status} style={{ margin: 16, backgroundColor: "#FFC806"}} value="J'Adore" onClick={(e) => setSelection(e.target.value) }>J'Adore</Radio.Button>
          </Radio.Group>
          <Radio.Group defaultValue="a" buttonStyle="solid" style={{ margin: 16, fontWeight: 'bold', display:'block' }}>
            <Radio.Button disabled={status} style={{ margin: 16, backgroundColor: "#EDAC06"}} value="Je suis Pour" onClick={(e) => setSelection(e.target.value)}>Je suis Pour</Radio.Button>
            </Radio.Group>
          <Radio.Group defaultValue="a" buttonStyle="solid" style={{ margin: 16, fontWeight: 'bold', display:'block' }}>  
            <Radio.Button disabled={status} style={{ margin: 16, backgroundColor: "#DAA419"}} value="Je suis Mitigé(e)" onClick={(e) => setSelection(e.target.value)}>Je suis Mitigé(e)</Radio.Button>
            </Radio.Group>
          <Radio.Group defaultValue="a" buttonStyle="solid" style={{ margin: 16, fontWeight: 'bold', display:'block' }}>  
            <Radio.Button disabled={status} style={{ margin: 16, backgroundColor: "#BE833D"}} value="Je suis Contre" onClick={(e) => setSelection(e.target.value)}>Je suis Contre</Radio.Button>
            </Radio.Group>
          <Radio.Group defaultValue="a" buttonStyle="solid" style={{ margin: 16, fontWeight: 'bold', display:'block' }}> 
            <Radio.Button disabled={status} style={{ margin: 16, backgroundColor: "#966215"}} value="Je Déteste" onClick={(e) => setSelection(e.target.value)}>Je Déteste</Radio.Button>
          </Radio.Group>

          <Button
          type="danger"
          shape="round"
          onClick={()=> voteValidation()}
        > {boutonVali}
        </Button>

        {message}
  
        </Col>
      
  
        </Row>

        <Row>
        <Col span={24}>
          AJOUTEZ UN COMMENTAIRE POUR ETAYER VOTRE VOTE (facultatif)
        <Form.Item>
          <TextArea rows={5} onChange={(e) => setComment(e.target.value)} placeholder="Tapez votre commentaire" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" onClick="{onSubmit}" type="primary" onClick={()=> commentValidation()}>
            Envoyer le commentaire
          </Button>
      </Form.Item>
      {messageCom}
      </Col>
      
      </Row>
          
      <Footer style={{ textAlign: "center" }}></Footer>
    </Layout>
      
      
    )
  }


function mapStateToProps(state){
  return {token:state.token}
}  

export default connect(
  mapStateToProps,
  null
 
)(Publication)
  