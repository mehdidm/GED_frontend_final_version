import "./home.css";
import hello from "../../assets/avatar.png";

import React, { useState, useEffect, useCallback, Component } from 'react';
import axios from "axios";
import AuthService from "../../services/auth"
import test from "../test";





export default function Home() {
  const config ={
    headers:{
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  const [UserName, setUsername] = useState("");

  useEffect(() => {
    const getCurrentUse = () => {
      const id = AuthService.getCurrentUser();

      axios.get('user/' + id,config).then(
        res => {
          console.log(res.data.firstName);
          setUsername(res.data.firstName)
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
          <h1>Hello {UserName}</h1>
          <p>Welcome to e-doc</p>
        </div>
      </div>




    </div>
  </main>


  );

};