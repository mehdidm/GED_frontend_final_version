import axios from "axios";
import { Component } from "react";
import { Container } from "react-bootstrap";


export default class Reset extends Component{
  
    handleSubmit = e =>{
        e.preventDefault();
        const path= localStorage.getItem('password')
        console.log(path)
        const data ={
          
            password:this.password,
            
        }
        axios.put('reset-password/'+ path, data)
        
        .then(res => {
        
            
            
            console.log(res)
           if (res.status===200) {
            alert('succes')
          this.props.history.push("/");
            
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
            <h3>Reset Password</h3>
            <div className="form-group">
                <label>Password1</label>
                <input type="password" className="form-control" placeholder="Password" onChange={e =>this.password = e.target.value}/>
         </div>
       
          
            <button className="btn btn-primary btn-block">Reset</button>
            
            </form>
            
         </Container>
          
        )
    }


      }