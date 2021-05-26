
import { useDropzone } from 'react-dropzone';
import React, { useState, useEffect, useCallback, Component } from 'react';
import axios from "axios";
import { useHistory, useLocation , Link} from "react-router-dom"
import ReactPaginate from "react-paginate";
import * as ReactBootstrap from "react-bootstrap";
import document from "../../assets/doc.png"


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



  useEffect(() => {
    axios.get(`/archive/contenu/${num}`)
      .then(res => {
        console.log(res.data)
        setfiles(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])




  const displayFiles = files
    .slice(pagesVisited, pagesVisited + documentPerPage)
    .map((file, key) => {
      return (
        <div className="card" key={key} style={{ width: "18rem" }}>
          <img className="card-img-top" src={document} alt="Card image cap" style={{ width: "5rem", margin: "auto" }} />
          <div className="card-body">
            <p >Nom fichier :{file[1]}</p>
            <p >Date de création :{file[2]}</p>
            <p >Taille :{file[3]}</p>
            <button className="btn btn-primary" onClick={() => { window.location.href = "http://localhost:8080/files/" + file[0] }}>Télécharger</button>
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
    axios.post(`/archive/files/${num}`, formData, config


    ).then(() => {
      console.log("file uploaded successfully")
      alert('fichier ajouter')
      window.location.reload(false)
    }

    ).catch(er => {
      console.log(er);
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