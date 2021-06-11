import { useDropzone } from 'react-dropzone';
import React, { useState, useEffect, useCallback, Component } from 'react';
import axios from "axios";
import { useHistory, useLocation, Link } from "react-router-dom"
import ReactPaginate from "react-paginate";
import * as ReactBootstrap from "react-bootstrap";
import document from "../../assets/history.png"
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';
export default function ListeVersions(params) {
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
        }
    }
    useEffect(() => {
        axios.get(`files/ListVersions/${num}`, config)
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
                        <p >Nom du fichier : {file[1]}</p>
                        <p >Editeur : {file[6]} {file[5]}</p>
                        <p >Date : {file[4].slice(0, [10])}</p>
                        <p >Heure : {file[4].slice(11, [19])}</p>

                        <p >Taille :{file[3]}</p>
                        <div className="d-flex justify-content-between" >
                        <button className="btn btn-info" onClick={() => { window.location.href = "http://localhost:8080/files/versions/viewVersion/" + file[0] }} >
                               <i className="fas fa-eye"></i>
                  
                        </button>
                        <button className="btn btn-info" onClick={() => { window.location.href = "http://localhost:8080/files/versions/" + file[0] }}> <i className="fas fa-download"></i></button>
                   </div>
                    </div>
                </div>

            )
        });

    return (
        <div>
            <div className="container">
                <h1 className="title_archive">- Liste des versions -</h1>
                <h5 className="title_archive">Nombre totale des versions ({files.length})</h5>
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

        </div>
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
            <div className="row" >

                <MyDropzone_file ></MyDropzone_file>
            </div>

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
        axios.post(`/files/Public/${num}`, formData, config


        ).then(() => {
            console.log("file uploaded successfully")
            NotificationManager.success( "Version ajouter avec succés" ,"Succés",2000 );
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
                        <ReactBootstrap.Button className="btn btn-dark" variant="info"><i className="fa fa-plus-circle"></i> Ajouter version</ReactBootstrap.Button>
                    )

            }
        </div>
    )
}