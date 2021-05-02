import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router, Switch , Route , Link } from 'react-router-dom';
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
    <Route path="/"   exact component={Home}/>
    <Route path="/files"   component={Files}/>
    <Route path="/update"   component={Update}/>
    <Route path="/profile"   component={Profil}/>
            </>
   
          :
        
        <>  
    <Route path="/"   exact component={Home}/>    
    <Route path="/reset"    component={Reset}/>    
    <Route path="/login"   component={Login}/>
    <Route path="/Redirict"   component={Redirect}/>
    <Route path="/red_email"   component={Redirect_email}/>
    </>
        }
 
    
  
    </Switch>
  </div>
</div>
    </Router>
  );
}

export default App;