import React, { useState, useEffect } from "react";
import "./nouvelPublication.css";
import {Layout, Menu, Button, Image, Empty, Cascader, Input, Space, Row, Col, Form } from "antd";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// reactstrap pour le moment utilisé pour le modal avec les images en provenance de l'APIK
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalHeader, ModalBody, ModalFooter, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';

import EnTete from "./EnTete";
import SideBarDroite from "./SideBarDroite";

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;

function NouvelPublication(props) {
  var ladate = new Date();

  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [motCle, setMotCle] = useState([]);
  const [date, setDate] = useState();
  const [theme, setTheme] = useState();
  const [redir, setRedir] = useState(false);


  // hook d'état pour gestion de l'image
  const apiKey = "23345038-9d4a0f31be7a8f5a5e2bfc293"
  const [mot_Cle, setMot_Cle] = useState("");
  const [foundPictures, setFoundPictures] = useState([])
  const [modal, setModal] = useState(false)
  const [pictureSelected, setPictureSelected] = useState("")
  const [validatePicture, setValidatePicture] = useState(false);
  const [id, setId] = useState()
  var illustration;
  var border = {border:""};
  var idP = ''

  useEffect(() => {
    var dateKnow = async () => {
      const ladateK =
        ladate.getDate() +
        "/" +
        (ladate.getMonth() + 1) +
        "/" +
        ladate.getFullYear();
      setDate(ladateK);
    };
    dateKnow();
  }, []);

  var postPublication = async () => {
    const data = await fetch("/post-publication", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `titrePublication=${titre}&contenuPublication=${contenu}&datePublication=${date}&themePublication=${theme}&motClePublication=${motCle}&token=${props.token}&image=${pictureSelected}`,
    });
    const body = await data.json();
    console.log("et dans body?", body);
    // if (body.result == true) {
    //   props.addPubliToken(body.publiToken);
      idP = body.id
      // return <Redirect to="/publication" />
      
      if (body.result == true) {
        setRedir(true)}
        setId(idP)  
  


    };


        if(id){
          console.log('id', id)
      return <Redirect to={`/publication/${id}`}/>}


