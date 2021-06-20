import React, { useState, useEffect } from 'react'
import './Admin.css'
import axios from "axios";
import Users from '../../components/dataTable/All';
import Administrateur from '../../components/dataTable/Administrateur';
import Controleurs from '../../components/dataTable/Admin_Contr';
import ReactPaginate from "react-paginate";
import ReactNotification , {store} from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'



export default function Admin() {


    return (
        <div>


{ localStorage.getItem('Role')=="INGENIEUR"  ?
  
            <div>
                <Users val={2}></Users>
                
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


