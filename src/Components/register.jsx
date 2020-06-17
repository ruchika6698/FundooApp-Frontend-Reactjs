import React from "react";
import "../CSS/register.css";
import account from "../Assets/account.svg";
import { TextField, Button ,Snackbar} from '@material-ui/core'
import Card from '@material-ui/core/Card';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
import FundooService from '../Services/fundooService'
let service = new FundooService()

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      showPassword: false,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      confirmPassword: "",
      service:"",
      snackbarOpen: false,
      snackbarMsg: "",
    }
  } 
 handleChangeText = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => console.log(this.state, '------>name'))
    }
  snackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };
 
    submitUserSignInForm = () => {
       if (this.state.email === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Email is Required"
      });
    } else if (
      !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email)
    ) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Invalid email..!"
      });
    } else if (this.state.password.length < 8) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "password must be of atleast 8 characters long..!"
      });
    } else {
      //navigate to controller
      const user = {
        email: this.state.email,
        password: this.state.password
      };
      service.login(user).then((json)=>{
            console.log("responce data==>",json);
            if(json.status===200){  
            this.setState({
                snackbarOpen: true,
                snackbarMsg: "Login Suceesful..!"
             }); 
        }
        }).catch((err)=>{
            console.log(err);
        })
        this.props.history.push("/dashboard");
    }
  };

  render() 
  {
  return (
    <Card className="root" variant="outlined">
      <div className='fundoofont' align="center">
          <span class="f">F</span>
          <span class="u">u</span>
          <span class="n">n</span>
          <span class="d">d</span>
          <span class="o">o</span>
          <span class="oo">o</span>
      </div>
      <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              open={this.state.snackbarOpen}
              autoHideDuration={6000}
              onClose={this.snackbarClose}
              message={<span id="messege-id"> {this.state.snackbarMsg}</span>}
              action={[
                <IconButton
                  key="close"
                  arial-label="close"
                  color='inherit'
                  onClick={this.snackbarClose}
                >
                </IconButton>
              ]}
            />
      <p className='text'>Create your Fundoo Account</p>
      <p className='continue'>Continue to Fundoo</p>
      <div class="main">
        <div class="input">
          <div className='flname'>
            <TextField
              className='name'
              variant='outlined'
              label={ <div class="password">First name</div>}
              margin="dense"
              size="medium"
              style={{ width: "48%" }}
              inputProps={{style:{ fontSize:'16px'}}}
              defaultValue={this.state.firstName}
              onChange={this.handleChangeText}
            />
            <span>


            </span>
            <TextField
              className='name'
              variant='outlined'
              label={ <div class="password">Last name</div>}
              margin="dense"
              size="medium"
              style={{ width: "48%" }}
              inputProps={{style:{ fontSize:'16px'}}}
              defaultValue={this.state.lastName}
              onChange={this.handleChangeText}
            />                  
          </div>
          <br/>
          <div id="pass">
            <TextField
              className='username'
              variant='outlined'
              label={ <div class="email">Email</div>}
              margin='dense'
              inputProps={{style:{ fontSize:'16px'}}}
              defaultValue={this.state.email}
              onChange={this.handleChangeText}
            />
          </div>
            <h1 className='usermailline'>Use my current email address instead</h1>
            <div className='confirmPass'>
              <TextField
                className='conPass'
                type={this.state.showPassword ? "text" : "password"}
                variant='outlined'
                label={ <div class="password">Password</div>}
                margin='dense'
                style={{ width: "48%" }}
                inputProps={{style:{ fontSize:'16px'}}}
                defaultValue={this.state.password}
                onChange={this.handleChangeText}
              />
              <span>

              </span>
              <TextField
                className='conPass'
                type={this.state.showPassword ? "text" : "password"}
                variant='outlined'
                label={ <div class="cpassword">Confirm Password</div>}
                margin='dense'
                style={{ width: "48%" }}
               defaultValue={this.state.confirmPassword}
                onChange={this.handleChangeText}
                inputProps={{style:{ fontSize:'16px'}}}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end" sytle={{ width: "1px" }}>
                            <IconButton
                                onClick={
                                    () => this.setState({ showPassword: !this.state.showPassword })
                                }
                            >
                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                            </InputAdornment>
                            )
                }}
              />
            </div>
              <h1 className='passline' >Use 8 or more characters with a mix of letters, numbers & symbols</h1>
            <div>
              <div className="service">
                <RadioGroup aria-label="service" name="service" value={this.state.value} onChange={this.handleChange}>
                  <h5>Service:</h5>
                 <div class="radio"> 
                  <FormControlLabel 
                    value="Basic"
                    control={<Radio color="primary" fontSize="17px" />}
                    label="Basic"
                    labelPlacement="end"
                   />
                  <FormControlLabel 
                    value="Advance"
                    control={<Radio color="primary" fontSize="17px" />}
                    label="Advance"
                  />
                </div>
                  </RadioGroup>
            </div>
          </div>
              <div className="signbutton">
                  <Button color="primary"
                    style={{ width:"150px",padding: "7px 0px",color:'#0423ce',fontSize:'13px'}} 
                    onClick={() => this.props.history.push('/')}>
                    Sign in instead
                  </Button>

                  <Button variant="contained"
                    style={{ width:"90px",padding: "7px 0px",fontSize:'12px'}} 
                    color="primary" 
                    onClick={this.submitUserSignInForm}>
                    Submit
                  </Button>
              </div>
        </div>
        <div>
            <img src={account} className='signimage' alt='fundooo'
                  width="244" height="244" ></img>
                <figcaption className='figcaption'>One account. All of Fundoo </figcaption>
                <figcaption className='figcaption'>working for you.</figcaption>
            </div>
      </div>

    </Card>
    );
  }
}