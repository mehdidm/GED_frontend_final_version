
import React, { useState, useEffect } from 'react'
import axios from "axios";



function Azer  () {
    const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }};
    const [posts, setposts] = useState();
    useEffect(
        () => {
            axios.get('users')
                .then(res => {
                    console.log(res.data);
                    setposts(res.data);
                    
                })
        }, []);
        
        function deleteUser(id){
           
            axios.delete(`users/${id}`,config)
                .then(res => {
                  console.log(res)
                    
                })
      
        };
    return (  
        <div>
          {
              !posts ? ("No data"):(
                <table className='table'>
                    <thead className="thead-light">
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Role</th>
                           < th>Tel</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((user, index) => (
                            <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.image}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                             
                                <td>{user.appUserRole}</td>
                                <td>{user.numtel}</td>
                                <td>
                                    <button type="button" className="btn btn-danger" onClick={()=>{deleteUser(user.id)}} >delete</button>
                                  
                              </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )
          }
        </div>
    );
}
 
export default Azer;



