import { Container, Dropdown } from "react-bootstrap";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom"
export default function UpdateUser(props) {
  const location = useLocation();
  const history = useHistory();
  console.log(location.state.id);
  const id= location.state.id;
  const config ={
    headers:{
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  const [CategoryList, setCategory] = useState([]);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    numtel: Number(""),
    password: "",
    
  });

  useEffect(() => {
    
     
      axios.get('user/' + id,config).then(
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
    axios.put(`user/${id}`, data,config)
        .then(res => {
            console.log(res.data)
            history.pushState("/administration")
        }).catch(err=>console.error(err))
}
function handle(e) {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
}


    return(
      <main>
      <div className="main__container">
      <div className="main__title">
  
  <div className="main__greeting">
  </div>
</div>
      <Container >
      <form onSubmit={(e) => submit(e)}>
          <h1>Modifier Utilisateur</h1>
          <br></br>

          <div class="row">
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
          <div class="row">
              <div className="col">
                  <label>Email</label>
                  <input type="email" className="form-control" placeholder="Email" aria-label="Email" onChange={(e) => handle(e)} id="email" value={data.email} />
              </div>
              <div className="col">
                  <label>Tel</label>
                  <input type="number" className="form-control" placeholder="Tel° " aria-label="Tel" onChange={(e) => handle(e)} id="numtel" value={data.numtel} />
              </div>
          </div>
          <div class="row">
              <div className="col">
                  <label>Mot de passe</label>
                  <input type="password" className="form-control" placeholder="password" aria-label="password" onChange={(e) => handle(e)} id="password" value={data.password} />
              </div>
              
          </div>

          <br></br>
          <button className="btn btn-primary btn-block">Update</button>
      </form>

  </Container>
  </div>
  </main>
  
)
}