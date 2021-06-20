import axios from "axios";
import React, { useState, useEffect } from 'react'
import Card from "react-bootstrap/Card";
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';
import image from "../../assets/completed-task.png"
import { useHistory, useLocation, Link } from "react-router-dom";
import User from "../../services/UserName";
import ReactPaginate from "react-paginate";
export default function TaskUser() {

    const config = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }
    const [Tasks, setTasks] = useState([]);
    const location = useLocation();
    const num =location.state.num;
    console.log(num)
    const [pageNumber, setPageNumber] = useState(0);
    const archivePerPage = 5;
    const pagesVisited = pageNumber * archivePerPage;
    const pageCount = Math.ceil(Tasks.length / archivePerPage);
    const changePage = ({ selected }) => { setPageNumber(selected); };
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const getCurrentUse = () => {


            axios.get(`/get-task/`+ num, config).then(
                res => {
                    console.log(res.data);
                    setTasks(res.data)
                },
                err => {
                    console.log(err)
                }
            )
        }
        getCurrentUse()
    }, [])
    function Done(id){
      axios.get(`complete-task/${id}` ,config).then(
        res => {
          //console.log(res);
          console.log(res.data)
          NotificationManager.success( "Tache terminé" ,"success",2000 );
          
          setTimeout(function(){
            window.location.reload(false);
         }, 2500);
         
        },
        err => {
          console.log(err)
            NotificationManager.error("Process invalide", 'Error!');
    
        }
      )
    }
    return (
        <div> {Tasks.length === 0? 
 <>
  <Card><h1>Pas de Taches</h1></Card>
   </> 
 :
<> 
         <div >
         <input
            type="text"
            className="form-control"
            placeholder="Rechercher ..."
            style={{ width: "30%" , margin:"25px"}}
            onChange={event => {
              setSearchTerm(event.target.value)
            }} />
         <Card><div className="d-flex justify-content-center">
         <i className="far fa-clipboard  fa-3x" style={{marginRight:"5px"}}></i><h1 style={{marginRight:"5px"}}>Employé : </h1>
         <p style={{fontSize:"210%"}}><User Nom={num} ></User> </p>
         </div>
         </Card>
      <div className="containerCard" >


        {Tasks
        .filter((val)=>{
          if (searchTerm == ""){
            //console.log(Object.values(val)[1].task)
            return val
            
          }
          
          else if (Object.values(val)[1].task.toLowerCase().includes(searchTerm.toLowerCase())){
           
            return val
          
          }
        })
        .slice(pagesVisited, pagesVisited + archivePerPage)
        .map((task, index) => {
          // play here....
         console.log(Object.values(task));

          return (

            <Card className="card1" key={index} >
              <div >
                <img src={image} style={{ width: "15%" }} />
                <div>
                  <div className="titleCard">
                    {Object.values(task)[4].task}
                  </div>
                  <hr style={{ width: "55%" }}></hr>


                  <p>{Object.values(task)[4].ddl}</p>
                  {console.log(Object.values(task)[4].de)}
                  <p >{Object.values(task)[4].de}</p>
                  <br></br>
                  <p>{Object.values(task)[4].description}</p>


                </div>
              </div>

              <div className="go-corner" >
                <div className="go-arrow">
                  →
             </div>
              </div>
              <div className="cardUser">
                <p className="d-flex justify-content-center ">
                  <i className="fas fa-user-clock " style={{ marginTop: "4px" ,marginRight: "4px" }}></i>
                  <span style={{ fontWeight: "800" ,marginRight: "4px"}}>Employé:</span>
                  <User Nom={Object.values(task)[4].employe}></User>
                </p>
              </div>
              <div className="DoneButton btn btn-info" onClick={() =>Done(Object.values(task)[2]) }>
         
              <i className="fas fa-check"></i>
              </div>
            </Card>


          );


        })
        }


      </div>
    </div>

</>
  }
  <br></br>
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


    )
}
