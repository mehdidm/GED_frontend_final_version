import axios from "axios";
import React, { useState, useEffect, useCallback, Component } from 'react';
import { Container, Dropdown } from "react-bootstrap";
import ING from '../../assets/avatar1.png';
import { useHistory, useLocation, Link } from "react-router-dom";
import 'react-notifications/lib/notifications.css';
import Card from "react-bootstrap/Card";
import { NotificationManager } from 'react-notifications';
export default function AddUser() {
    const history = useHistory();
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        numtel: Number(""),
        password: "",
        appUserRole: ""
    })
    const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
    function submit(e) {
        
        e.preventDefault();
        axios.post('ajoutUser', {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            numtel: Number(data.numtel),
            password: data.password,
            appUserRole: data.appUserRole

        },config)
            .then(res => {
                console.log(res.data)
                history.push("/Administration");
                NotificationManager.success( "Version ajouter avec succés" ,"Succés",2000 );
                

            })
            .catch(er => {
                console.log(er);
                NotificationManager.error("Email déja utiliser ou données incorrect", 'Error!');
            });
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
        <img src={ING} alt="hello" />
        <div className="main__greeting">
        </div>
      </div>
            <Container >
            <form onSubmit={(e) => submit(e)}>
                <h1>Ajouter Utilisateur</h1>
                <br></br>

                <div className="row">
                    <div className="col">
                        <label>Prénom</label>
                        <input type="text" className="form-control" placeholder=" First Name" aria-label="First name" onChange={(e) => handle(e)} id="firstName" value={data.firstName} />
                    </div>
                    <div className="col">
                        <label>Nom</label>
                        <input type="text" className="form-control" placeholder="Last Name" aria-label="Last name" onChange={(e) => handle(e)} id="lastName" value={data.lastName} />
                    </div>
                </div>
                <br></br>
                <div className="row">
                    <div className="col">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Email" aria-label="Email" onChange={(e) => handle(e)} id="email" value={data.email} />
                    </div>
                    <div className="col">
                        <label>Tel</label>
                        <input type="number" className="form-control" placeholder="Tel° " aria-label="Tel" onChange={(e) => handle(e)} id="numtel" value={data.numtel} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label>Mot de passe</label>
                        <input type="password" className="form-control" placeholder="password" aria-label="password" onChange={(e) => handle(e)} id="password" value={data.password} />
                    </div>
                    <div className="col">


                        <label>Role</label>

                        <select required className="form-control" onChange={(e) => handle(e)} id="appUserRole" value={data.appUserRole}>
                            <option >Choisir Role</option>
                            <option value="SUPERVISEUR" >SUPERVISEUR</option>
                            <option value="CONTROLEUR"> CONTROLEUR</option>
                            <option   value="ADMINISTRATEUR">ADMINISTRATEUR</option>
                            <option value="INGENIEUR">INGENIEUR</option>
                        </select>

                    </div>
                </div>

                <br></br>
                <button className="btn btn-info btn-block">Ajouter</button>
            </form>

        </Container>
        <div className="go-left" >
                <div className="go-ar">
                <i className="fas fa-user-plus fa-sm"></i>
             </div>
              </div>
        </Card>
        </div>
        

    )
}


