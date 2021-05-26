import axios from "axios";
import React, { useState, useEffect, useCallback, Component } from 'react';
import { Container, Dropdown } from "react-bootstrap";
import Dossier from '../../assets/equipe.png'
import AuthService from "../../services/auth"
import { useHistory } from "react-router-dom"
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
    function submit(e) {
        //const date =  new Date().toLocaleString();
        //console.log(date)
        e.preventDefault();
        axios.post('groupe', {

            name: data.name,
        

        })
            .then(res => {
                console.log(res.data)
                history.push("/groupes");
                window.location.reload(false)

            })
    }
    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }


    return (
        <main>
            <div className="main__container">
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
                                <input type="text" className="form-control" placeholder=" Nom du Groupe" aria-label="First name" onChange={(e) => handle(e)} id="name" value={data.name} />
                            </div>
                           
                        </div>
                        <br></br>
                    
                        <button className="btn btn-primary btn-block">Créer</button>
                    </form>

                </Container>
            </div>
        </main>


    )
}


