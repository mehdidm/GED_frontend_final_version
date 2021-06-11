import "./Archive.css";
import axios from "axios";
import archiver from "../../assets/archiver.png";
import React, { useState, useEffect, useCallback } from 'react';
import Popup from "../../components/popup/PopUp";
import ReactPaginate from "react-paginate";
import file from "../../assets/file.png"
import { useHistory, Link } from "react-router-dom";
import folders from "../../assets/folders.png"

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
  const [buttonPopup, setButtonPopup] = useState(false);

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
            <div className="d-flex justify-content-around">
            <button className="btn btn-info" onClick={() => Contenu(archive[0])}><i className="fas fa-file-alt"></i> Fichiers</button>
            <div></div>
            <button className="btn btn-info" onClick={() => setButtonPopup(true)}><i className="fas fa-info"></i> Details</button>

            </div>
          
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
              <div className="row">
                <h3 style={{marginLeft:"5%"}}>Détails</h3>
              </div>
              <hr></hr>
              <div className="d-flex justify-content-around">
                <div style={{ textAlign: "justify" }}>
                  <p ><span>Serie :</span> {archive[8]}</p>
                  <p ><span>Num° Boite:</span> {archive[0]}</p>
                  <p ><span>Matricule: </span>{archive[4]}</p>
                  <p ><span>Date : </span>{archive[2].slice(0, [10])}</p>
                  <p ><span>Heure : </span>{archive[2].slice(11, [19])}</p>
                  <p ><span>Nombre pieces :</span> {archive[6]}</p>
                </div>
     <img style={{width:"20%", height:"30%",margin:"10%"}} src={folders}/>
              </div>



            </Popup>
          </div>
        </div>
      )
    });


  return (

    <div className="container">
      <h1 className="title_archive">-Archive-</h1>
      <h5 className="title_archive">Nombre totale de boites d'archives ({archives.length})</h5>


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
          <button className="btn btn-dark">  <i className="fa fa-plus-circle"></i> Ajouter Boite</button>

        </Link>
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