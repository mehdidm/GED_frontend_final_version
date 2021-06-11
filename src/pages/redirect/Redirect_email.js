import axios from "axios";
import { Component } from "react";
import { Container } from "react-bootstrap";


export default class Redirect_email extends Component{
  
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
              <form onSubmit={this.handelforgot}> 
            <h3>Saisir votre email</h3>
            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Email" onChange={e =>this.username = e.target.value}/>
                
            </div>
          
            <button className="btn btn-primary btn-block">Reset</button>
            
            </form>
            
         </Container>
          
        )
    }


      }