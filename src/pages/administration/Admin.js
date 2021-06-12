import React, { useState, useEffect } from 'react'
import './Admin.css'
import axios from "axios";
import Users from '../../components/dataTable/users';
import Administrateur from '../../components/dataTable/Administrateur';
import Controleurs from '../../components/dataTable/Admin_Contr';

import ReactNotification , {store} from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'



require("es6-promise").polyfill()
require("isomorphic-fetch");


export default function Admin() {
    
    const [q, setQ] = useState("");
  function search(rows){
      return rows.filter(row => row.firstName.toLowerCase().indexOf(q)>-1)
  }

    return (
        <div>


{ localStorage.getItem('Role')=="INGENIEUR"  ?
  
            <div>
                <Users></Users>
                
            </div>
:
""
}
{ localStorage.getItem('Role')=="SUPERVISEUR"  ?
  
            <div>
                <Controleurs></Controleurs>
                
            </div>
:

""
}
{ localStorage.getItem('Role')=="CONTROLEUR"  ?
  
            <div>
                <Administrateur></Administrateur>
                
            </div>
:

          ""
}
        </div>

    )

}


