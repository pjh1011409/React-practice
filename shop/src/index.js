import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";


import "./index.css";

import App from "./App";


let 초기값 = []; //초기값 state 설정 (reducer 의 초기값)
let alert초기값 = true; //초기값 state 설정 (reducer2의  초기값)



//detail.js(상세페이지)에서 상품 주문 시 장바구니 리스트에 상품 리스트 추가하는 수정방법 
function reducer(state = 초기값, 액션) { //빈 배열값이 state파라미터에 저장
  if (액션.type === "항목추가") { // 항목추가라는 값이 dispatch 올 경우(Detail.js 44)
    let copy = [...state]; // 깊은복사하기
    // 만약 dispatch로 보내진 값의 id와 같은 id를 가진 값이 존재한다면?
    let found = copy.findIndex((a) => { 
      return a.id === 액션.payload.id;
    });
    if (found >= 0) { //만약 존재한다면 수량과 가격만 증가, 중복되는 리스트 추가 X
      copy[found].price += copy[found].price / copy[found].quan; // 가격 수량에 맞게 증가
      copy[found].quan++; //수량증가
      return copy;  
    } else { //그렇지 않을 경우(리스트에 동일 상품 없을 경우) 배열에 새로운 상품정보 추가
      copy.push(액션.payload);
      return copy;
    }
  }
  // 항복추가라는 액션이 오면 알림창 출력  (Detail.js 39)
  if(액션.type === "항목추가불가"){
    alert("해당 상품의 재고가 없습니다.");
  }

  // +버튼 누를 시 수량,가격 증가
  if (액션.type === "수량증가") {
    let copy = [...state]; // 초기값 깊은복사하기

    if (copy[액션.payload.i].quan >= 5) { //수량이 5이상일 경우
      alert("주문 가능 수량은 5개까지 입니다."); // 알림창 출력
      copy[액션.payload.i].price = copy[액션.payload.i].price; //현재까지 합산 출력
      copy[액션.payload.i].quan = 5; // 수량은 5개까지인 것으로 5를 출력
    } else { //5이하일 경우
      // 현재상품의 현재가격에 현재가격에서 수량 나눈 값을 누적하여 더하기 (누적가격 구하기)
      // 만약 수량을 나누어주지않으면? ex. 수량 2개에, 22000이라면, 22000+11000이 되어야하는데
      // 22000+22000이 된다. 즉, 현재 자신의 값을 누적하므로 수량을 나누어준 값을 더해줘야 한다.
      copy[액션.payload.i].price += copy[액션.payload.i].price / copy[액션.payload.i].quan;
      copy[액션.payload.i].quan++; //수량 1씩 증가
      return copy; //초기값에 저장된 배열 속 값 출력
    }
  } 
  //- 버튼 누를 시 수량,가격 감소
  else if (액션.type === "수량감소") {
    let copy = [...state]; //초기값 깊은복사하기
    // 누적합과 같은 원리
    copy[액션.payload.i].price -=copy[액션.payload.i].price / copy[액션.payload.i].quan;
    copy[액션.payload.i].quan--; //수량 1씩 감소
    // 만약 수량이 0이라면 그 값은 삭제
    if (copy[액션.payload.i].quan === 0) {
      //0이 된 배열 속 값을 추출 후, splice를 통해 그 값을 삭제시키기(배열 속 특정값 삭제시키기 방법)
      copy.splice(copy.indexOf(copy[액션.payload.i]), 1); 
    }

    return copy; //초기값에 저장된 배열 속 값 출력 
  } else {
    return state;
  }
}
// 공지사항 수정하기, 값이 true인 alert초기값이라는 변수를 state 파라미터에 저장 (Cart.js 52-62)
function reducer2(state = alert초기값, action) { 
  if (action.type === "닫기") {
    state = false; 
    return state; //false 값을 반환
  } else if (action.type === "열기") {
    state = true;
    return state; //true 값을 반환 
  } 
  // 모든 액션 type과 일치하지 않을 경우(어떤 수정사항도 없을 경우) 초기값 출력 = 빈배열값 출력 = 빈칸 
  else {
    return state;
  }
}
// 이전 상태에서 새로운 상태로 리턴한 reducer함수들을 합쳐서 store 에 저장
let store = createStore(combineReducers({ reducer, reducer2 }));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    {/* Provider을 통해 하위 컴포넌트가 store함수를 다 사용 가능 */}
      <Provider store={store}> 
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
