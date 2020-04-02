import React, { Component } from 'react';
import '../styles/animations.scss'
import logo from '../icons/logo.svg'

function NotFound(props) {

        return (

            <div style={{width: '100vw' , height:'100vh' , display:'flex' , flexDirection:'column' , justifyContent:'center' , alignItems:'center'}}>

             <div style={{width:'30vw' , height:'fit-content'}}>
                 <img src={logo} width='100%' />
             </div>

             <div style={{color: '#0A2D63' , fontSize:'3vw' , paddingTop:'5vh'}}>העמוד שחיפשת לא קיים</div>
            <div
            onClick={()=>{
                props.history.replace('/')
            }}
            className='grow' style={{color: 'white', cursor:'pointer' , marginTop:'2vh' , backgroundColor: '#0A2D63' , borderRadius:'100px' , padding: '0.2vh 2vw'}}>חזור לדף הבית</div>
            </div>

        );
    }


export default NotFound;