import React, { useState, useEffect } from 'react'
import './Admin.css'
import axios from "axios";
import Users from '../../components/dataTable/users';





require("es6-promise").polyfill()
require("isomorphic-fetch");


export default function Admin() {
    const [data, setData] = useState([])
    const [q, setQ] = useState("");
  function search(rows){
      return rows.filter(row => row.firstName.toLowerCase().indexOf(q)>-1)
  }

    return (
        <div>
            
            <div>
                <Users></Users>

            </div>
        </div>

    )

}


