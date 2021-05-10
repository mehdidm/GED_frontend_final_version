import "./Navbar.css";
import avatar from "../../assets/avatar.png";
import * as ReactBootstrap from "react-bootstrap";
import React, { useState, useEffect, useCallback, Component } from 'react';
import AuthService from "../../services/auth";
import axios from "axios";
import { Link, useHistory } from 'react-router-dom';

function Navbar() {

/* get user name*/
  const [UserName, setUsername] = useState("");
  const config ={
    headers:{
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  useEffect(() => {
    const getCurrentUse = () => {
      const id = AuthService.getCurrentUser();

      axios.get('user/' + id,config).then(
        res => {
          console.log(res.data.firstName);
          setUsername(res.data.firstName)
        },
        err => {
          console.log(err)
        }
      )
    }
    getCurrentUse()
  }, [])

/*logout function*/
  const history = useHistory();
  function logout() {
    localStorage.clear();
    history.push('/login')
    window.location.reload();
  }

  return (


    
    <nav className="navbar">
      <div className="navbar__left">
        <a href="#">Subscribers</a>
        <a href="#">Video Management</a>
        <a className="active_link" href="#">
          Admin
        </a>
      </div>
      <div className="navbar__right">
        {localStorage.getItem('token') ?
           <>
            <button className="btn" onClick={logout}><i className="fa fa-home"></i></button>
             <a href="/profile">
              <img width="30" src={avatar} alt="avatar" />
            </a> 
            <ReactBootstrap.NavDropdown title={UserName} id="nav-dropdown">
        <ReactBootstrap.NavDropdown.Item eventKey="4.1" onClick={logout}>Déconnexion</ReactBootstrap.NavDropdown.Item>
       
      </ReactBootstrap.NavDropdown>
            </>

          :
          <button>ahla</button>
        }

        <a href="#">
          <i className="fa fa-search" aria-hidden="true"></i>
        </a>
        <a href="/addUser">
          <i className="fa fa-plus-circle"></i>
        </a>
        <a href="/login">
          <i className="fa fa-home"></i>
        </a>
       

      </div>
    </nav>
  
 
    );
};

export default Navbar;