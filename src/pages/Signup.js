import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { useSignupUserMutation } from '../services/appApi';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Sign-up.css';
import userPro from '../assets/profile.png';

function Signup() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [signupUser, { isLoading, error }] = useSignupUserMutation();
  const navigate = useNavigate();
  //image upload state
  const [image, setImage] = useState(null);
  const [uploadingImg, setUploadImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  function validateImg(e) {
    const file = e.target.files[0];
    if (file.size > 1048576) {
      return alert('Max file size id 1 mb');
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function uploadImage() {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'ggq76k1f');
    try {
      setUploadImg(true);
      let res = await fetch(
        'https://api.cloudinary.com/v1_1/dlylnvkfq/image/upload',
        {
          method: 'post',
          body: data,
        }
      );
      const urlData = await res.json();
      setUploadImg(false);
      return urlData.url;
    } catch (error) {
      setUploadImg(false);
      console.log(error);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    if (!image) return alert('please upload your profile image ');
    const url = await uploadImage(image);
    console.log(url);
    //Sign up the userPro
    signupUser({ username, name, email, phone, password, picture: url }).then(
      ({ data }) => {
        if (data) {
          console.log(data);
          navigate('/chat');
        }
      }
    );
  }

  return (
    <div className="container">
      <Row>
        <Col
          md={7}
          className="d-flex align-items-center justify-content-center flex-direction-column"
        >
          {error && <p className="alert alert-danger">{error.data}</p>}
          <Form style={{ width: '80%', maxWidth: 500 }} onSubmit={handleSignup}>
            <h1 className="my-2"> New User Registration </h1>

            <div className="signup-Profile-pic_container">
              <img
                src={imagePreview || userPro}
                className="signup-Profile-pic"
                alt=""
              />
              <label htmlFor="image-upload" className="">
                <i className="fas fa-plus-circle add-picture-icon"></i>
              </label>
              <input
                type="file"
                id="image-upload"
                hidden
                name="image-upload"
                accept="image/png, image/jpeg,image/jpg"
                onChange={validateImg}
              />
            </div>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your User name"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Phone </Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter Phone Number"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                value={passwordConfirmation}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Col>
              <Row>
                <Button variant="success" type="submit">
                  {uploadingImg || isLoading ? 'Signing you up...' : 'Signup'}
                </Button>
              </Row>
            </Col>
            <div className="py-4">
              <p className="text-center">
                Already have an account? <Link to="/login">Login </Link>
              </p>
            </div>
          </Form>
        </Col>
        <Col md={5} className="signup__bg"></Col>
      </Row>
    </div>
  );
}

export default Signup;
