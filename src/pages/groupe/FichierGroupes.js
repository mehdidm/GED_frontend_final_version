
import { useDropzone } from 'react-dropzone';
import React, { useState, useEffect, useCallback, Component } from 'react';
import axios from "axios";
import AuthService from "../../services/auth"
import doc from "../../assets/doc.png";
import { NotificationManager } from 'react-notifications';
import { useHistory, useLocation, Link } from "react-router-dom"
export default function FichierGroupe() {


  const history = useHistory();
  const location = useLocation();
  const num = location.state.num;
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  const [files, setfiles] = useState([]);
  async function FetchFiles() {
    await axios.get(`/files/ListFilesGroupe/${num}`, config).then(res => {
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
              <th>Editeur</th>
              <th>Type</th>
              <th>Taille de fichier</th>
              <th>date de création</th>
              <th>Heure de création</th>
              <th></th>
              <th></th>

            </tr>
          </thead>
          <tbody>

            {files.map(RenderFiles)}

          </tbody>
        </table>






      </div>
    </main>


  );


}
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
      <td>    <img className="card-img-top" src={doc} alt="Card image cap" style={{ width: "2rem", margin: "auto" }} />
      </td>
      <td> {file[1]}</td>
      <td>{file[6]} {file[7]} </td>
      <td>{file[2]}</td>
      <td>{file[3]}</td>
      <td>{file[4].slice(0, [10])}</td>
      <td>{file[4].slice(11, [19])}</td>
     
     


      <td>

        <button className="btn btn-dark" onClick={() => { window.location.href = "http://localhost:8080/files/viewFile/" + file[0] }} >
          <i className="fas fa-eye"></i>
        </button>
      </td>
      <td>
        <button className="btn btn-dark"  onClick={() => { window.location.href = "http://localhost:8080/files/" + file[0] }} >
          <i className="fa fa-download" aria-hidden="true"></i>
        </button>
      </td>
      <td>

        <button className="btn btn-dark"  onClick={() => Contenu(file[0])} >
          <i className="fas fa-code-branch"></i>
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
  const location = useLocation();
  const num = location.state.num;
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    console.log(file);
    const id = localStorage.getItem('id');

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user", id);
    formData.append("groupe", num);


    console.log(file);
    axios.post(`/files/groupe`, formData, config


    ).then(() => {
      NotificationManager.success( "Fichier ajouter avec succés" ,"success",2000 );
      setTimeout(function(){
        window.location.reload(false);
        
     }, 2500);
    }

    ).catch(er => {
      NotificationManager.error("Verifier vos données", 'Error!');
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