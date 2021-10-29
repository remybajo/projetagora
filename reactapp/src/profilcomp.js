import React, { useState, useEffect } from 'react';
import './App.css';
import { Input, Button, Modal, InputNumber, Form } from 'antd';
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
//import { CookiesProvider } from "react-cookie";
//import Cookies from 'js-cookie';

function Profilcomp(props) {

    const [signUpUsername, setSignUpUsername] = useState('')
    const [signUpEmail, setSignUpEmail] = useState('')
    const [signUpPassword, setSignUpPassword] = useState('')
    const [signInEmail, setSignInEmail] = useState('')
    const [signInPassword, setSignInPassword] = useState('')
    const [userExists, setUserExists] = useState(false)
    const [listErrorsSignin, setErrorsSignin] = useState([])
    const [listErrorsSignup, setErrorsSignup] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);


    const [gender, setGender] = useState('')
    const [dateOfBirth, setDateOfBirth]=useState('')
    const [csp, setCsp] = useState('')
    const [civilState, setCivilState] = useState('')
    const [numberOfcChild , setNumberOfcChild ] = useState('')
    const [validation , setValidation ] = useState('')
    //Cookies.set('token', props.token)


        

    var handleSubmitComp = async () => {

        const data = await fetch('/addProfil', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `genderFromFront=${gender}&dateOfBirth=${dateOfBirth}&csp=${csp}&civilState=${civilState}
            &child=${numberOfcChild}&token=${props.token}`
           
        })
       
        const body = await data.json()
        if (body.result == true){
            setValidation(true)}
        console.log(body)}

   
            if(validation==true){
        return (<Redirect to='/' />)}
    

 
   




  

  

    return (
        
  
        <div className="info" >

           
                <div className="Sign">
                    <h3 style={{ color: "white" }}> Je suis déjà inscrit </h3>

                    <Input onChange={(e) => setGender(e.target.value)} className="Login-input" placeholder="gender" />
                    <Form.Item name="input-number" noStyle>
               
         
                    <InputNumber min={0} max={10} onChange={(e) => setDateOfBirth(e.target.value)} className="Login-input" placeholder="DateOfBirth" />
                    </Form.Item>
                    <Input onChange={(e) => setCsp(e.target.value)} className="Login-input" placeholder="Csp" />
                    <Input onChange={(e) => setCivilState(e.target.value)} className="Login-input" placeholder="civil state" />
                    <InputNumber onChange={(e) => setNumberOfcChild (e.target.value)} className="Login-input" placeholder="number of child" />
                    <Input onChange={(e) => setValidation(e.target.value)} className="Login-input" placeholder="Validation" />

                    

                    <Button onClick={() => handleSubmitComp()} type="primary" style={{ width: '80px' }}>Sign-in</Button>
                    <Button > <Link to="/nouvelPublication">   publication  </Link></Button>
                </div>
            
       
        </div>
    
    );
}

function mapStateToProps(state){
    return {token:state.token}
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