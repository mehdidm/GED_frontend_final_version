import "./Navbar.css";
import avatar from "../../assets/avatar.png";
import * as ReactBootstrap from "react-bootstrap";
import React, { useState, useEffect, useCallback, Component } from 'react';
import AuthService from "../../services/auth";
import axios from "axios";
import { Link, useHistory } from 'react-router-dom';
import Popup from "../../components/popup/PopUp";
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';
import image  from "../../assets/clipboard.png"

function Navbar() {

/* get user name*/
  const [UserName, setUsername] = useState("");
  const [data, setData] = useState({
    task: "",
    de: "",
    description: "",
    ddl: "",
    employe: "",
})
console.log(data)
function submit(e) {
    //const date =  new Date().toLocaleString();
    //console.log(date)
    e.preventDefault();
    axios.post('start-process', {

      task: data.task,
      de: data.de,
      description: data.description,
      ddl: data.ddl,
      employe:data.employe,

    },config)
        .then(res => {
          //  console.log(res.data)
            NotificationManager.success( "Tache ajouter avec succés" ,"success",2000 );
            setTimeout(function(){
              window.location.reload(false);
              setButtonPopup(false)
           }, 2500);
           
            
         
           

        })
        .catch(err => {
            NotificationManager.error("Verifier vos données", 'Error!');

           
        })
}
function handle(e) {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    setData(newdata)
    //console.log(newdata)
}

  const config ={
    headers:{
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  useEffect(() => {
    const getCurrentUse = () => {
      const id = AuthService.getCurrentUser();

      axios.get('user/' + id,config).then(
        res => {
         // console.log(res.data.appUserRole);
          localStorage.setItem('Role', res.data.appUserRole);
          setUsername(res.data.firstName)
        },
        err => {
          console.log(err)
        }
      )
    }
    getCurrentUse()
  }, [])

/*logout function*/
  const history = useHistory();
  const [buttonPopup, setButtonPopup] = useState(false);
  function logout() {
    localStorage.clear();
    history.push('/login')
    window.location.reload();
    
  }

  return (


    
    <nav className="navbar" >
      <div className="navbar__left">
      {localStorage.getItem('token') ?
           <>
        <a href="/MesFichiers">Mes fichiers</a>
        <a href="/FichiersPublics">Fichiers publics</a>
        <a className="active_link" href="#" onClick={() => setButtonPopup(true)}>Créer Tâches </a>
          
          </>
          : 
        
          <div></div>
          
          }
          
        
      </div>
      <div className="navbar__right">
        {localStorage.getItem('token') ?
           <>
            
             <a href="/profile">
              <img width="30" src={avatar} alt="avatar" />
            </a> 
            
            <ReactBootstrap.NavDropdown title={UserName} id="nav-dropdown">
        <ReactBootstrap.NavDropdown.Item eventKey="4.1" onClick={logout}>Déconnexion</ReactBootstrap.NavDropdown.Item>
       
      </ReactBootstrap.NavDropdown>
      <a href="/addUser">
            <button type="button" className="btn btn-info"><i className="fas fa-user-plus"></i> Ajouter utilisateur</button>
               </a>
            </>

          :
          <a href="/login">
          <button type="button" className="btn btn-info"><i className="fas fa-sign-in-alt"></i> Se onnecter</button>
             </a>
        }

       
      
       
       

      </div>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
              <div className="row">
              <img src={image} style={{ width: "10%" }}/>
                <h3 style={{marginLeft:"5%" ,marginTop:"2%"}}>Créer Tâche</h3>
                
              </div>
              <hr></hr>
              <div className="d-flex justify-content-around">
              <form onSubmit={(e) => submit(e)}>
                      
                        <br></br>

                        <div className="row">
                            <div className="col">
                                <label>Task</label>
                                <input type="text" className="form-control" placeholder="task" required aria-label="task" onChange={(e) => handle(e)} id="task" value={data.task} />
                            </div>
                            <div className="col">
                                <label>De</label>
                                <input type="date" className="form-control" placeholder="de" required aria-label="de" onChange={(e) => handle(e)} id="de" value={data.de} />
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col">
                                <label>Description</label>
                                <input type="text" className="form-control" placeholder="Description" required aria-label="Description" onChange={(e) => handle(e)} id="description" value={data.description} />
                            </div>
                            <div className="col">
                                <label>Date limite</label>
                                <input type="date" className="form-control" placeholder="ddl" required aria-label="ddl" onChange={(e) => handle(e)} id="ddl" value={data.ddl} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label>Employé</label>
                                <input type="text" className="form-control" placeholder="employe" required aria-label="employe" onChange={(e) => handle(e)} id="employe" value={data.employe} />
                            </div>
                       </div>
                 
                        <br></br>
                        <button className="btn btn-info btn-block">Créer</button>
                    </form>


              </div>



            </Popup>
     
    </nav>
  
 
    );
};

export default Navbar;