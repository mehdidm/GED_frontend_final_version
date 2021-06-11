
import axios from "axios";
import Card from "react-bootstrap/Card";
import"./Groupe.css";
import Popup from "../../components/popup/PopUp";
import React, { useState, useEffect, useCallback } from 'react';
import { NotificationManager } from 'react-notifications';
import { useHistory ,useLocation, Link} from "react-router-dom"
export default function UpdateGroupe() {
    
    const location = useLocation();
    const id = location.state.id;
    const history = useHistory();
    const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
    console.log(id)
    const [data, setData] = useState({
        name: "",
    

    })
    function submit(e) {
        //const date =  new Date().toLocaleString();
        //console.log(date)
        e.preventDefault();
        axios.put(`groupe/${id}`, {

            name: data.name,
        

        },config)
            .then(res => {
                console.log(res.data)
                NotificationManager.success( "Groupe ajouter avec succés" ,"succés",2000 );
                history.push("/groupes");
            

            })
            .catch(err => {
                NotificationManager.error("Verifier vos données", 'Error!');
    
               
            })
    }
    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }

  
    return (
        <div className="groupCard">
                   <Card>
              
              
              
              <div className="d-flex justify-content-around">
              <form onSubmit={(e) => submit(e)}>
             <div className="row" style={{marginTop:"20%"}}>
             
             <h2>Modifier le nom du Groupe</h2>
        
                 </div> 
                        <br></br>

                        <div className="row">
                            <div className="col">
                                <label>Nom du Groupe</label>
                                <input type="text" required className="form-control" placeholder=" Nom du Groupe" aria-label="First name" onChange={(e) => handle(e)} id="name" value={data.name} />
                            </div>
                           
                        </div>
                        <br></br>
                    
                        <button className="btn btn-info btn-block">Modifier</button>
                    </form>

              </div>



              <div className="go-left" >
                <div className="go-ar">
                <i className="fas fa-wrench"></i>
             </div>
              </div>
     
        </Card>
  
        </div>
   )
}
