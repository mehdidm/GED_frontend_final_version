
import axios from "axios";
import equipe from "../../assets/equipe.png"
import React, { useState, useEffect, useCallback } from 'react';

import ReactPaginate from "react-paginate";
import { useHistory , Link} from "react-router-dom"


 export default function Groupes (){
     
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  const [groupes, setGroupes] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const archivePerPage = 3;
  const pagesVisited = pageNumber * archivePerPage;
  const [searchTerm, setSearchTerm] = useState('')
  const pageCount = Math.ceil(groupes.length / archivePerPage);
  const changePage = ({ selected }) => { setPageNumber(selected); };
  const history = useHistory();
  useEffect(() => {
    axios.get(`groupes`)
      .then(res => {
        console.log(res.data)
        setGroupes(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
    //function to send id groupe to file page//
    function Contenu(num) {
        
        console.log(num)
        history.push({
            pathname:'/FichierGroupe/' + num,
           state: {  // location state
            num: num, 
          },})
    }
      //function to send num° dossier to archive_contenu page//
      //function to send id groupe to file page//
    function Users(num) {
        
      console.log(num)
      history.push({
          pathname:'/GroupeUsers/' + num,
         state: {  // location state
          num: num, 
        },})
  }
    //function to send num° dossier to archive_contenu page//
  const displayArchive = groupes
  .slice(pagesVisited, pagesVisited + archivePerPage)
  .filter((val)=>{
    if (searchTerm == ""){
      return val
      
    }
    
    else if (val.groupe.name.toLowerCase().incldes(searchTerm.toLowerCase())){
      
      return val
    
    }
  })
  .map((groupe, key) => {
    return (
      <div className="card" key={key} style={{ width: "18rem" }}>
        <img className="card-img-top" src={equipe} alt="Card image cap" style={{ width: "5rem", margin: "auto" }} />
        <div className="card-body">
          <h5 className="card-title">{groupe.name}</h5>
          <p >Id :{groupe.id}</p>
          <p >Nom du groupe: {groupe.name}</p>
          <p >Nombres de documents: {groupe.files.length}</p>
          <p >Membres du groupes: {groupe.users_groupes.length}</p>
         
          <div className="row" style={{margin:"auto"}} >
          <button className="btn btn-info" onClick={() =>Contenu(groupe.id)}  style={{margin:"auto"}}> <i className="fa fa-file" aria-hidden="true"></i> </button>
          <button className="btn btn-info" onClick={() =>Users(groupe.id)} style={{margin:"auto"}}><i className="fa fa-edit" aria-hidden="true"></i> </button>
          <button className="btn btn-info" onClick={() =>Users(groupe.id)} style={{margin:"auto"}}><i className="fa fa-user" aria-hidden="true"></i> </button>
    
        </div>
        </div>
      </div>
    )
  });
     return(
        <div className="container">
        <h1 className="title_archive">- Groupes -</h1>
        <h5 className="title_archive">Nombre totale du groupes ({groupes.length})</h5>
        
          
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
          <Link to='/AddGroupe' style={{ marginLeft: "40%" }}>
          <button className="btn btn-dark">  <i className="fa fa-plus-circle"></i> Créer Groupe</button>
       
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