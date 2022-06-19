import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import '../css/Home.css';
function Home() {
  return (
    <Row>
      <Col
        md={6}
        className="d-flex flex-direction-column align-tems-center justify-content-center"
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            class="bi bi-chat-left-text"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
          </svg>
          <p> Zibra Chat </p>
          <h1>Connect with your friends</h1>

          <a href="/chat">
            <button className="btn btn-success" variant="success">
              {' '}
              Start now <i className="fas fa-comment home-message-con"></i>{' '}
            </button>
          </a>
        </div>
      </Col>

      <Col md={6} className="home__bg"></Col>
    </Row>
  );
}

export default Home;
