import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/home/home';
import { Container } from 'react-bootstrap';
import Login from './pages/login/login';

import Profil from './pages/profil/profil'

import Update from './pages/update_profile/Update_profile';
import Redirect_email from './pages/redirect/Redirect_email';
import Redirect from './pages/redirect/Redirect';
import Reset from './pages/redirect/Reset';
import Archive from './pages/archive/Archive';

import Admin from './pages/administration/Admin';
import AddUser from './pages/administration/Add_user';

import UpdateUser from './pages/administration/UpdateUser';
import Archive_Contenu from './pages/archive/Archive_contenu';
import AddDossier from './pages/archive/Add_dossier';
import log from './pages/login/test-log';
import Groupes from './pages/groupe/Groupes';
import AddGroupe from './pages/groupe/AddGroupe';
import MesFichiers from './pages/fetching_files/MesFichiers';
import FichiersPublics from './pages/fetching_files/FichiersPublic';
import FichierGroupe from './pages/groupe/FichierGroupes';
import GroupeUsers from './pages/groupe/GroupeUsers';
import ListeVersions from './pages/fetching_files/ListeDesVersions';
import Chat from './pages/chat.js/Chat';
import React from "react";
// React Notification
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import Tasks from './pages/workflow/Tasks';
import TaskUser from './pages/workflow/TaskUser';
import UpdateGroupe from './pages/groupe/UpdateGroupe';
import MyGroupes from './pages/groupe/MyGroupes';



export const AppContext = React.createContext();

const App = (props) => {
  return (
    <Router>

      <div id='Container' >
        <div  >
          {localStorage.getItem('token') ?
            <>
              <Sidebar></Sidebar>
            </>

            :
            <div></div>
          }



        </div>
        <div className="c1">
          <Navbar></Navbar>
          <Switch>
            {localStorage.getItem('token') ?
              <>
                <Route path="/" exact component={Home} exact />
                
                <Route path="/update" component={Update}exact />
                <Route path="/archive" component={Archive}  exact/>
                <Route path="/profile" component={Profil} exact/>
                <Route path="/addDossier" component={AddDossier} exact/>
                <Route path="/Administration" component={Admin} exact/>
                <Route path="/addUser" component={AddUser} exact/>
                <Route path="/groupes" component={Groupes} exact/>
                <Route path="/updateUser" component={UpdateUser} />
                <Route path="/Archive_contenu" component={Archive_Contenu} />
                <Route path="/AddGroupe" component={AddGroupe} exact/>
                <Route path="/MesFichiers" component={MesFichiers} exact/>
                <Route path="/FichiersPublics" component={FichiersPublics} exact/>
                <Route path="/FichierGroupe" component={FichierGroupe} />
                <Route path="/ListeVersions" component={ListeVersions} />
                <Route path="/GroupeUsers" component={GroupeUsers} />
                <Route exact path="/chat" render={(props) => <Chat {...props} />} />
                <Route exact path="/Tasks"  component={Tasks}  />
                <Route exact path="/TasksUser"  component={TaskUser}  />
                <Route exact path="/UpdateGroupe"  component={UpdateGroupe} />
                <Route exact path="/mesGroupes"  component={MyGroupes} />
                
                
           
              </>

              :

              <>
                <Route path="/" exact component={Home} exact/>
                <Route path="/reset" component={Reset} exact/>
                <Route path="/login" component={Login} exact/>
                <Route path="/Redirict" component={Redirect} exact/>
                <Route path="/red_email" component={Redirect_email} exact/>
                <Route path="/log" component={log} exact/>


              </>
            }



          </Switch>
        </div>
        <NotificationContainer />
      </div>
    </Router>
  );
}

export default App;