import React, { useState, useEffect } from 'react';
import './nouvelPublication.css'
import { Layout, Menu, Button, Image, Empty, Cascader, Input, Space} from 'antd';
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


const { Header, Footer, Sider, Content } = Layout;
const {Search} = Input;


function NouvelPublication(props) {
  var ladate = new Date()

  const[titre, setTitre] = useState('');
  const[contenu, setContenu] = useState('');
  const[motCle, setMotCle] = useState([]);
  const[date, setDate] = useState();
  const[theme, setTheme] = useState();
  const[redir, setRedir] = useState(false);

  




useEffect(() => {

    var dateKnow = async() => {
      const ladateK = (ladate.getDate()+"/"+(ladate.getMonth()+1)+"/"+ladate.getFullYear())
      setDate(ladateK)
      }
dateKnow() 
}, [])





  var postPublication = async () => {

    const data = await fetch('/post-publication', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `titrePublication=${titre}&contenuPublication=${contenu}&datePublication=${date}&themePublication=${theme}&motClePublication=${motCle}&token=${props.token}`
    })
    const body = await data.json()
    console.log("et dans body?", body)
    if (body.result == true) {
      props.addPubliToken(body.publiToken)
      setRedir(true)
    }


  }


  if (redir == true) {
      

    console.log('ICI APPARAISSENT LES SAINTS PROPS!!!', props)
    return <Redirect to='/publication' />
  } 



    const options = [
        {
          value: 'emploi',
          label: 'emploi',
          children: [
            {
              value: 'opportunité',
              label: 'opportunité',
            },
            {
              value: 'proposition',
              label: 'proposition',
            },
            {
              value: 'dernière nouvelles',
              label: 'dernière nouvelles',
            },
          ],
        },
        {
          value: 'Education',
          label: 'Education',
          children: [
            {
              value: 'école',
              label: 'école',
            },
            {
              value: 'Pédagogie',
              label: 'Pédagogie',
            },
            {
              value: 'extra-scolaire',
              label: 'extra-scolaire',
            },
            {
              value: 'préoccupation',
              label: 'préoccupation',
            },
          ],
        },
        {
          value: 'Politique',
          label: 'Politique',
          children: [
            {
              value: 'prêt de chez vous',
              label: 'prêt de chez vous',
            },
            {
              value: 'actualité',
              label: 'actualité',
            },
            {
              value: 'information',
              label: 'information',
            },
            {
              value: 'proposition',
              label: 'proposition',
            },
          ],
        },
        {
          value: 'Evenement',
          label: 'Evenement',
          children: [
            {
              value: 'fêtes',
              label: 'fêtes',
            },
            {
              value: 'culture',
              label: 'culture',
            },
            {
              value: 'rassemblement',
              label: 'rassemblement',
            },
          ],
        },
        {
          value: 'Environnement',
          label: 'Environnement',
          children: [
            {
              value: 'nature',
              label: 'nature',
            },
            {
              value: 'recyclage',
              label: 'recyclage',
            },
            {
              value: 'entraide',
              label: 'entraide',
            },
            {
              value: 'consommation local',
              label: 'consommation local',
            },
          ],
        },
        {
          value: 'Sport',
          label: 'Sport',
          children: [
            {
              value: 'balle',
              label: 'balle',
            },
            {
              value: 'ballon',
              label: 'ballon',
            },
            {
              value: 'bagarre',
              label: 'bagarre',
            },
            {
              value: 'glissade',
              label: 'glissade',
            },
          ],
        },
        {
          value: 'Tourisme',
          label: 'Tourisme',
          children: [
            {
              value: 'en france',
              label: 'en france',
            },
            {
              value: 'par là-bas',
              label: 'par là-bas',
            },
            {
              value: 'non, pas par là!',
              label: 'non, pas par là!',
            },
            {
              value: 'insolite',
              label: 'insolite',
            },
          ],
        },
        {
          value: 'Tas remarqué?',
          label: 'Tas remarqué?',
          children: [
            {
              value: 'ou pas?',
              label: 'ou pas?',
            },
            {
              value: 'hack du quotidien',
              label: 'hack du quotidien',
            },
            {
              value: 'fourre-tout',
              label: 'fourre-tout',
            },
            {
              value: 'annonce',
              label: 'annonce',
            },
          ],
        },
      ];
      
      function onChange(value) {
        console.log('ma value',value);
        var thematique = value
        setTheme(thematique)
      }


      const onSearch = value => {
        
        var listeMotCle = motCle
        listeMotCle.push(value)
        console.log('la liste',listeMotCle)
        setMotCle(listeMotCle)
      };
   
    return (
        <div style={{justifyContent: "center"}}>

            <Layout>
                <Header className="header">header</Header>
                <Image width={50} src="./image/AGORA.png" />
            </Layout>


            <Empty className="imageVide"></Empty>
            <div className="montimer">
            <span className="timer">{date}</span>
            </div>
            <div className="maflex">
            <Cascader className="cascade" options={options} onChange={onChange} placeholder="Please select" />

            <Space direction="vertical">
              <Search
                placeholder="input search text"
                allowClear
                enterButton="Ajouter un mot-clé"
                size="large"
                onSearch={onSearch}
              />
            </Space>


            </div>
            <Input className="description" placeholder="Votre titre" onChange={(e) => setTitre(e.target.value)} />
            <Input className="description" placeholder="Votre texte" onChange={(e) => setContenu(e.target.value)}/>
            <div className="monbouton">
            <Button className="bouton" onClick={() => postPublication()} >publier</Button>
            </div>

        </div>
      
      
    )
  }

  function mapStateToProps(state){
    return {token:state.token, publiToken:state.publiToken}
  }

  function mapDispatchToProps(dispatch) {
    return {
      addPubliToken: function (publiToken) {
        dispatch({ type: 'addPubliToken', publiToken: publiToken})
      }
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
   
)(NouvelPublication)