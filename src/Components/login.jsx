import React from "react";
import Card from "@material-ui/core/Card";
import "../CSS/login.css";
import { TextField, Button, Snackbar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import auth from "../Authguard/auth";
import FundooService from "../Services/fundooService";
let service = new FundooService();

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      email: "",
      password: "",
      snackbarOpen: false,
      snackbarMsg: "",
    };
  }
  handleChangeText = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  snackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };
  submitUserSignInForm = () => {
    if (this.state.email === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Email is Required",
      });
    } else if (
      !/^[a-zA-Z0-9]{1,}([.]?[-]?[+]?[a-zA-Z0-9]{1,})?[@]{1}[a-zA-Z0-9]{1,}[.]{1}[a-z]{2,3}([.]?[a-z]{2})?$/.test(this.state.email)
    ) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Invalid Email..!",
      });
    } else if (this.state.password === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Password is required",
      });
    } else if (!/^[a-zA-Z0-9]*[@#$&*_+-]{1}[a-zA-Z0-9]*$/.test(this.state.password)) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Invalid Password..!!",
      });
    } else {
      const user = {
        email: this.state.email,
        password: this.state.password,
      };
      service
        .Login(user)
        .then((json) => {
          console.log("responce data==>", json);
          if (json.status === 200) {
            localStorage.setItem('Token', json.data.id);
            localStorage.setItem("FirstName", json.data.firstName);
            localStorage.setItem("LastName", json.data.lastName);
            localStorage.setItem("Email", json.data.email);
            this.setState({
              snackbarOpen: true,
              snackbarMsg: "Login Suceesful..!",
            });
            auth.login();
                    if(auth.isAuthenticated){
                        setTimeout(() => {
							this.props.history.push("/dashboard/notes");
						}, 200);
                    }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      <Card className="loginbox" variant="outlined">
        <div className="loginfundoofont" align="center">
          <span class="f">F</span>
          <span class="u">u</span>
          <span class="n">n</span>
          <span class="d">d</span>
          <span class="o">o</span>
          <span class="oo">o</span>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.snackbarOpen}
          autoHideDuration={6000}
          onClose={this.snackbarClose}
          message={<span class="Snackbar">{this.state.snackbarMsg}</span>}
          action={
            <IconButton
              key="close"
              arial-label="close"
              color="inherit"
              onClick={this.snackbarClose}
            ></IconButton>
          }
        />
        <span class="signIn">Sign in</span>
        <br></br>
        <div className="usernameLogin">
          <TextField
            margin="dense"
            size="medium"
            name="email"
            type="email"
            id="outlined-required"
            label={<div class="email">Email</div>}
            variant="outlined"
            style={{ width: "80%" }}
            inputProps={{ style: { fontSize: "18px" } }}
            onChange={this.handleChangeText}
            value={this.state.email}
          />
        </div>
        <br></br>
        <div className="passwordLogin">
          <TextField
            style={{ width: "80%" }}
            size="medium"
            margin="dense"
            id="outlined-adornment-password"
            variant="outlined"
            name="password"
            type={this.state.showPassword ? "text" : "password"}
            label={<div class="email">Password</div>}
            onChange={this.handleChangeText}
            value={this.state.password}
            inputProps={{ style: { fontSize: "18px" } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sytle={{ width: "1px" }}>
                  <IconButton
                    onClick={() =>
                      this.setState({ showPassword: !this.state.showPassword })
                    }
                  >
                    {this.state.showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="Forgotpassword">
          <Button
            onClick={() => this.props.history.push("/forgotpassword")}
            style={{
              textTransform: "lowercase",
              color: "#0423ce",
              fontSize: "13px",
            }}
          >
            Forgot Password?
          </Button>
        </div>
        <div className="buttonLogin">
          <Button
            style={{
              width: "150px",
              padding: "7px 0px",
              color: "#0423ce",
              fontSize: "15px",
            }}
            onClick={() => this.props.history.push("/register")}
          >
            Create account
          </Button>
          <Button
            className="button-Login"
            variant="contained"
            color="primary"
            style={{ width: "90px", padding: "7px 0px", fontSize: "12px" }}
            onClick={this.submitUserSignInForm}
          >
            Login
          </Button>
        </div>
      </Card>
    );
  }
}
export default Login;