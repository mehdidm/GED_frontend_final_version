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
    
      const handleSubmit = e =>{
        e.preventDefault();
        const id = localStorage.getItem('id')
        const data ={
            username : this.username,
            password:this.password
        }
        axios.put('user/'+id, data)
        
        .then(res => {
           
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('id', res.data.id);
            console.log(res)
           if (res.status===200) {
            
          this.props.history.push("/");
            window.location.reload();
           }
          
        })
        .catch(err =>{
            alert(err)
        })
    };
 
        return (
            <Container style={{ marginTop: 10 + 'em' }}>
               <form onSubmit={handleSubmit}> 
                <h1>Hello</h1>
                    
                    <div class="row">
                        <div className="col">
                            <label>First name</label>
                            <input type="text" className="form-control" placeholder= {User.firstName} aria-label="First name" />
                        </div>
                        <div className="col">
                        <label>Last name</label>
                            <input type="text" className="form-control" placeholder={User.lastName} aria-label="Last name" />
                        </div>
                    </div>
                    <br></br>
                    <div class="row">
                        <div className="col">
                        <label>email</label>
                            <input type="email" className="form-control" placeholder={User.email}  aria-label="First name" />
                        </div>
                        <div className="col">
                        <label>Num Tel</label>
                            <input type="text" className="form-control" placeholder={User.numtel}  aria-label="Last name" />
                        </div>
                    </div>
                  
                <br></br>
                    <button className="btn btn-primary btn-block">Login</button>
                </form>

            </Container>

        )
    }


