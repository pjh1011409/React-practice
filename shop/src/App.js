import "./App.css";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import Data from "./data";
import Detail from "./Detail";
import Cart from './Cart'
import axios from "axios";
import {  Link, Route, Switch, useHistory, useParams } from "react-router-dom";

let 재고context = React.createContext();

function App() {
  let [shoes, shoes변경] = useState(Data);
  let [재고, 재고변경] = useState([2, 3, 1]);

  return (
    <div className="App">
        <Navigation></Navigation>
        <Switch>
          {/* 메인페이지 */}
          <Route exact path="/">
            <Post></Post>
            <재고context.Provider value={재고}>
              <Shoes shoes={shoes} shoes변경={shoes변경}></Shoes>
            </재고context.Provider>
          </Route>

          {/* 상세페이지 */}
          <Route path="/detail/:id">
            <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}></Detail>
          </Route>

          {/* 장바구니 페이지 */}
          <Route path="/cart">
            <Cart></Cart>
          </Route>
        </Switch>
    </div>
  );
}
function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Shoe Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home{" "}
            </Nav.Link>
            <Nav.Link as={Link} to="/detail">
              Detail{" "}
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              Cart{" "}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
function Post() {
  return (
    <div className="jumbotron">
      <h1>20% Season Off</h1>
      <p>
        This is a simple hero unit, a simple jumbotron-style component for
        calling extra attention to featured content or information.
      </p>
      <p>
        <Button variant="secondary" size="sm">
          GO
        </Button>
      </p>
    </div>
  );
}
function Shoes(props) {
  let [로딩중, 로딩중변경] = useState(false);
  let [로딩성공, 로딩성공변경] = useState(false);
  let [로딩실패, 로딩실패변경] = useState(false);
  let history = useHistory();

  return (
    <div className="container">
      <div className="row">
        {props.shoes.map((a, i) => {
          return (
            <div className="col-md-4" key={i} onClick={()=>{history.push('/detail/'+ props.shoes[i].id)}} >
              <img
                src={
                  "https://codingapple1.github.io/shop/shoes" + (i + 1) + ".jpg"
                }
                width="100%"
              />
              <h4>{props.shoes[i].title}</h4>
              <p>{props.shoes[i].content}</p>
              <p>{props.shoes[i].price}</p>
              <Test i={i}></Test>
            </div>
          );
        })}
      </div>
      {로딩중 === true ? <div>로딩중입니다.</div> : null}
      {로딩성공 === true ? <div>로딩성공입니다.</div> : null}
      {로딩실패 === true ? <div>로딩실패입니다.</div> : null}
      <button
        className="btn btn-primary"
        onClick={() => {
          로딩중변경(true);
          axios
            .get("https://codingapple1.github.io/shop/data2.json")
            .then((result) => {
              로딩중변경(false);
              로딩성공변경(true);
              props.shoes변경([...props.shoes, ...result.data]);
            })
            .catch(() => {
              로딩중변경(false);
              로딩실패변경(true);
            });
        }}
      >
        더보기
      </button>
    </div>
  );
}
function Test(props) {
  let 재고 = useContext(재고context);

  return <p>{재고[props.i]}</p>;
}

export default App;
