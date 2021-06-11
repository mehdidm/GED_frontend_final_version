
import axios from "axios";
import React, { useState, useEffect } from 'react'

import _, { initial, slice } from 'lodash'
import hello from "../../assets/avatar.png";
import { useHistory, Link } from "react-router-dom";

import 'animate.css'
import Popup from "../../components/popup/PopUp";
import { NotificationManager } from 'react-notifications';
import TaskUser from "../../pages/workflow/TaskUser"
const pageSize = 1;
export default function Users() {
    const history = useHistory();
    const  history_task = useHistory();
    
    const config = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    };
    const [users, setData] = useState();
    const [q, setQ] = useState("");
    const [paginated, setpaginated] = useState();
    const [currentPage, setcurrentPage] = useState(1)
    const [task, setTask] = useState({
        task: "",
        de: "",
        description: "",
        ddl: "",
        employe: "",
    })
    //console.log(task)
    const [buttonPopup, setButtonPopup] = useState(false);
    function submit(e) {
        //const date =  new Date().toLocaleString();
        //console.log(date)
        e.preventDefault();
        axios.post('start-process', {
    
          task: task.task,
          de: task.de,
          description: task.description,
          ddl: task.ddl,
          employe:task.employe,
    
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
        const newdata = { ...task }
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }
    
    useEffect(
        () => {
            axios.get('users', config)
                .then(res => {
                    console.log(res.data);
                    setData(res.data);
                    setpaginated(_(res.data).slice(0).take(pageSize).value());
                })
        }, []);
    const pageCount = users ? Math.ceil(users.length / pageSize) : 0;
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1)
    const pagination = (pageNo) => {
        setcurrentPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        const paginated = _(users).slice(startIndex).take(pageSize).value();
        setpaginated(paginated)
    }
    //filter function//
    function search(rows) {
        return rows.filter(
            (row) =>
                row.firstName.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
                row.lastName.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
                row.email.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
                row.numtel.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
                row.appUserRole.toLowerCase().indexOf(q.toLowerCase()) > -1
        );
    }
    //End filter function//
    //Update function//

    function Update(id) {

        console.log(id)
        history.push({
            pathname: '/updateUser/' + id,
            state: {  // location state
                id: id,
            },
        })
    }
    //Update function//
    //DELETE function//

    function deleteUser(id) {
      

        if (window.confirm('Etes vous sur de vouloir supprimer cet utilisateur?')) {
            axios.delete(`users/${id}`, config)
                .then(res => {
                    console.log(res.data)
                    // window.location.reload(false)
                    NotificationManager.error('Utilisateur supprimé avec succés', 'Supprimé!',2000);
                    setTimeout(function () {
                        window.location.reload(false);
                    }, 2100);
                    

                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    //DELETE function//
    //function to send iddossier to userTask page//
  function Contenu(num) {
    history_task.push({
      pathname: '/TasksUser',
      state: {  // location state
        num: num,
      },
    })
  }
    return (
        <div >

            
            <input className="form-control" placeholder="Chercher ..." style={{ marginTop: 50, marginLeft: 10, marginBottom: 20, width: "20%" }} type="text" value={q} onChange={(e) => setQ(e.target.value)} />

            {  !paginated ? ("No data found") : (
                <table className='table'>
                    <thead className="thead-light">
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Prenom</th>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Role</th>
                            < th>Tel</th>
                            <th>Groupes</th>
                            <th>Delete</th>
                            <th>Modifier</th>
                            <th>Taches</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.id}</td>

                                <td>
                                    {user.image ?
                                        <img className="rounded-image" src={`data:image/jpeg;base64,${user.image}`} />
                                        :
                                        <img className="rounded-image" src={hello} />
                                    }
                                </td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.appUserRole}</td>
                                <td>{user.numtel}</td>

                                <td><Groupes id={user.id}></Groupes></td>

                                <td>
                                    <button type="button" className="btn btn-danger" onClick={() => { deleteUser(user.id) }} ><i className="fas fa-trash-alt"></i></button>
                                </td>
                                <td> 
                                     <button type="button" className="btn " style={{backgroundColor:"#00838d"}} onClick={() => Update(user.id)}><i className="fa fa-edit"  style={{color:"#fff"}}aria-hidden="true" ></i></button>

                                </td>
                                <td>
                               <div className="d-flex justify-content-around">
                               <button type="button" className="btn" style={{backgroundColor:"#00838d"}}onClick={() => Contenu(user.id)} ><i className="fas fa-eye" style={{color:"#fff"}}></i></button>
                                   
                                   
                                   <button type="button" style={{backgroundColor:"#00838d"}} className="btn" onClick={() => setButtonPopup(true)}><i className="fas fa-clipboard" style={{color:"#fff"}} aria-hidden="true" ></i></button>

            
                               </div>
                                                      </td>

                            </tr>
                        ))}
                    </tbody>

                </table>

            )
            }
    <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
              <div className="row">
                <h3 style={{marginLeft:"5%"}}>Créer Tâche</h3>
              </div>
              <hr></hr>
              <div className="d-flex justify-content-around">
              <form onSubmit={(e) => submit(e)}>
                      
                        <br></br>

                        <div className="row">
                            <div className="col">
                                <label>Task</label>
                                <input type="text" className="form-control" placeholder="task" required aria-label="task" onChange={(e) => handle(e)} id="task" value={task.task} />
                            </div>
                            <div className="col">
                                <label>de</label>
                                <input type="date" className="form-control" placeholder="de" required aria-label="de" onChange={(e) => handle(e)} id="de" value={task.de} />
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col">
                                <label>Description</label>
                                <input type="text" className="form-control" placeholder="Description" required aria-label="Description" onChange={(e) => handle(e)} id="description" value={task.description} />
                            </div>
                            <div className="col">
                                <label>ddl</label>
                                <input type="date" className="form-control" placeholder="ddl" required aria-label="ddl" onChange={(e) => handle(e)} id="ddl" value={task.ddl} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label> employe</label>
                                <input type="text" className="form-control" placeholder="employe" required aria-label="employe" onChange={(e) => handle(e)} id="employe" value={task.employe} />
                            </div>
                       </div>
                 
                        <br></br>
                        <button className="btn btn-primary btn-block">Créer</button>
                    </form>


              </div>



            </Popup>
     

        </div>

    )


}
export function Groupes({ id }) {
    const config = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }
    const [groupes, setGroupes] = useState([])
    useEffect(() => {
        axios.get(`userGroupes/${id}`, config)
            .then(res => {
                console.log(res.data)
                setGroupes(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <div>

            { groupes.map(groupe => <li>{groupe[1]}</li>)}

        </div>

    )
}

