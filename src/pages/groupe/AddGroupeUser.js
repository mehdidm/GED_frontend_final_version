import axios from "axios";
import React, { useState, useEffect, useCallback, Component } from 'react';
import { Container, Dropdown } from "react-bootstrap";
import Dossier from '../../assets/equipe.png'
import AuthService from "../../services/auth"
import Card from "react-bootstrap/Card";
import { useHistory , useLocation } from "react-router-dom"
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';

export default function AddGroupeUser() {
    const history = useHistory();
  const location = useLocation();
  const id = location.state.id_groupe;
  
    const config = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }



    const [data, setData] = useState({
        id: "",
    

    })
    console.log(data)
    function submit(e,) {
        
        //const date =  new Date().toLocaleString();
        //console.log(date)
        e.preventDefault();
        axios.post('groupe/user/'+id, {

            id: data.id,
           
        

        },config)
            .then(res => {
                console.log(res.data)
                NotificationManager.success( "Utilisateur ajouter avec succés" ,"succés",2000 );
                history.push("/groupes");
            

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
                        <h1>Ajouter un employé au  Groupe</h1>
                        <br></br>

                        <div className="row">
                            <div className="col">
                                <label>Id de l'utilisateur</label>
                                <input type="text" required className="form-control" placeholder="ID" aria-label="ID" onChange={(e) => handle(e)} id="id" value={data.id} />
                            </div>
                         
                           
                        </div>
                        <br></br>
                    
                        <button className="btn btn-info btn-block">Ajouter</button>
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


