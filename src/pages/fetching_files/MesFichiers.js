
import { useDropzone } from 'react-dropzone';
import React, { useState, useEffect, useCallback, Component } from 'react';
import axios from "axios";
import AuthService from "../../services/auth"
import doc from "../../assets/doc.png";
import * as ReactBootstrap from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { useHistory, useLocation, Link } from "react-router-dom"
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';


export default function MesFichiers() {


  const id = AuthService.getCurrentUser();
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  
  const [pageNumber, setPageNumber] = useState(0);
  const [files, setfiles] = useState([]);
  const archivePerPage = 7;
  const pagesVisited = pageNumber * archivePerPage;
  const [searchTerm, setSearchTerm] = useState('');
  const pageCount = Math.ceil(files.length / archivePerPage);
  const changePage = ({ selected }) => { setPageNumber(selected); };
  async function FetchFiles() {
    await axios.get(`/files/ListFiles/${id}`, config)
    .then(res => {
      console.log(res.data)
      setfiles(res.data)
    })
    .catch(error => console.log(error));
  }
  useEffect(
    () => {
      FetchFiles();
    }, []);


  return (
    <main>

      <div className="main__container">
        <h1 style={{ textAlign: "center", margin: "1%" }}>- Mes fichiers -</h1>
        <h5 style={{ textAlign: "center", margin: "1%" }}>- Nombre total des fichiers ({files.length}) -</h5>
        <input
            type="text"
            className="form-control"
            placeholder="Rechercher ..."
            style={{ width: "30%" }}
            onChange={event => {
              setSearchTerm(event.target.value)
            }} />
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
              <th></th>
              <th></th>
              <th></th>

            </tr>
          </thead>
          <tbody>
            {files && files.length> 0 ?
            files
            .filter((val)=>{
              if (searchTerm == ""){
              //  console.log(val[1])
                return val
                
              }
              
              else if (
                val[0].toLowerCase().includes(searchTerm.toLowerCase())||
                val[1].toLowerCase().includes(searchTerm.toLowerCase())||
                val[2].toLowerCase().includes(searchTerm.toLowerCase())||
                val[3].toString().includes(searchTerm.toString())||
                val[4].toLowerCase().includes(searchTerm.toLowerCase())||
                val[5].toLowerCase().includes(searchTerm.toLowerCase())
                ){
               
                return val
              
              }
            })
            .slice(pagesVisited, pagesVisited + archivePerPage)
            .map(RenderFiles)
          :
          'Loading'}

          </tbody>
        </table>






      </div>
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
    </main>


  );

};

export function RenderFiles(file, index) {
  const history = useHistory();
  function Contenu(num) {

    console.log(num)
    history.push({
      pathname: '/ListeVersions/',
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
      <td> {file[4].slice(11, [19])} {file[4].slice(0, [10])}</td>
      <td>

        <button className="btn btn-dark" style={{ marginLeft: "20%", marginRight: "20%" }} onClick={() => { window.location.href = "http://localhost:8080/files/viewFile/" + file[0] }} >
        <i className="fas fa-eye"></i>
        </button>

      </td>
      <td>

        <button className="btn btn-dark" style={{ marginLeft: "20%", marginRight: "20%" }} onClick={() => { window.location.href = "http://localhost:8080/files/" + file[0] }} >
        <i className="fas fa-download"></i>
        </button>

      </td>
      <td>

        <button className="btn btn-dark" style={{ marginLeft: "20%", marginRight: "20%" }} onClick={() => Contenu(file[0])} >
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
      NotificationManager.success( "Fichier ajouter avec succés" ,"Succés",2000 );
      setTimeout(function(){
        window.location.reload(false);
     }, 2500);
    }

    ).catch(er => {
      console.log(er);
      NotificationManager.error("Vérifier votre fichier", 'Error!');
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