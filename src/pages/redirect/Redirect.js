
import hello from "../../assets/avatar.png";

import React, { useState, useEffect, useCallback, Component } from 'react';
import axios from "axios";
import AuthService from "../../services/auth"
import test from "../test";

import { Container } from "react-bootstrap";



export default class Redirect  extends Component{
  

    

 render(){
  const ts= localStorage.getItem('password');
  console.log(ts)
    return (
        <main>
          <div className="main__container">
            {/* <!-- MAIN TITLE STARTS HERE --> */}
      
            <div className="main__title">
              <img src={hello} alt="hello" />
              <div className="main__greeting">
              {localStorage.getItem('password') == "Invalid email id."  ?
         
               (<p>Mail incorrect mail</p>) 
               :
               (<p>Veuiller verifier votre mail </p>) }
              </div>
       
            </div>
      
      
      
      
          </div>
        </main>
      
      
        );
 }
   
      
 
};