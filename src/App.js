import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/home/home';
import { Container } from 'react-bootstrap';
import Login from './pages/login/login';
import Files from './pages/fetching_files/Fetching_files'
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








function App() {
  return (
    <Router>

      <div id='Container'>
        <div>
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
                <Route path="/" exact component={Home} />
                <Route path="/files" component={Files} />
                <Route path="/update" component={Update} />
                <Route path="/archive" component={Archive} />
                <Route path="/profile" component={Profil} />
                <Route path="/addDossier" component={AddDossier} />
                <Route path="/Administration" component={Admin} />
                <Route path="/addUser" component={AddUser} />
                <Route path="/groupes" component={Groupes} />
                <Route path="/updateUser" component={UpdateUser} />
                <Route path="/Archive_contenu" component={Archive_Contenu} />
                <Route path="/AddGroupe" component={AddGroupe} />
                <Route path="/MesFichiers" component={MesFichiers} />
                <Route path="/FichiersPublics" component={FichiersPublics} />
                <Route path="/FichierGroupe" component={FichierGroupe} />
                <Route path="/ListeVersions" component={ListeVersions} />
                <Route path="/GroupeUsers" component={GroupeUsers} />
           
              </>

              :

              <>
                <Route path="/" exact component={Home} />
                <Route path="/reset" component={Reset} />
                <Route path="/login" component={Login} />
                <Route path="/Redirict" component={Redirect} />
                <Route path="/red_email" component={Redirect_email} />
                <Route path="/log" component={log} />


              </>
            }



          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;