/* return <Redirect to={`/publication/${id}`} />} */


  // var cherchePubli = async () => {  
  //   setRedir(true)
  // if (redir == true) {
  //   console.log("ICI APPARAISSENT LES SAINTS PROPS!!!", id);
    // const actual = await fetch (`/selectedPublication?id=${id}`)
    // const Ractual = await actual.json()
    //     setId(idP)
    //   console.log("idd", idP)
    // return <Redirect to={`/publication/${id}`} />;
  

  const options = [
    {
      value: "emploi",
      label: "emploi",
      children: [
        {
          value: "opportunité",
          label: "opportunité",
        },
        {
          value: "proposition",
          label: "proposition",
        },
        {
          value: "dernière nouvelles",
          label: "dernière nouvelles",
        },
      ],
    },
    {
      value: "Education",
      label: "Education",
      children: [
        {
          value: "école",
          label: "école",
        },
        {
          value: "Pédagogie",
          label: "Pédagogie",
        },
        {
          value: "extra-scolaire",
          label: "extra-scolaire",
        },
        {
          value: "préoccupation",
          label: "préoccupation",
        },
      ],
    },
    {
      value: "Politique",
      label: "Politique",
      children: [
        {
          value: "prêt de chez vous",
          label: "prêt de chez vous",
        },
        {
          value: "actualité",
          label: "actualité",
        },
        {
          value: "information",
          label: "information",
        },
        {
          value: "proposition",
          label: "proposition",
        },
      ],
    },
    {
      value: "Evenement",
      label: "Evenement",
      children: [
        {
          value: "fêtes",
          label: "fêtes",
        },
        {
          value: "culture",
          label: "culture",
        },
        {
          value: "rassemblement",
          label: "rassemblement",
        },
      ],
    },
    {
      value: "Environnement",
      label: "Environnement",
      children: [
        {
          value: "nature",
          label: "nature",
        },
        {
          value: "recyclage",
          label: "recyclage",
        },
        {
          value: "entraide",
          label: "entraide",
        },
        {
          value: "consommation local",
          label: "consommation local",
        },
      ],
    },
    {
      value: "Sport",
      label: "Sport",
      children: [
        {
          value: "balle",
          label: "balle",
        },
        {
          value: "ballon",
          label: "ballon",
        },
        {
          value: "bagarre",
          label: "bagarre",
        },
        {
          value: "glissade",
          label: "glissade",
        },
      ],
    },
    {
      value: "Tourisme",
      label: "Tourisme",
      children: [
        {
          value: "en france",
          label: "en france",
        },
        {
          value: "par là-bas",
          label: "par là-bas",
        },
        {
          value: "non, pas par là!",
          label: "non, pas par là!",
        },
        {
          value: "insolite",
          label: "insolite",
        },
      ],
    },
    {
      value: "Tas remarqué?",
      label: "Tas remarqué?",
      children: [
        {
          value: "ou pas?",
          label: "ou pas?",
        },
        {
          value: "hack du quotidien",
          label: "hack du quotidien",
        },
        {
          value: "fourre-tout",
          label: "fourre-tout",
        },
        {
          value: "annonce",
          label: "annonce",
        },
      ],
    },
  ];

  function onChange(value) {
    console.log("ma value", value);
    var thematique = value;
    setTheme(thematique);
  }

  const onSearch = (value) => {
    var listeMotCle = motCle;
    listeMotCle.push(value);
    console.log("la liste", listeMotCle);
    setMotCle(listeMotCle);
  };

  // affichage des images en fonction du mot clé
  var handlePictureRequest = async () => {
    var keyword = mot_Cle.replace(/\s/g, "|")
    setModal(true);
    console.log("keyword", keyword);
    var rawResponse = await fetch(`https://pixabay.com/api/?key=${apiKey}&image_type=photo&lang=fr&orientation=horizontal&safesearch=true&q=${keyword}`);
    var response = await rawResponse.json();
    console.log("log du response : ",response);
    setFoundPictures(response.hits);
    console.log("log du hits : ",response.hits[0].webformatURL)

  }

  // Validation de l'image sélectionnée
  var handlePictureClick = (img) => {
    console.log("clicked picture: ", img)
    //console.log("access style: ", listPictures[0].props.style)
    
    for (var i=0; i<listPictures.length; i++){
      if(listPictures[i].props.src == img) {
        setPictureSelected(img)
        console.log("listpicture src : ",listPictures[i].props.src)
        border = {border:'1px solid red'};
        console.log(border);
      }
    }
    
  }

  var listPictures = foundPictures.map((picture,i) => {
    return (<img key={i} src={picture.webformatURL} onClick={() => {handlePictureClick(picture.webformatURL) }} style={{border, width:"400px"}}/>)
  })

  if (pictureSelected && validatePicture ){
    var illustration = 
        
    <Card style={{width:"640px", height:"360px"}}>
      <CardImg width="100%" height="100%" src={pictureSelected} alt="Card image cap" />
      <CardBody>
        <CardTitle tag="h5"></CardTitle>
        <CardText></CardText>
      </CardBody>
      </Card>
      
  }


  return (
    <div style={{ justifyContent: "center" }}>
      <EnTete />

      <Row>
      <Col span={4}>
      <SideBarDroite />
      </Col>

      <Col span={16} align="center">
      <div style={{border: "1px solid black", width: "640px", height:"360px", display:"center"}}>
        {illustration}
      </div>
      </Col>

      </Row>

      <div className="montimer">
        <span className="timer">{date}</span>
      </div>
      <div className="maflex">
        <Cascader
          className="cascade"
          options={options}
          onChange={onChange}
          placeholder="Please select"
        />

        <Space direction="vertical">
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Ajouter un mot-clé"
            size="large"
            
            onSearch={onSearch}
          />
        </Space>
        <Form >
        <Form.Item>
          <Input placeholder="Tapez un mot-clé" onChange={(e) => setMot_Cle(e.target.value)}/>
          <Button type="primary" onClick={() => handlePictureRequest()}>Valider</Button>
        </Form.Item>
        </Form>

        <Modal isOpen={modal} toggle={modal} className="">
        <ModalHeader toggle={modal}> Choisissez une image pour le sujet "{mot_Cle}" 
        <Button color="primary" onClick={() => {setModal(!modal); setValidatePicture(true)}}>Valider la selection</Button>{' '}
          <Button color="secondary" onClick={() => {setModal(!modal); setValidatePicture(false)}} >Annuler</Button>
        </ModalHeader>
        <ModalBody style={{width:"200px"}}>
        {listPictures}
        </ModalBody>
      </Modal>

      </div>
      <Input
        className="description"
        placeholder="Votre titre"
        onChange={(e) => setTitre(e.target.value)}
      />
      <Input
        className="description"
        placeholder="Votre texte"
        onChange={(e) => setContenu(e.target.value)}
      />
      <div className="monbouton">
        <Button className="bouton" onClick={() => postPublication()}>
          Publier
        </Button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { token: state.token, publiToken: state.publiToken };
}

function mapDispatchToProps(dispatch) {
  return {
    addPubliToken: function (publiToken) {
      dispatch({ type: "addPubliToken", publiToken: publiToken });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NouvelPublication);
