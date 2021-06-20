
import { useDropzone } from 'react-dropzone';
import React, { useState, useEffect, useCallback, Component } from 'react';
import axios from "axios";
import { useHistory, useLocation, Link } from "react-router-dom"
import ReactPaginate from "react-paginate";
import * as ReactBootstrap from "react-bootstrap";
import document from "../../assets/doc.png"
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';

export default function Archive_Contenu() {
  const [files, setfiles] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const num = location.state.num;
  console.log(num.toString())
  const [pageNumber, setPageNumber] = useState(0);
  const documentPerPage = 3;
  const pagesVisited = pageNumber * documentPerPage;
  const [searchTerm, setSearchTerm] = useState('')
  const pageCount = Math.ceil(files.length / documentPerPage);
  const changePage = ({ selected }) => { setPageNumber(selected); };
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }};
  
 
  useEffect(() => {
    axios.get(`/archive/contenu/${num}`,config)
      .then(res => {
        console.log(res.data)
        setfiles(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])




  const displayFiles = files
  .filter((val)=>{
    if (searchTerm == ""){
     // console.log(val[1])
      return val
      
    }
    
    else if (val[0].toLowerCase().includes(searchTerm.toLowerCase())||
    val[0].toLowerCase().includes(searchTerm.toLowerCase())||
    val[1].toLowerCase().includes(searchTerm.toLowerCase())||
    val[2].toLowerCase().includes(searchTerm.toLowerCase())||
    val[4].toLowerCase().includes(searchTerm.toLowerCase())||
    val[5].toLowerCase().includes(searchTerm.toLowerCase())
    ){
     
      return val
    
    }
  })
    .slice(pagesVisited, pagesVisited + documentPerPage)
    .map((file, key) => {
      return (
        <div className="card" key={key} style={{ width: "18rem" }}>
          <img className="card-img-top" src={document} alt="Card image cap" style={{ width: "5rem", margin: "auto" }} />
          <div className="card-body">
            <p >Nom fichier :{file[1]}</p>
            <p >Heure : {file[2].slice(11, [19])}</p>
            <p >Date de création : { file[2].slice(0, [10])}</p>
            <p >Taille :{file[3]}</p>
            <div className="d-flex justify-content-between" >
              <button className="btn btn-primary" onClick={() => { window.location.href = "http://localhost:8080/files/" + file[0] }}>
                <i className="fa fa-download"></i></button>
              <button className="btn btn-info" onClick={() => { window.location.href = "http://localhost:8080/files/viewFile/" + file[0] }} >
                <i className="fas fa-eye"></i>

              </button>
              <button className="btn btn-info" onClick={() =>Contenu(file[0])} >
                        <i className="fas fa-code-branch"></i>
                  
                        </button>
            </div>
          </div>
        </div>
      )
    });



  return (
    <div className="container">
      <h1 className="title_archive">-Les fichiers-</h1>
      <h5 className="title_archive">Nombre totale de fichiers ({files.length})</h5>
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
          <MyDropzone_file ></MyDropzone_file>
        </div>

      </div>

      <div className="row" style={{ margin: "auto" }}>

        {displayFiles}
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

  );

};
export function Contenu({ id }) {
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  const [versions, setVersions] = useState([])
  useEffect(() => {
    axios.get(`files/ListVersions/${id}`, config)
      .then(res => {
        console.log(res.data)
        setVersions(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <div>

      { versions.map(version => <li key={version[0]}>{version[1]}</li>)}

    </div>

  )
}

export function MyDropzone_file() {
  const history = useHistory();
  const location = useLocation();
  const num = location.state.num;
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    console.log(file);
    const id = localStorage.getItem('id');

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user", id);



    console.log(file);
    axios.post(`/archive/files/${num}`, formData,config,


    ).then(() => {
      console.log("file uploaded successfully")
      NotificationManager.success( "Fichier ajouter avec succés" ,"success",2000 );
      setTimeout(function(){
        window.location.reload(false);
     }, 2500);
     
    }

    ).catch(er => {
      console.log(er);
      NotificationManager.warning( "Error 404" ,"Attention",2000 );
    });

  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          (<p>Drop the files here ...</p>) : (
            <ReactBootstrap.Button className="btn btn-dark" variant="info"><i className="fa fa-plus-circle"></i> Ajouter fichier</ReactBootstrap.Button>
          )

      }
    </div>
  )
}
