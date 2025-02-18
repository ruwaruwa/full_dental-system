
import PropTypes from 'prop-types'
import MetaTags from 'react-meta-tags';
import React from "react"
import './login.css'
import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap"
import Swal from 'sweetalert2';
// Redux
import { connect } from "react-redux"
import { withRouter, Link, useHistory } from "react-router-dom";
//import { ToastContainer, toast } from 'react-toastify"';
// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"
//import { useHistory } from 'react-router-dom';
// actions
import { loginUser, apiError } from "../../store/actions"
import axios from 'axios';
// import images
import logoSm from "../../assets/images/logo-sm.png";
//import { ToastContainer, toast } from 'react-toastify';
//import toastr from 'reactjs-toastr';
//import 'reactjs-toastr/lib/toast.css';
//import React, { useEffect } from 'react';

const Login = props => {
  
  const epiEndPoint = "http://localhost:2000";
  let history=useHistory()
  // handleValidSubmit
  const handleValidSubmit = async(event, values) => {
    // history.push("/dashboard")
   // console.log(values)
//event.preventDefualt()
    const{data}= await axios.post(`${epiEndPoint}/login`, values)
    console.log(data)
    const{status,message,token}=data
    if(status === 'Success'){
     // toastr.success(data.message);
     Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'successfuy loged',
      showConfirmButton: false,
   timer:1500})

      localStorage.setItem('token',token)
      history.push("/dashboard")
    }
    else{
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'error',
        showConfirmButton: false,
    timer:1500
      })
    
   } 
  }

  return (
    <div id='b' className='b'>

  
    <React.Fragment>
      <MetaTags>
        <title>Login | Veltrix - Responsive Bootstrap 5 Admin Dashboard</title>
      </MetaTags>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      {/* <ToastContainer/> */}
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={4}>
              <Card className="overflow-hidden">
                <div className="bg-primary">
                  <div className="text-primary text-center p-4">
                    <h5 className="text-white font-size-20">
                      Welcome Back !
                        </h5>
                    <p className="text-white-50">
                      Sign in to continue to Veltrix.
                        </p>
                    <Link to="/" className="logo logo-admin">
                      <img src={logoSm} height="24" alt="logo" />
                    </Link>
                  </div>
                </div>

                <CardBody className="p-4">
                  <div className="p-3">
                    <AvForm
                      className="form-horizontal mt-4"
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(e, v)
                      }}
                    >
                      {props.error && typeof props.error === "string" ? (
                        <Alert color="danger">{props.error}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <AvField
                          name="username"
                          label="username"
                          // value=""
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="password"
                          label="Password"
                          // value=""
                          type="password"
                          required
                          placeholder="Enter Password"
                        />
                      </div>

                      <Row className="mb-3">
                        <Col sm={6}>
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="customControlInline" />
                            <label className="form-check-label" htmlFor="customControlInline">Remember me</label>
                          </div>
                        </Col>
                        <Col sm={6} className="text-end">
                          <button
                            className="btn btn-primary w-md waves-effect waves-light"
                            type="submit"
                          >
                            Log In
                              </button>
                        </Col>
                      </Row>
                      <Row className="mt-2 mb-0 row">
                        <div className="col-12 mt-4">
                          <Link to="/forgot-password">
                            <i className="mdi mdi-lock"></i> Forgot your
                                password?
                              </Link>
                        </div>
                      </Row>
                      
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Don&#39;t have an account ?{" "}
                  <Link
                    to="register"
                    className="fw-medium text-primary"
                  >
                    {" "}
                    Signup now{" "}
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Veltrix. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Themesbrand
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
    </div>
  )
}

const mapStateToProps = state => {
  const { error } = state.Login
  return { error }
}

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError })(Login)
)

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
}