
import hello from "../../assets/avatar.png";

import React, { useState, useEffect, Link, Component } from 'react';
import axios from "axios";
import AuthService from "../../services/auth"
import test from "../test";





export default function Profil() {

  const [UserName, setUsername] = useState([]);
  const config ={
    headers:{
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  useEffect(() => {
    const getCurrentUse = () => {
      const id = AuthService.getCurrentUser();

      axios.get('user/' + id,config).then(
        res => {
          console.log(res);
          setUsername(res.data)
        },
        err => {
          console.log(err)
        }
      )
    }
    getCurrentUse()
  }, [])





  return (<main>
    <div className="main__container">
      {/* <!-- MAIN TITLE STARTS HERE --> */}

      <div className="main__title">
        <img src={hello} alt="hello" />
        <div className="main__greeting">
          <h1> <b>email:</b>{UserName.email}</h1>
          <h1> <b>Role:</b>{UserName.appUserRole}</h1>
          <h1> <b>firstName:</b>{UserName.firstName}</h1>
          <h1><b>lastName:</b> {UserName.lastName}</h1>
          <h1> <b>numtel:</b>{UserName.numtel}</h1>
          <h1> <b>groupe:</b>{UserName.groupe}</h1>
          
          <a href="/update">About</a>
          
        </div>
      </div>




    </div>
  </main>


  );

};