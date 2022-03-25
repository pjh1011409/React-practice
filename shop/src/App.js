import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import React, { useState, useEffect, useContext ,lazy, Suspense } from "react";
import {  Link, Route, Switch, useHistory, useParams } from "react-router-dom";

import axios from "axios";
import "./App.css";
import Data from "./data"; //상품에 대한 데이터

let Detail = lazy(()=>{ return import('./Detail.js')  }); // import Detail from "./Detail";
let Cart = lazy(()=>{ return import('./Cart.js')  }); // import Cart from './Cart'


let 재고context = React.createContext(); // 원하는 값(재고)을 범위(문맥) 형성을 시켜 사용하게 하기? 

function App() {
  let [shoes, shoes변경] = useState(Data); // Data.js에서 가져온 상품(객체)이 담긴 배열을 저장한 state
  let [재고, 재고변경] = useState([2, 3, 1]); // 상품마다의 재고량이 담긴 배열 state

  return (
    <div className="App">
        <Navigation></Navigation> {/* 네비게이션 바에 대한 컴포넌트 (App.js 42) */}
        <Switch> {/* Route 묶어주기 */}
          {/* 메인페이지 */}
          <Route exact path="/">
            <Post></Post>  {/* 포스터에 대한 컴포넌트 (App.js 64) */}
            <Recent></Recent>
            <재고context.Provider value={재고}>  {/* 재고라는 값을 props 없이 감싸고 있는 컴포넌트가 사용 가능 (App.js 131)*/}
              <Suspense fallback={<div>로딩중이에요</div>}>
              <Shoes shoes={shoes} shoes변경={shoes변경}></Shoes>  {/*App->Shoes->Test*/}
              </Suspense>
            </재고context.Provider>
          </Route>

          {/* 상세페이지 */}
          <Route path="/detail/:id">
            <Suspense fallback={<div>로딩중이에요</div>}>
            <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}></Detail>
            </Suspense>
          </Route>

          {/* 장바구니 페이지 */}
          <Route path="/cart">
            <Suspense fallback={<div>로딩중이에요</div>}>
            <Cart></Cart>  {/* 장바구니(Cart)에 대한 컴포넌트 (Cart.js에서 import 해옴)*/}
            </Suspense>
          </Route>
        </Switch>
    </div>
  );
}
function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand  as={Link} to="/">Shoe Shop{" "}</Navbar.Brand>
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
function Recent(){
  return(
    <div className="recent">최근 본 상품
      {/* {localStorage.getItem()} */}
    </div>
  )
}
function Shoes(props) {
  let [로딩중, 로딩중변경] = useState(false);
  let [로딩성공, 로딩성공변경] = useState(false);
  let [로딩실패, 로딩실패변경] = useState(false);
  let history = useHistory();

  return (
    <div className="container">
      <div className="row">
        {props.shoes.map((a, i) => { // 상품배열 속 상품마다 하나씩 출력 
          return (
            // 각자 상품이 담긴 범위(레이아웃) 클릭 시 history를 통해 이동 
            <div className="col-md-4" key={i} onClick={()=>{history.push('/detail/'+ props.shoes[i].id)}} >
              <img
                src={
                  // 각각 상품 이미지 불러 올때 아래와 같이 사용 가능
                  "https://codingapple1.github.io/shop/shoes" + (i + 1) + ".jpg"
                }
                width="100%"
              />
              <h4>{props.shoes[i].title}</h4>  {/* 상품의 이름 */}
              <p>{props.shoes[i].content}</p>  {/* 상품 내용*/}
              <p>{props.shoes[i].price}</p>  {/* 상품 가격 */}
              <Test i={i}></Test>  {/* 재고량에 대한 컴포넌트 */}
            </div>
          );
        })}
      </div>
       {/* 로딩중, 로딩성공, 로딩실패 state가 참,거짓에 따라 출력 */}
      {로딩중 === true ? <div>로딩중입니다.</div> : null} 
      {로딩성공 === true ? <div>로딩성공입니다.</div> : null}
      {로딩실패 === true ? <div>로딩실패입니다.</div> : null}
      <button
        className="btn btn-primary"
        onClick={() => {
          로딩중변경(true); // 클릭한다면 로딩중이 true로 로딩중입니다. 출력
          axios
            .get("https://codingapple1.github.io/shop/data2.json") // axios로 서버에서 데이터 받아옴
            .then((result) => {
              로딩중변경(false); //받아왔으면 로딩중 끝.
              로딩성공변경(true); // 그와 동시에 로딩성공이 true로 로딩성공 출력
              props.shoes변경([...props.shoes, ...result.data]); // 원래 상품배열에 받아온 데이터 합치기
            })
            .catch(() => { // 만약 데이터 받아오기 실패
              로딩중변경(false); // 로딩중 false
              로딩실패변경(true); // 로딩실패 true로 로딩 실패입니다 출력
            });
        }}
      >
        더보기
      </button>
    </div>
  );
}
function Test(props) { // 메인페이지(App)에 상품마다 재고량 출력
  let 재고 = useContext(재고context); //props 없이 사용 가능한 재고 값을 받아온 것.

  return <p>{재고[props.i]}</p>; // props는 상위에서 i 값 가져오려고 사용한 것
}

export default App;
