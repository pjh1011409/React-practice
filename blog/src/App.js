/* eslint-disable */
import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {


  let [글제목, 글제목변경] = useState(['남자 코드 추천','우동 맛집','수원 왕갈비통닭']);
  let [따봉, 따봉변경] = useState(0);
  let [modal, modal변경] = useState(false); //모달창을 켜고 닫는 스위치
  let [누른제목, 누른제목변경] = useState(0);
  // function 제목바꾸기(){
  //   let newArray = [...글제목]; //글제목에 있던 0번째 데이터를 여자코트추천으로 바꿈
  //   newArray[0] = '여자코트 추천'
  //   글제목변경(newArray);
  // }

    return (
     
    <div className="App">
        <div className="black-nav">
            <div>개발 Blog</div>
        </div>
        {/* <div className="list">
          <h3> { 글제목[0] } 
           <button onClick = {제목바꾸기} >버튼</button>
            <span onClick= {()=> { 따봉변경(따봉+1)}}>👍</span> {따봉} 
          </h3>

          <p>2월 17일 발행</p>
          <hr/>
        </div>
        <div className="list">
          <h3> { 글제목[1] }</h3>
          <p>2월 17일 발행</p>
          <hr/>
        </div>
        <div className="list">
          <h3> { 글제목[2] }</h3>
          <p>2월 17일 발행</p>
          <hr/>
        </div> */}

        { //for문과 같은 역할로 map을 이용해 글제목 배열의 데이터가 글이라는 파라미터에 담기고
          // 배열에 다른 제목을 가진 글제목이 차례로 출력된다.
          글제목.map((글, i)=>{
              return (
              <div className="list">
                <h3 onClick = {() => { 누른제목변경(i)}}> 
                  {글}   
                <span onClick= {()=> { 따봉변경(따봉+1)}}>👍</span> {따봉} 
                </h3>
                <p>2월 17일 발행</p>
                <hr/>
               </div>
              )
          })
        }
          {/* 버튼클릭시 모달 열고 닫힘     */}
          <button onClick = {()=>{modal변경(!modal)}}>버튼</button>







        { //if문과 같은 역할로 {} 안에 작성하고 true이면 모달이 보이게, false면 빈 페이지
          modal === true
          ? <Modal 글제목 = {글제목} 누른제목 = {누른제목}></Modal>
          : null //텅빈 html
        }

        </div>
  );
}

//모달 컴포넌트 생성 - 모달창에 대한 정보가 담겨있는 함수
// props 파라미터로 부모 컴포넌트인 app()의 글제목 state의 데이터를 받아올 수 있다.
function Modal(props){
  return (
    <div className= "modal">
          <h2>{props.글제목[props.누른제목]}</h2>
          <p>날짜</p>
          <p>상세내용</p>
        </div>

  )
}

export default App;
