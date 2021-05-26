
import axios from "axios";
import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import _, { initial, slice } from 'lodash'
import hello from "../../assets/avatar.png";

const pageSize = 1;
export default function Users() {
    const history = useHistory();
    const config = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    };
    const [users, setData] = useState();
    const [q, setQ] = useState("");
    const [paginated, setpaginated] = useState();
    const [currentPage, setcurrentPage] = useState(1)
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
                    window.location.reload(false)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    //DELETE function//
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
                                
                                <td><Groupes id ={user.id}></Groupes></td>
                              
                                <td>
                                    <button type="button" className="btn btn-danger" onClick={() => { deleteUser(user.id) }} ><i className="fa fa-ban" aria-hidden="true" ></i></button>
                                </td><td>  <button type="button" className="btn btn-primary" onClick={() => Update(user.id)}><i className="fa fa-edit" aria-hidden="true" ></i></button>

                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            }

           
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