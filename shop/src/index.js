import React,  {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers} from "redux";

let 초기값 = [
  { id: 0, name: "아디다스", quan: 2 },
  { id: 1, name: "나이키", quan: 3 },
  { id: 2, name: "퓨마", quan: 2 },
];
let alert초기값 = true;

function reducer(state = 초기값, 액션) {
  if(액션.type === "항목추가"){
    let copy = [...state];
    copy.push(액션.payload);
    return copy;
    }
  
  if (액션.type === "수량증가") {
    let copy = [...state];
    copy[0].quan++;
    return copy;
  } 
  else if(액션.type === "수량감소") {
    let copy = [...state];
    copy[0].quan--;
    return copy;
  }
  else {
    return state;
  }
}

function reducer2(state = alert초기값, action){
  if(action.type === "닫기"){
    state= false;
    return state;
  }
  else if(action.type === "열기"){
    state= true;
    return state;
  }
  else{
    return state
  }
}

let store = createStore(combineReducers({reducer, reducer2}));

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
