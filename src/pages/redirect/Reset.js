
import axios from "axios";
import React, { useState, useEffect, useCallback, Component } from 'react';
import { Container, Dropdown } from "react-bootstrap";
import Dossier from '../../assets/equipe.png'
import AuthService from "../../services/auth"
import Card from "react-bootstrap/Card";
import { useHistory, useLocation, Link } from "react-router-dom";
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';
export default function Reset() {
  const history = useHistory();
  
  const config = {
      headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
      }
  }
  

 

  const [data, setData] = useState({
      password: "",
  

  })
  const  token =useLocation().search;
  //console.log (token)
  function submit(e) {
    
      e.preventDefault();
      axios.put('reset-password'+token, {

          password: data.password,
      

      })
          .then(res => {
              console.log(res.data)
              NotificationManager.success( "Mot de passe modifier" ,"succés",2000 );
              history.push("/login");
          

          })
          .catch(err => {
              NotificationManager.error("Verifier vos données", 'Error!');
  
             
          })
  }
  function handle(e) {
      const newdata = { ...data }
      newdata[e.target.id] = e.target.value
      setData(newdata)
      console.log(newdata)
  }

  return (
    <div className="groupCard">
        <Card>
            <div className="main__title">
                <img src={Dossier} alt="hello" style={{ width: "10" }} />
                <div className="main__greeting">
                </div>
            </div>
            <Container >
                <form onSubmit={(e) => submit(e)}>
                    <h1>Changer mot de passe</h1>
                    <br></br>

                    <div className="row">
                        <div className="col">
                            <label>Mot de passe</label>
                            <input type="password" required className="form-control" placeholder=" saisie mot de passe" aria-label="password" onChange={(e) => handle(e)} id="password" value={data.password} />
                        </div>
                       
                    </div>
                    <br></br>
                
                    <button className="btn btn-info btn-block">Modifier</button>
                </form>

            </Container>
            <div className="go-left" >
            <div className="go-ar">
            <i className="fas fa-folder-plus fa-lg"></i>
         </div>
          </div>
        </Card>
        
    </div>


)
  }