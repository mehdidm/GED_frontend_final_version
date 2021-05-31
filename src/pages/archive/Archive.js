import "./Archive.css";
import axios from "axios";
import archiver from "../../assets/archiver.png"
import React, { useState, useEffect, useCallback } from 'react';

import ReactPaginate from "react-paginate";
import { useHistory, Link } from "react-router-dom"

function Archive() {

  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  const [archives, setArchives] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const archivePerPage = 3;
  const pagesVisited = pageNumber * archivePerPage;
  const [searchTerm, setSearchTerm] = useState('')
  const pageCount = Math.ceil(archives.length / archivePerPage);
  const changePage = ({ selected }) => { setPageNumber(selected); };
  const history = useHistory();

  useEffect(() => {
    axios.get(`archive`, config)
      .then(res => {
        console.log(res.data)
        setArchives(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  //function to send num° dossier to archive_contenu page//
  function Contenu(num) {

    console.log(num)
    history.push({
      pathname: '/Archive_contenu/' + num,
      state: {  // location state
        num: num,
      },
    })
  }
  //function to send num° dossier to archive_contenu page//
  const displayArchive = archives
    .slice(pagesVisited, pagesVisited + archivePerPage)
    .filter((val) => {
      if (searchTerm == "") {
        return val

      }

      else if (val.archives.array[0].toLowerCase().incldes(searchTerm.toLowerCase())) {

        return val
        console.log(val);
      }
    })
    .map((archive, key) => {
      return (
        <div className="card" key={key} style={{ width: "18rem" }}>
          <img className="card-img-top" src={archiver} alt="Card image cap" style={{ width: "5rem", margin: "auto" }} />
          <div className="card-body">
            <h5 className="card-title">{archive[1]}</h5>
            <p >Nom Personnel : {archive[7]}</p>
            <p >Serie: {archive[8]}</p>
            <p >Num° Dossier: {archive[0]}</p>
            <p >Matricule: {archive[4]}</p>
            <p >Date : {archive[2].slice(0, [10])}</p>
            <p >Heure : {archive[2].slice(11, [19])}</p>
            <p >Nombre pieces: {archive[6]}</p>

            <button className="btn btn-primary" onClick={() => Contenu(archive[0])}>Consulter les fichiers</button>
          </div>
        </div>
      )
    });

  return (

    <div className="container">
      <h1 className="title_archive">-Archive-</h1>
      <h5 className="title_archive">Nombre totale de dossiers ({archives.length})</h5>


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
        <Link to='/addDossier' style={{ marginLeft: "40%" }}>
          <button className="btn btn-dark">  <i className="fa fa-plus-circle"></i> Ajouter dossier</button>

        </Link>
      </div>

      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
</button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              ...
      </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row" style={{ margin: "auto" }}>

        {displayArchive}
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

export default Archive;