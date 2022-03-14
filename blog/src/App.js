/* eslint-disable */
import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {


  let [글제목, 글제목변경] = useState(['남자 코드 추천','우동 맛집','수원 왕갈비통닭']);
  let [따봉, 따봉변경] = useState(0);
  let posts = '강남 고기 맛집';

  function 제목바꾸기(){
    let newArray = [...글제목]; //글제목에 있던 0번째 데이터를 여자코트추천으로 바꿈
    newArray[0] = '여자코트 추천'
    글제목변경(newArray);
  }
  return (
    <div className="App">
        <div className="black-nav">
            <div>개발 Blog</div>
        </div>
        <div className="list">
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
        </div>
       
    </div>
  );
}

export default App;
