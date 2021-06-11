import axios from "axios";
import React, { useState, useEffect, Component } from 'react';
export default function User(props) {

    const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
    const [User, setUser] = useState({});
  useEffect(() => {
    const getCurrentUse = () => {


      axios.get('user/' + props.Nom, config).then(
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
    return (
       <div> {User ? User.firstName + " "+User.lastName: null}</div> 
    
       
    )
}
