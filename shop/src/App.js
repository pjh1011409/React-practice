import './App.css';
import {Navbar,Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import React, {useState} from 'react';
import Data from './data';

import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';

function App() {

      let [shoes,shoes변경] = useState(Data);

      return (
        <div className="App">
          
          <Navigation></Navigation>
          

        <BrowserRouter>
          {/* 메인페이지 */}
          <Route exact path="/">
              <Post></Post>
              <Shoes shoes={shoes}></Shoes>
          </Route>
          {/* 상세페이지 */}
          <Route path="/detail">
              <Detail></Detail>
          </Route>
        </BrowserRouter>
        </div>
      );
    }
        function Navigation(){
          return(
            <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="#home">Shoe Shop</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#link">Link</Nav.Link>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          )
        }
        function Post(){
          return(
           <div className='jumbotron'>
          <h1>20% Season Off</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
          </p>
          <p>
          <Button variant="secondary" size="sm">
              GO
          </Button> 
          </p>
      </div>
          )
        }
        function Shoes(props){
          return( 
              <div className='container'>
              <div className='row'>
                {
                  props.shoes.map((a,i)=>{
                    return(
                      <div className='col-md-4' key={i}>
                      <img src= {"https://codingapple1.github.io/shop/shoes" + (i+1)+ ".jpg"} width="100%"/>
                      <h4>{props.shoes[i].title}</h4>
                      <p>{props.shoes[i].content}</p>
                      <p>{props.shoes[i].price}</p>
          
                      </div>
                    )
                  })
                }
                
              </div>
            </div>

          )
        }
        function Detail(){
          return(
              <div className="container">
                    <div className="row">
                      <div className="col-md-6">
                        <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                      </div>
                      <div className="col-md-6 mt-4">
                        <h4 className="pt-5">상품명</h4>
                        <p>상품설명</p>
                        <p>120000원</p>
                        <button className="btn btn-danger">주문하기</button> 
                      </div>
                    </div>
              </div> 
          )
        }
export default App;