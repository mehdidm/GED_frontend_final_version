import "./home.css";
import hello from "../../assets/avatar.png";

import React, { useState, useEffect, useCallback, Component } from 'react';
import axios from "axios";
import AuthService from "../../services/auth"
import Username from "../../services/UserName"






export default function Home() {
  const config ={
    headers:{
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
const Role =localStorage.getItem('Role')
const id =localStorage.getItem('id')



  return (
  <main>
    <div className="main__container">
      {/* <!-- MAIN TITLE STARTS HERE --> */}

      <div className="main__title">
        <img src={hello} alt="hello" />
        <div className="main__greeting">
          <h1> <Username Nom={id}></Username></h1>
          <p style={{fontSize:"12px"}}>{Role}</p>
          
        </div>
      </div>




    </div>
  </main>


  );

};