import axios from "axios";
import { Component } from "react";
import { Container } from "react-bootstrap";
import logo from "../../assets/avatar1.png"
import './login.css'

export default class Auth extends Component {

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            username: this.username,
            password: this.password
        }
        axios.post('authenticate', data)

            .then(res => {

                localStorage.setItem('token', res.data.token);
                localStorage.setItem('id', res.data.id);
                console.log(res)
                if (res.status === 200) {

                    this.props.history.push("/");
                    window.location.reload();
                }

            })
            .catch(err => {
                alert(err)
            })
    };
    handelforgot = e => {
        e.preventDefault();
        const data = {
            email: this.username,

        }
        axios.post('forgot-password', data)

            .then(res => {
                console.log(res)
                localStorage.setItem('password', res.data);


                if (res.status === 200) {

                    this.props.history.push("/Redirict");
                    window.location.reload();
                }

            })
            .catch(err => {
                alert(err)
            })
    };

    render() {
        return (


            <div style={{ margin: "5% 20%" }}>
                <div className="row main-content bg-success text-center">
                    <div className="col-md-4 text-center company__info">
                        <span className="company__logo"><img src={logo} style={{ width: "80%" }}></img></span>
                        <h4 className="company_title">Bienvenue !</h4>
                    </div>
                    <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
                        <div className="container">
                          
                            <div className="row">
                                <form onSubmit={this.handleSubmit} style={{ margin: "5% 20%", width: "100%" }}>
                                    <h2>Se connecter</h2>
                                    <div className="form-group">
                                        <div className="row">
                                            <input type="text" name="username" id="username" className="form__input" placeholder="Username" onChange={e => this.username = e.target.value} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <input type="password" className="form__input" name="password" placeholder="Password" onChange={e => this.password = e.target.value} />
                                        </div>
                                    </div>
                                    <button className="btn_form  btn-block ">Se connecter</button>
                                    <div className="row" style={{ margin: "5% 20%" }}>
                                        <p>Mot de passe oublier ? <a href="/red_email"> cliquer ici</a></p>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        )
    }


}