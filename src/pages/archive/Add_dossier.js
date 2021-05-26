import axios from "axios";
import React, { useState, useEffect, useCallback, Component } from 'react';
import { Container, Dropdown } from "react-bootstrap";
import Dossier from '../../assets/dossier.png'
import AuthService from "../../services/auth"
import { useHistory } from "react-router-dom"
export default function AddDossier() {
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
        cin: "",
        date: "",
        matricule: "",
        motdeCle: "",
        nbrePieces: "",
        nomPersonnel: "",
        numDoss: "",
        serie: "",
        theme_titre: Number(""),
        privilege: "",

    })
    function submit(e) {
        //const date =  new Date().toLocaleString();
        //console.log(date)
        e.preventDefault();
        axios.post('archive', {

            cin: data.cin,
            date: "",
            matricule: data.matricule,
            motdeCle: data.motdeCle,
            nbrePieces: data.nbrePieces,
            nomPersonnel: User.firstName + User.lastName,
            numDoss: data.numDoss,
            serie: data.serie,
            theme_titre: data.theme_titre,
            privilege: data.privilege,

        })
            .then(res => {
                console.log(res.data)
                history.push("/archive");
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
                        <h1>Ajouter Utilisateur</h1>
                        <br></br>

                        <div className="row">
                            <div className="col">
                                <label>cin</label>
                                <input type="Number" className="form-control" placeholder=" First Name" aria-label="First name" onChange={(e) => handle(e)} id="cin" value={data.cin} />
                            </div>
                            <div className="col">
                                <label>matricule</label>
                                <input type="text" className="form-control" placeholder="matricule" aria-label="matricule" onChange={(e) => handle(e)} id="matricule" value={data.matricule} />
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col">
                                <label>motdeCle</label>
                                <input type="text" className="form-control" placeholder="motdeCle" aria-label="motdeCle" onChange={(e) => handle(e)} id="motdeCle" value={data.motdeCle} />
                            </div>
                            <div className="col">
                                <label>nbrePieces</label>
                                <input type="text" className="form-control" placeholder="nbrePieces " aria-label="nbrePieces" onChange={(e) => handle(e)} id="nbrePieces" value={data.nbrePieces} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label> numDoss</label>
                                <input type="text" className="form-control" placeholder="numDoss" aria-label="numDoss" onChange={(e) => handle(e)} id="numDoss" value={data.numDoss} />
                            </div>
                            <div className="col">
                                <label>  serie   </label>
                                <input type="text" className="form-control" placeholder=" serie " aria-label="numDoss" onChange={(e) => handle(e)} id=" serie " value={data.serie} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label> theme_titre</label>
                                <input type="text" className="form-control" placeholder="theme_titre" aria-label="theme_titre" onChange={(e) => handle(e)} id="theme_titre" value={data.theme_titre} />
                            </div>
                            <div className="col">


                                <label>Role</label>

                                <select className="form-control" onChange={(e) => handle(e)} id="privilege" value={data.privilege}>
                                    <option value="public" >public</option>
                                    <option value="prive"> prive</option>
                                </select>

                            </div>

                        </div>

                        <br></br>
                        <button className="btn btn-primary btn-block">Login</button>
                    </form>

                </Container>
            </div>
        </main>


    )
}


