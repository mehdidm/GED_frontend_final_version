
import { useDropzone } from 'react-dropzone';
import React, { useState, useEffect, useCallback, Component } from 'react';
import axios from "axios";
import AuthService from "../../services/auth"
import doc from "../../assets/doc.png";
import * as ReactBootstrap from "react-bootstrap";
import { useHistory, useLocation, Link } from "react-router-dom"





export default function MesFichiers() {


  const id = AuthService.getCurrentUser();
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  const [files, setfiles] = useState([]);
  async function FetchFiles() {
    await axios.get(`/files/ListFiles/${id}`, config).then(res => {
      console.log(res.data)
      setfiles(res.data)
    });
  }
  useEffect(
    () => {
      FetchFiles();
    }, []);


  return (
    <main>

      <div className="main__container">
        <h1 style={{ textAlign: "center", margin: "2%" }}>- Mes fichiers -</h1>
        <h5 style={{ textAlign: "center", margin: "2%" }}>- Nombre total des fichiers ({files.length}) -</h5>
        <MyDropzone_file></MyDropzone_file>
        <table className="table table-striped" >
          <thead>
            <tr>
              <th></th>
              <th>Nom</th>
              <th>id</th>
              <th>Type</th>
              <th>Taille de fichier</th>
              <th>date de création</th>
              <th>Télécharger</th>
              <th>Versions</th>

            </tr>
          </thead>
          <tbody>
            {files.map(RenderFiles)}

          </tbody>
        </table>






      </div>
    </main>


  );

};

export function RenderFiles(file, index) {
  const history = useHistory();
  function Contenu(num) {

    console.log(num)
    history.push({
        pathname: '/ListeVersions/' + num,
        state: {  // location state
            num: num,
        },
    })
  }
  
  return (
    <tr key={index}>
      <td>   
         <img className="card-img-top" src={doc} alt="Card image cap" style={{ width: "2rem", margin: "auto" }} />
      </td>
      <td> {file[1]}</td>
      <td>{file[0]}</td>
      <td>{file[2]}</td>
      <td>{file[3]}</td>
      <td>{file[4]}</td>
      <td>

        <button className="btn btn-dark" style={{ marginLeft: "20%", marginRight: "20%" }} onClick={() => { window.location.href = "http://localhost:8080/files/" + file[0] }} >
          <i class="fa fa-download" aria-hidden="true"></i>
        </button>

      </td>
      <td>

        <button className="btn btn-dark" style={{ marginLeft: "20%", marginRight: "20%" }} onClick={() => Contenu(file[0])} >
          <i class="fa fa-file" aria-hidden="true"></i>
        </button>

      </td>

    </tr>

  )
}



export function Versions({ id }) {
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
    formData.append("groupe", 1);


    console.log(file);
    axios.post(`http://localhost:8080/files/private`, formData, config


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

            <button className="btn btn-dark" style={{ marginLeft: "90%", marginBottom: "12px" }}>  <i className="fa fa-plus-circle"></i> Ajouter fichier</button>

          )

      }
    </div>
  )
};
 //function to send id file ti versions  page//

//function to send id file ti versions  page//