import React, { useState, useEffect } from 'react';
import './App.css';
import { Input, Button, Modal, InputNumber, Form, Radio, Select, Cascader } from 'antd';
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
const { Option } = Select;
//import { CookiesProvider } from "react-cookie";
//import Cookies from 'js-cookie';

function Profilcomp(props) {


    const [gender, setGender] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [csp, setCsp] = useState('')
    const [civilState, setCivilState] = useState('')
    const [numberOfcChild, setNumberOfcChild] = useState('')
    const [validation, setValidation] = useState('')
    //Cookies.set('token', props.token)




    var handleSubmitComp = async () => {

        const data = await fetch('/addProfil', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `genderFromFront=${gender}&dateOfBirth=${dateOfBirth}&csp=${csp}&civilState=${civilState}
            &child=${numberOfcChild}&token=${props.token}`

        })

        const body = await data.json()
        if (body.result == true) {
            setValidation(true)
        }
        console.log(body)
    }


    if (validation == true) {
        return (<Redirect to='/pageprofil' />)
    }

    //selection du genre //
    const Genre = [
        {
            value: "homme",
            label: "homme",
        },
        {
            value: "femme",
            label: "femme",
        }, {
            value: "autres",
            label: "autres",
        }]

    function onChange(value) {
        var Genre = value;
        setGender(Genre);
    }
    // selection CSP
    const categorie = [
        {
            value: "salarié",
            label: "salarié",
        },
        {
            value: "cadre",
            label: "cadre",
        }, {
            value: "sans emploi",
            label: "sans emploi",
        }, {
            value: "Personne au foyer",
            label: "Personne au foyer",
        },
        {
            value: "profession libérale",
            label: "profession libérale",
        }, {
            value: "Chef d'entreprise",
            label: "Chef d'entreprise",
        }]

    function onCategorie(value) {
        var categorie = value;
        setCsp(categorie);
    }

    // civil
    const Statut = [
        {
            value: "marié",
            label: "marié",
        },
        {
            value: "célibataire",
            label: "célibataire",
        }, {
            value: "en couple",
            label: "en couple",
        }, {
            value: "pacsé",
            label: "pacsé",
        }]

    function onStatut(value) {
        var Statut = value;
        setCivilState(Statut);
    }

    return (


        <div className="info" >


            <div className="Sign" style={{display:'flex', justifyContent:"center", alignItems:"center"}}>
                <h3 style={{ color: "white", display:'flex', justifyContent:"center" }}> Compléter mon profil </h3>



                <h4 style={{ color: "red", display:'flex', justifyContent:"center" }}>Genre </h4>
                <Cascader style={{ display:'flex', justifyContent:"center", alignItems:"center" }}
                    className="cascade"
                    options={Genre}
                    onChange={onChange}
                    placeholder="Genre"
                />


                <Form.Item name="input-number" noStyle>
                    <InputNumber min={1930} max={2010} onSelect={(e) => setDateOfBirth(e.target.value)} className="Login-input" placeholder="DateOfBirth" />
                </Form.Item>

                <Cascader
                    className="cascade"
                    options={categorie}
                    onChange={onCategorie}
                    placeholder="Please select"
                />




                <Cascader
                    className="cascade"
                    options={Statut}
                    onChange={onStatut}
                    placeholder="Please select"
                />

       
                <Form.Item name="input-number" noStyle>
                    <InputNumber min={0} max={10} onSelect={(e) => setNumberOfcChild(e.target.value)} className="Login-input" placeholder="number of child" />
                </Form.Item>




                <Button onClick={() => handleSubmitComp()}  >Valider les informations </Button>
                
            </div>


        </div>

    );
}

function mapStateToProps(state) {
    return { token: state.token }
}

function mapDispatchToProps(dispatch) {
    return {
        addToken: function (token) {
            dispatch({ type: 'addToken', token: token })
        }
    }
}



export default connect(
    mapStateToProps,
    mapDispatchToProps

)(Profilcomp)