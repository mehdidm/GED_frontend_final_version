import "./home.css";
import hello from "../../assets/doc_pub.png";
import { Bar, Line, PolarArea, Radar, Pie, Doughnut } from 'react-chartjs-2';
import React, { useState, useEffect, useCallback, Component } from 'react';
import axios from "axios";
import AuthService from "../../services/auth"
import Username from "../../services/UserName"







export default function Home() {
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  const Role = localStorage.getItem('Role')
  const id = localStorage.getItem('id')



  return (
    <div>
     
      <div className="d-flex ">
        <div className="main__greeting card ">
          <h1> <Username Nom={id}></Username></h1>
          <p style={{ fontSize: "12px" }}>{Role}</p>


        </div>
        <div className="main__greeting card ">
          <h1> Lorem ipseum</h1>
          <Line
            data={{

              labels: [
                'Red',
                'Blue',
                'Yellow'
              ],
              datasets: [{
                label: 'My First Dataset',
                data: [300, 50, 100],
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
              }]
            }} />

        </div>
      </div>
   
      <div className="card" style={{ width: "50%" }}>
        
          
        <div>
          <h3>E-doc</h3>
          <hr style={{ width: "100%" }}></hr>
          <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>

      
        <div className="btn btn-info" style={{ width: "10%"  }}>wa</div>
    </div>
    </div>
  );

};