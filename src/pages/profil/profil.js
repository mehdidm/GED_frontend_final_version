
import hello from "../../assets/avatar.png";

import React, { useState, useEffect, Link, Component } from 'react';
import axios from "axios";
import link from 'react-router-dom';
import AuthService from "../../services/auth"
import test from "../test";
import   "./profil.css";





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





  return (
  <main className="main1">
    
    <div className="main__container">
      {/* <!-- MAIN TITLE STARTS HERE --> */}

      <div class="container">
    <div class="main-body">
    
  
    <button class="btn btn-primary" style={{float:"right"}}><i class="fa fa-edit" ></i> <a href="/update" className="a1">Modifier Profil</a></button>
    
          <div class="row gutters-sm">
            <div class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center">
                    <img src={hello} alt="Admin" class="rounded-circle" width="260"/>
                    <div class="mt-3">
                      <h4>{UserName.firstName} {UserName.lastName} </h4>
                      <p class="text-secondary mb-1">                   {UserName.appUserRole}</p>
                      <p class="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                   
                    </div>
                  </div>
                </div>
              </div>
          </div>
            <div class="col-md-8">
              <div class="card mb-3">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Nom & Prénom</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                    {UserName.firstName} {UserName.lastName} 
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Email</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                    {UserName.email}
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Téléphone</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                    {UserName.numtel}
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Groupe</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                    
                    {UserName.groupe ?UserName.groupe:<p>Pas de groupe disponible</p>}
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Rôle</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                    {UserName.appUserRole}
                    </div>
                  </div>
                </div>
              </div>
          </div>
          </div>
        </div>
    </div>




    </div>

  </main>


  );

};