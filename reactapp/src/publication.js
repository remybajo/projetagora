import React, {useState, useEffect} from 'react';
import { Radio, Layout, Menu, Button, Image } from 'antd';
import { connect } from 'react-redux'



function Publication(props) {

    const { Header, Footer, Sider, Content } = Layout;
    const [vote, setVote] = useState('');
    const [selection, setSelection] = useState('')
    const [status, setStatus] = useState(false);
    const [message, setMessage] = useState('');
    const [boutonVali, setBoutonVali] = useState('Valider le choix');
    var date;
    var token = props.token

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

 
   
    return (
      <div>
      <Layout>
      <Header className="header">header</Header>
      <Image width={50} src="reactapp/public/AGORA.png" />

      <Menu mode="horizontal" defaultSelectedKeys={["2"]}>
        <Menu.Item key="1">Accueil</Menu.Item>
        <Menu.Item key="2">Thématique</Menu.Item>
        <Menu.Item key="3">Profil</Menu.Item>
        <Button>
        </Button>
      </Menu>

      <Layout>
        <Content style={{display:"flex", flexDirection:"column", alignItems:"center"}}>

          <img src="../image/alaska.jpg" style={{width: "30%"}}/>

          <h1 style={{backgroundColor: "#37A4B2", color:"white", position:"absolute", fontSize:"200%"}}>Que penseriez-vous d'annuler la dette publique ?</h1>

          <p>
Par Marion Simon-Rainaud
Publié le 18 févr. 2021 à 7:00Mis à jour le 18 févr. 2021 à 15:44
La sortie du tunnel pandémique semble encore lointaine, et pourtant, des voix s'élèvent déjà pour penser « l'après », et notamment sur le plan économique. En ce moment, la dette publique est des sujets qui alimentent le plus les plateaux télé, les fréquences radios et les colonnes des journaux.

Car, dans l'absolu, les chiffres inquiètent. La dette française* a littéralement explosé en 2020 en franchissant largement la barre symbolique des 100 % du PIB pour s'établir à près de 120 %, contre 98 % en 2019. En quarante ans, le poids de la dette a été multiplié par six, puisqu'il s'établissait à 20 % du PIB en 1980. « La France vit au-dessus de ses moyens », « la dette est un fardeau pour les générations futures », a-t-on l'habitude d'entendre. Mais la question peut se poser en d'autres termes : la capacité d'un pays à rembourser dépend de sa capacité à se faire financer dans les années futures, c'est-à-dire la possibilité d'emprunter à nouveau. Mais, derrière le débat des chiffres, se cachent en fait plusieurs visions de la dette, et par extension de la société.

        </p>
  
        
          
  
          <Radio.Group defaultValue="a" buttonStyle="solid" style={{ margin: 16, fontWeight: 'bold' }}>
            <Radio.Button disabled={status} style={{ margin: 16, backgroundColor: "#FFC806"}} value="J'Adore" onClick={(e) => setSelection(e.target.value) }>J'Adore</Radio.Button>
            <Radio.Button disabled={status} style={{ margin: 16, backgroundColor: "#EDAC06"}} value="Je suis Pour" onClick={(e) => setSelection(e.target.value)}>Je suis Pour</Radio.Button>
            <Radio.Button disabled={status} style={{ margin: 16, backgroundColor: "#DAA419"}} value="Je suis Mitigé(e)" onClick={(e) => setSelection(e.target.value)}>Je suis Mitigé(e)</Radio.Button>
            <Radio.Button disabled={status} style={{ margin: 16, backgroundColor: "#BE833D"}} value="Je suis Contre" onClick={(e) => setSelection(e.target.value)}>Je suis Contre</Radio.Button>
            <Radio.Button disabled={status} style={{ margin: 16, backgroundColor: "#966215"}} value="Je Déteste" onClick={(e) => setSelection(e.target.value)}>Je Déteste</Radio.Button>
          </Radio.Group>

          <Button
          type="danger"
          shape="round"
          onClick={()=> voteValidation()}
        > {boutonVali}
        </Button>

        {message}
  
          </Content>
          </Layout>
      <Footer style={{ textAlign: "center" }}></Footer>
    </Layout>

          </div>
      
      
    )
  }


function mapStateToProps(state){
  return {token:state.token}
}  

export default connect(
  mapStateToProps,
  null
 
)(Publication)
  