
import React, { useState, useEffect, useCallback, Component } from 'react';
import axios from "axios";
import AuthService from "../../services/auth"
import "./Tasks.css";
import Card from "react-bootstrap/Card";
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';
import image from "../../assets/completed-task.png"
import User from "../../services/UserName"

import { useHistory } from "react-router-dom"
export default function Tasks() {
  const history = useHistory();
  
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }

  const [Tasks, setTasks] = useState([

  ]);

  useEffect(() => {
    axios.get(`getIds`, config)
      .then(res => {
        // console.log(res.data.userTasksDetails)
        setTasks((res.data.userTasksDetails))
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

function Done(id){
  axios.get(`complete-task/${id}` ,config).then(
    res => {
      //console.log(res);
      console.log(res.data)
      NotificationManager.success( "Tache terminé" ,"success",2000 );
      
      setTimeout(function(){
        window.location.reload(false);
     }, 2500);
     
    },
    err => {
      console.log(err)
        NotificationManager.error("Process invalide", 'Error!');

    }
  )
}

  return (
    <div >
      <div className="containerCard" >


        {Tasks.map((task, index) => {
          // play here....
        //  console.log(Object.values(task));

          return (

            <Card className="card1" key={index} >
              <div >
                <img src={image} style={{ width: "15%" }} />
                <div>
                  <div className="titleCard">
                    {Object.values(task)[0].task}
                  </div>
                  <hr style={{ width: "55%" }}></hr>


                  <p>{Object.values(task)[0].ddl}</p>
                  {console.log(Object.values(task)[0].de)}
                  <p >{Object.values(task)[0].de}</p>
                  <br></br>
                  <p>{Object.values(task)[0].description}</p>


                </div>
              </div>

              <div className="go-corner" >
                <div className="go-arrow">
                  →
             </div>
              </div>
              <div className="cardUser">
                <p className="d-flex justify-content-center ">
                  <i className="fas fa-user-clock " style={{ marginTop: "4px" ,marginRight: "4px" }}></i>
                  <span style={{ fontWeight: "800" ,marginRight: "4px"}}>Employé:</span>
                  <User Nom={Object.values(task)[0].employe}></User>
                </p>
              </div>
              <div className="DoneButton btn btn-info" onClick={() =>Done(Object.values(task)[3]) }>
         
              <i className="fas fa-check"></i>
              </div>
            </Card>


          );


        })
        }


      </div>
    </div>

  )
}
