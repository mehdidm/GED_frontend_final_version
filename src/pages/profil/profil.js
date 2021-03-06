
import hello from "../../assets/avatar.png";

import React, { useState, useEffect, Component } from 'react';
import { useHistory, Link } from "react-router-dom"
import axios from "axios";

import AuthService from "../../services/auth"

import "./profil.css";





export default function Profil() {

  const [UserName, setUsername] = useState([]);
  const [Groupe, setGroupes] = useState([]);

  const id = AuthService.getCurrentUser();
  // console.log(id)
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  useEffect(() => {
    const getCurrentUse = () => {


      axios.get('user/' + id, config).then(
        res => {
          //console.log(res);
          setUsername(res.data)
        },
        err => {
          console.log(err)
        }
      )
    }
    getCurrentUse()
  }, [])
  useEffect(() => {
    const getCurrentUse = () => {


      axios.get('userGroupes/' + id, config).then(
        res => {
          //console.log(res);
          setGroupes(res.data)
          console.log(res.data)
        },
        err => {
          console.log(err)
        }
      )
    }
    getCurrentUse()
  }, [])

  const [imageSelected, setImageSelected] = useState("");
  const uploadImage = () => {
    console.log(imageSelected);
    const formData = new FormData()
    formData.append("image", imageSelected)

    axios.put(`userImage/${id}`, formData,config, {
      onUploadProgres: progressEvent => {
        console.log('Upload Progress' + Math.round((progressEvent.loaded / progressEvent.total) * 100) + '%')
      }
    })
      .then(() => {
        console.log("file uploaded successfully")
        //  alert("file uploaded successfully")
        window.location.reload(false)
        console.log(UserName.image)
      }

      ).catch(er => {
        console.log(er);
      });
  }

  
  // console.log(UserName.appUserRole)

  return (
    <main className="main1">
      <div className="App">

        <input


          type="file"
          accept="image/*"
          id="im"
          onChange={
            (event) => {
              if (event.target.files[0] && event.target.files[0].type.substr(0, 5) === "image") {
                setImageSelected(event.target.files[0])
              }
              else {
                setImageSelected(null);
                console.log("image not found")
              }

            }}

        />


      </div>
      <div className="main__container">
        {/* <!-- MAIN TITLE STARTS HERE --> */}

        <div className="container">
          <div className="main-body">



            <div className="row gutters-sm">
              <div className="col-md-4 mb-3">
                <div className="card">

                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      {UserName.image ?
                        <>

                          <img src={`data:image/jpeg;base64,${UserName.image}`} className="rounded-circle" />



                        </>
                        :
                        <>
                          <img src={hello} alt="Admin" className="rounded-circle" width="260" />
                        </>

                      }
                      <div style={{ display: "flex" }}>
                        <label className="btn btn-primary " for="im" style={{ width: "50px", height: "40px", margin: "5px" }}>
                          <i className="fas fa-image " style={{ margin: "2px" }}></i>
                        </label>
                        <button className="btn btn-primary " onClick={() => {
                          uploadImage()
                        }}><i className="fas fa-upload"></i> </button>
                      </div>
                      <div className="mt-3">
                        <h4>{UserName.firstName} {UserName.lastName} </h4>
                        <p className="text-secondary mb-1">   {UserName.appUserRole}</p>

                        <Link to='/update' >
                          <button className="btn btn-primary" ><i className="fa fa-edit" ></i> </button>


                        </Link>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Nom & Pr??nom</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {UserName.firstName} {UserName.lastName}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {UserName.email}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">T??l??phone</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {UserName.numtel}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Groupe</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">

                        {Groupe.length !== 0 ?  Groupe.map(groupe => <li>{groupe[1]}</li>) : <p>Pas de groupe disponible</p>}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">R??le</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {UserName.appUserRole}
                      </div>
                    </div>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>




      </div>

    </main>


  );

};


