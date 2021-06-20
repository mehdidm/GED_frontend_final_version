
import axios from "axios";
import { useDropzone } from 'react-dropzone';
import archiver from "../../assets/doc_pub.png"
import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactPaginate from "react-paginate";
import * as ReactBootstrap from "react-bootstrap"
import { useHistory, useLocation , Link} from "react-router-dom"

import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';
import Search from "antd/lib/transfer/search";


export default function FichiersPublics() {
    const config = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }
    const [files, setFiles] = useState([]);
    const [UserName, setUsername] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const filePerPage = 3;
    const pagesVisited = pageNumber * filePerPage;
    const [searchTerm, setSearchTerm] = useState('');
    const [search , setSearch]= useState('');
    const pageCount = Math.ceil(files.length / filePerPage);
    const changePage = ({ selected }) => { setPageNumber(selected); };
    const history = useHistory();



    //fetchin file//  
    useEffect(() => {
        axios.get(`files/public`, config)
            .then(res => {
                console.log(res.data)
                setFiles(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    //function to send id file ti versions  page//
    function Contenu(num) {
        console.log(num)
        history.push({
            pathname: '/ListeVersions/' + num,
            state: {  // location state
                num: num,
            },
        })
    }

    //function to send id file ti versions  page//
    const displayFile = files

        .filter((val) => {
            if (search == "") {
               // console.log(val[1]);
                return val

            }

            else if (
                val[0].toLowerCase().includes(search.toLowerCase())||
                val[1].toLowerCase().includes(search.toLowerCase())||
                val[3].toString().includes(search.toString())||
                val[6].toLowerCase().includes(search.toLowerCase())||
                val[7].toLowerCase().includes(search.toLowerCase())
                
                ) {
               // console.log(val);
                return val
              
            }
        })
        .slice(pagesVisited, pagesVisited + filePerPage)
        .map((file, key) => {
            return (
                <div className="card" key={key} style={{ width: "18rem" }}>
                    <img className="card-img-top" src={archiver} alt="Card image cap" style={{ width: "5rem", margin: "auto" }} />
                    <div className="card-body">
                        <h5 className="card-title">{file[1]}</h5>
                        <p >Type: {file[2]}</p>
                        <p >taille: {file[3]}</p>
                        <p >Date : {file[4].slice(0, [10])}</p>
                        <p >Heure : {file[4].slice(11, [19])}</p>
                       
                        <p >Editeur : {file[6]} {file[7]}</p>
                        <div className="d-flex justify-content-between" >
                            <button className="btn btn-info" onClick={() => { window.location.href = "http://localhost:8080/files/" + file[0] }} >
                                <i className="fa fa-download" aria-hidden="true"></i>
                        </button>
                            
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
           
            <h1 className="title_archive">-Fichiers Publics -</h1>
            <h5 className="title_archive">Nombre totale de fichiers ({files.length})</h5>
            <hr />
            <div className="row" >
                <input
                    type="text"
                    className="form-control"
                    placeholder="Rechercher ..."
                    style={{ width: "30%",marginRight: "50%" }}
                    onChange={e => {
                        setSearch(e.target.value)
                    }} />
                    
                     <MyDropzone_file ></MyDropzone_file>
            </div>

            <div className="row" style={{ margin: "auto" }}>

                {displayFile}
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




export function MyDropzone_file() {
    const history = useHistory();
    const location = useLocation();
  
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
      axios.post(`/files/public`, formData, config
  
  
      ).then(() => {
        console.log("file uploaded successfully")
        NotificationManager.success( "Fichier ajouter avec succés" ,"succés",2000 );
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
              <ReactBootstrap.Button className="btn btn-dark" variant="info"><i className="fa fa-plus-circle"></i> Ajouter fichier</ReactBootstrap.Button>
            )
  
        }
      </div>
    )
      }