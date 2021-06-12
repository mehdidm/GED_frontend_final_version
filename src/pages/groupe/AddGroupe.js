import axios from "axios";
import React, { useState, useEffect, useCallback, Component } from 'react';
import { Container, Dropdown } from "react-bootstrap";
import Dossier from '../../assets/equipe.png'
import AuthService from "../../services/auth"
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router-dom"
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';
export default function AddGroupe() {
    const history = useHistory();
  
    const config = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }
    const [User, setUser] = useState([]);
    const id = AuthService.getCurrentUser();
    //console.log(User)
    useEffect(() => {
        const getCurrentUse = () => {


            axios.get('user/' + id, config).then(
                res => {
                    //console.log(res);
                    setUser(res.data)
                },
                err => {
                    console.log(err)
                }
            )
        }
        getCurrentUse()
    }, [])


    const [data, setData] = useState({
        name: "",
    

    })
    function submit(e,) {
        
        //const date =  new Date().toLocaleString();
        //console.log(date)
        e.preventDefault();
        axios.post('groupe', {

            name: data.name,
            controleur:id,
        

        },config)
            .then(res => {
                console.log(res.data)
                NotificationManager.success( "Groupe ajouter avec succés" ,"succés",2000 );
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
                        <h1>Créer Groupe</h1>
                        <br></br>

                        <div className="row">
                            <div className="col">
                                <label>Nom du Groupe</label>
                                <input type="text" required className="form-control" placeholder=" Nom du Groupe" aria-label="First name" onChange={(e) => handle(e)} id="name" value={data.name} />
                            </div>
                         
                           
                        </div>
                        <br></br>
                    
                        <button className="btn btn-info btn-block">Créer</button>
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


