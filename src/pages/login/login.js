import axios from "axios";
import { Component } from "react";
import { Container } from "react-bootstrap";
import './login.css'

export default class Auth extends Component{
  
    handleSubmit = e =>{
        e.preventDefault();
        const data ={
            username : this.username,
            password:this.password
        }
        axios.post('authenticate', data)
        
        .then(res => {
           
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('id', res.data.id);
            console.log(res)
           if (res.status===200) {
            
          this.props.history.push("/");
            window.location.reload();
           }
          
        })
        .catch(err =>{
            alert(err)
        })
    };
    handelforgot = e =>{
        e.preventDefault();
        const data ={
            email : this.username,
       
        }
        axios.post('forgot-password', data)
        
        .then(res => {
            console.log(res)
            localStorage.setItem('password', res.data);
          
            
           if (res.status===200) {
            
          this.props.history.push("/Redirict");
            window.location.reload();
           }
          
        })
        .catch(err =>{
            alert(err)
        })
    };
 
    render(){
        return(
         <Container style={{marginTop: 10 + 'em'}}>
              <form onSubmit={this.handleSubmit}> 
            <h3>Login</h3>
            <div className="form-group">
                <label>Usernamee</label>
                <input type="email" className="form-control" placeholder="Email" onChange={e =>this.username = e.target.value}/>
                
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Password" onChange={e =>this.password = e.target.value}/>
                
            </div>
            <button className="btn btn-primary btn-block">Login</button>
            <b><a className="l" href="/red_email">Mot de passe oublier ?</a></b>
            </form>
            
         </Container>
          
        )
    }


      }