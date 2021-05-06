
import axios from "axios";
import React, { useState, useEffect } from 'react'
import _, { initial, slice } from 'lodash'

const pageSize = 2;
export default function Users() {
    const [users, setData] = useState();
    const [q, setQ] = useState("");
    const [paginated, setpaginated] = useState();
    const [currentPage, setcurrentPage] = useState(1)
    useEffect(
        () => {
            axios.get('users')
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
            row.firstName.toLowerCase().indexOf(q) > -1 ||
            row.lastName.toLowerCase().indexOf(q) > -1 ||
            row.email.toLowerCase().indexOf(q) > -1 ||
            row.numtel.toLowerCase().indexOf(q) > -1 ||
            row.appUserRole.toLowerCase().indexOf(q) > -1
            ) ;
    }
    //End filter function//
    return (
        <div>

            <div>
                <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            {  !paginated ? ("No data found") : (
                <table className='table'>
                    <thead className="thead-light">
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Tel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {search(paginated).map((user, index) => (
                            <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.image}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>

                                <td>{user.appUserRole}</td>
                                <td>{user.numtel}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            }

            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {
                        pages.map((page) => (
                            <li className={
                                page === currentPage ? "page-item active" : "page-item"
                            }>
                                <p className="page-link"
                                    onClick={() => pagination(page)}>{page}</p>
                            </li>
                        ))
                    }

                </ul>
            </nav>
        </div>

    )


}