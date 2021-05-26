
import { useDropzone } from 'react-dropzone';
import React, { useState, useEffect, useCallback, Component } from 'react';
import axios from "axios";
import { useHistory, useLocation, Link } from "react-router-dom"
import ReactPaginate from "react-paginate";
import * as ReactBootstrap from "react-bootstrap";
import document from "../../assets/doc.png"
import hello from "../../assets/avatar.png";
import { config } from '@fortawesome/fontawesome-svg-core';




export default function GoupeUsers() {
  const [users, setusers] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const num = location.state.num;
  console.log(num.toString())
  const [pageNumber, setPageNumber] = useState(0);
  const documentPerPage = 3;
  const pagesVisited = pageNumber * documentPerPage;
  const [searchTerm, setSearchTerm] = useState('')
  const pageCount = Math.ceil(users.length / documentPerPage);
  const changePage = ({ selected }) => { setPageNumber(selected); };

  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }

  useEffect(() => {

    axios.get(`/groupeUsers/${num}`, config)
      .then(res => {
        console.log(res.data)
        setusers(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const displayUsers = users
    .slice(pagesVisited, pagesVisited + documentPerPage)
    .map((user, key) => {
      return (
        <div className="card" key={key} style={{ width: "18rem" }}>
        
          <p >
              {user.image ?
                <img className="rounded-circle-userGroupe"   src={`data:image/jpeg;base64,${user.image}`} />
                :
                <img className="rounded-image" 
                style={{
                  width: "130px",
                  height: "90px",
                  borderRadius:" 50%",
                  objectFit:" cover",
                  objectPosition: "center" }}  src={hello} />
              }
            </p>
             <div className="card-body">
            <p style={{marginTop:"10%"}}>Prénom : {user.firstName}</p>
            <p >Nom :{user.lastName}</p>   
            <p >Num°: {user.numtel}  </p>
            <p >Email : {user.email}</p>
            <p >Role : {user.appUserRole}</p>
            <button className="btn btn-primary" >Télécharger</button>
          </div>
        </div>
      )
    });
    
  return (
    <div className="container">
      <h1 className="title_archive">-Membre de groupe-</h1>
      <h5 className="title_archive">Nombre totale des membres ({users.length})</h5>
      <hr />
      <div className="row" >
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher ..."
          style={{ width: "30%" }}
          onChange={event => {
            setSearchTerm(event.target.value)
          }} />
        <div style={{ marginLeft: "40%" }}>

        </div>

      </div>

      <div className="row" style={{ margin: "auto" }}>

        {displayUsers}
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          activeClassName={"paginationActive"}
        />

      </div>
    </div>

  )
}