import { Container, Dropdown } from "react-bootstrap";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';
import Card from "react-bootstrap/Card";
export default function UpdateUser(props) {
  const location = useLocation();
  const history = useHistory();
  //console.log(location.state.id);
  const id = location.state.id;
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  const [CategoryList, setCategory] = useState([]);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    numtel: "",
    appUserRole: ""


  });

  useEffect(() => {


    axios.get('user/' + id, config).then(
      res => {
        console.log(res.data);
        setData(res.data)
      },
      err => {
        console.log(err)
      }
    )

  }, [])


  function submit(e) {
    e.preventDefault();
    axios.put(`IngUpdate/${id}`, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      numtel: data.numtel,
      appUserRole: data.appUserRole
    }

      , config)
      .then(res => {
        console.log(res.data)
        NotificationManager.success( "Utilisateur modifier" ,"Succés",2000 );
        history.push("/Administration");
        // window.location.reload();

      })
      .catch(er => {
        console.log(er);
        NotificationManager.error("Verifier vos données", 'Error!');
    });
  }
  function handle(e) {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
    console.log('data=', data)
  }


  return (
    <div className="groupCard">
      <Card>
        <div className="main__title">

          <div className="main__greeting">
          </div>
        </div>
        <Container >
          <form onSubmit={(e) => submit(e)}>
            <h2>Modifier Utilisateur</h2>
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


                <label>Role</label>

                <select className="form-control" onChange={(e) => handle(e)} id="appUserRole" value={data.appUserRole}>
                  <option value="SUPERVISEUR" >SUPERVISEUR</option>
                  <option value="CONTROLEUR"> CONTROLEUR</option>
                  <option value="ADMINISTRATEUR">ADMINISTRATEUR</option>
                  <option value="INGENIEUR">INGENIEUR</option>
                </select>

              </div>


            </div>

            <br></br>
            <button className="btn btn-info btn-block">Modifier</button>
          </form>

        </Container>
        <div className="go-left" >
                <div className="go-ar">
                <i className="fas fa-wrench"></i>
             </div>
              </div>
      </Card>
    </div>

  )
}