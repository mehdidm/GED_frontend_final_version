
import axios from "axios";
import equipe from "../../assets/equipe.png"
import"./Groupe.css";
import Popup from "../../components/popup/PopUp";
import React, { useState, useEffect, useCallback } from 'react';
import { NotificationManager } from 'react-notifications';
import ReactPaginate from "react-paginate";
import { useHistory , Link} from "react-router-dom"


 export default function Groupes (){
  
     
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  const [groupes, setGroupes] = useState([]);
  const [groupesCrv, setGroupesCrv] = useState([]);
  
  const [pageNumber, setPageNumber] = useState(0);
  const archivePerPage = 3;
  const pagesVisited = pageNumber * archivePerPage;
  const [searchTerm, setSearchTerm] = useState('')
  const pageCount = Math.ceil(groupes.length / archivePerPage);
  const changePage = ({ selected }) => { setPageNumber(selected); };
  const history = useHistory();
  const id = localStorage.getItem("id");
  const  history_GroupeId = useHistory();
 
  useEffect(() => {
    axios.get(`groupes`,config)
      .then(res => {
        console.log(res.data)
        setGroupes(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  useEffect(() => {
    axios.get(`groupes/${id}`,config)
      .then(res => {
        console.log(res.data)
        setGroupesCrv(res.data)
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
    

    //Delete group
    function deleteGroupe(id) {
      

      if (window.confirm('Etes vous sur de vouloir supprimer cet utilisateur?')) {
          axios.delete(`groupe/${id}`, config)
              .then(res => {
                  console.log(res.data)
                  // window.location.reload(false)
                  NotificationManager.error('Groupe supprimé avec succés ', 'Supprimé!',2000);
                  setTimeout(function () {
                      window.location.reload(false);
                  }, 2100);
                  

              })
              .catch(err => {
                  console.log(err)
              })
      }
  }
  //Send id GROUP TO Update group
  function ContenuGroupe(id) {
    history_GroupeId.push({
      pathname: '/UpdateGroupe',
      state: {  // location state
        id: id,
      },
    })
  }
  const displayGroupe = groupes
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
          <p >Id :{groupe[0]}</p>
          <p >Nom du groupe: {groupe[1]}</p>
          <p >Créateur: {groupe[2]} {groupe[3]}</p>
          
         
          <div className="row" style={{margin:"auto"}} >
          <button className="btn btn-info" onClick={() =>Contenu(groupe[0])}  style={{margin:"auto"}}><i className="fas fa-file-alt"></i> </button>
          
          <button className="btn btn-info"  onClick={() =>ContenuGroupe(groupe[0])}  style={{margin:"auto"}}><i className="fas fa-pencil-alt"></i></button>
          
          <button className="btn btn-info" onClick={() =>Users(groupe[0])} style={{margin:"auto"}}><i className="fa fa-user" aria-hidden="true"></i> </button>
    
        </div>
        </div>
        <div className="go-up" >
                <div className="go-close">
                <i onClick={() =>deleteGroupe(groupe[0])}  className="far fa-trash-alt"></i>
             </div>
              </div>
      </div>
    )
  });

  const displayGroupeCrv = groupesCrv
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
          <p >Id :{groupe[0]}</p>
          <p >Nom du groupe: {groupe[1]}</p>
        
          
         
          <div className="row" style={{margin:"auto"}} >
          <button className="btn btn-info" onClick={() =>Contenu(groupe[0])}  style={{margin:"auto"}}><i className="fas fa-file-alt"></i> </button>
          
          <button className="btn btn-info"  onClick={() =>ContenuGroupe(groupe[0])}  style={{margin:"auto"}}><i className="fas fa-pencil-alt"></i></button>
          
          <button className="btn btn-info" onClick={() =>Users(groupe[0])} style={{margin:"auto"}}><i className="fa fa-user" aria-hidden="true"></i> </button>
    
        </div>
        </div>
        <div className="go-up" >
                <div className="go-close">
                <i onClick={() =>deleteGroupe(groupe[0])}  className="far fa-trash-alt"></i>
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

        {localStorage.getItem('Role') =="SUPERVISEUR" | localStorage.getItem('Role')=="INGENIEUR" ?
             
        
        <div className="row" style={{ margin: "auto" }}>
       
          
          {displayGroupe}
          
         
        
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
      
:
      <div></div>  }

{ localStorage.getItem('Role')=="CONTROLEUR" ?
             
        


        <div className="row" style={{ margin: "auto" }}>
       
          
     
       {displayGroupeCrv}
      
     
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
   
     :
      <div></div>  }




      </div>
     )

 }