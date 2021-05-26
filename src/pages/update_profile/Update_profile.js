import axios from "axios";
import React, { useState, useEffect, useCallback, Component } from 'react';
import { Container } from "react-bootstrap";
import AuthService from "../../services/auth"

export default function Update (){
  
    const config ={
        headers:{
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      const [User, setUsername] = useState([]);
    
      useEffect(() => {
        const getCurrentUse = () => {
          const id = AuthService.getCurrentUser();
    
          axios.get('user/' + id,config).then(
            res => {
              console.log(res.data);
              setUsername(res.data)
            },
            err => {
              console.log(err)
            }
          )
        }
        getCurrentUse()
      }, [])
    
   
  function submit(e) {
    const id = localStorage.getItem('id')

    e.preventDefault();
    axios.put(`user/${id}`, {
      firstName: User.firstName,
      lastName: User.lastName,
      email: User.email,
      numtel: User.numtel,
      
    }

      , config)
      .then(res => {
        console.log(res.User)

       // history.push("/Administration");
         window.location.reload();

      }).catch(err => console.error(err))
  }
  function handle(e) {
    const newdata = { ...User }
    newdata[e.target.id] = e.target.value
    setUsername(newdata)
    console.log(newdata)
    console.log('USER=', User)
  }
 
        return (
            <Container style={{ marginTop: 10 + 'em' }}>
       
                <form onSubmit={(e) => submit(e)}>
            <h1>Modifier Utilisateur</h1>
            <br></br>

            <div className="row">
              <div className="col">
                <label>Prénom</label>
                <input type="text" className="form-control" placeholder=" First Name" aria-label="First name" onChange={(e) => handle(e)} id="firstName" value= {User.firstName} />
              </div>
              <div className="col">
                <label>Nom</label>
                <input type="text" className="form-control" placeholder="Last Name" aria-label="Last name" onChange={(e) => handle(e)} id="lastName" value={User.lastName} />
              </div>
            </div>
            <br></br>
            <div className="row">
              <div className="col">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Email" aria-label="Email" onChange={(e) => handle(e)} id="email" value={User.email} />
              </div>
              <div className="col">
                <label>Tel</label>
                <input type="number" className="form-control" placeholder="Tel° " aria-label="Tel" onChange={(e) => handle(e)} id="numtel" value={User.numtel} />
              </div>
            </div>
           

            <br></br>
            <button className="btn btn-primary btn-block">Update</button>
          </form>

     
            </Container>

        )
    }

