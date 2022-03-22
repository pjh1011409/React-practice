import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

let 초기값 = [];
let alert초기값 = true;

function reducer(state = 초기값, 액션) {
  if (액션.type === "항목추가") {
    let copy = [...state];
    let found = copy.findIndex((a) => {
      return a.id === 액션.payload.id;
    });
    if (found >= 0) {
      copy[found].price += copy[found].price / copy[found].quan;
      copy[found].quan++;
      return copy;
    } else {
      copy.push(액션.payload);
      return copy;
    }
  }
  if(액션.type === "항목추가불가"){
    alert("해당 상품의 재고가 없습니다.");

  }

  if (액션.type === "수량증가") {
    let copy = [...state];

    if (copy[액션.payload.i].quan >= 5) {
      alert("주문 가능 수량은 5개까지 입니다.");
      copy[액션.payload.i].price = copy[액션.payload.i].price;
      copy[액션.payload.i].quan = 5;
    } else {
      copy[액션.payload.i].price +=
        copy[액션.payload.i].price / copy[액션.payload.i].quan;
      copy[액션.payload.i].quan++;
      return copy;
    }
  } else if (액션.type === "수량감소") {
    let copy = [...state];
    copy[액션.payload.i].price -=
      copy[액션.payload.i].price / copy[액션.payload.i].quan;
    copy[액션.payload.i].quan--;
    if (copy[액션.payload.i].quan === 0) {
      copy.splice(copy.indexOf(copy[액션.payload.i]), 1); // 잊지말자 배열에서 특정값 삭제하고 싶을때.
    }

    return copy;
  } else {
    return state;
  }
}

function reducer2(state = alert초기값, action) {
  if (action.type === "닫기") {
    state = false;
    return state;
  } else if (action.type === "열기") {
    state = true;
    return state;
  } else {
    return state;
  }
}

let store = createStore(combineReducers({ reducer, reducer2 }));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
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
