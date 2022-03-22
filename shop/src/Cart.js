import React from "react";
import { Table } from "react-bootstrap";
import { connect, useSelector, useDispatch } from "react-redux";
import {useHistory } from "react-router-dom";


function Cart(props) { // 맨 아래쪽에 mapToProps로 인하여 props 사용해야했지만, 현재 useSelector 사용중으로 생략가능

    // index.js에서 넘어온 state(store)값들을 리턴해준다. 그 값을 state 에 저장
    let state = useSelector((state)=>state);
    let dispatch = useDispatch(); // dispatch 기능은 useDispatch()로 사용가능

    // 화면이동에 사용할 수 있는 history 인스턴스에 접근, 기록이 남아 그 기록을 이용해 이동
    let history = useHistory(); 

    // 현재 장바구니 리스트에 담긴 상품들의 수량에 맞는 전체 가격
    function sum(){
      let result = 0;
      for(let i=0; i<state.reducer.length; i++){ // state값으로 넘어온 상품리스트의 길이만큼 반복
        result += state.reducer[i].price; // 상품마다의 가격을 result값에 누적
      }
      return result;
    }
   

  return (
    <div>
    <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>가격</th>
        </tr>
      </thead>
      <tbody>
        {/* state값 중 reducer에서 리턴한 값들을 하나씩 출력한다.(반복을 통해서) */}
        {state.reducer.map((a, i) => { //그 값들이 a 파라미터에 저장
          return (
            <tr key={i}>
              <td>{a.id+1}</td> {/* 상품의 id값을 출력(0부터 시작하므로 +1 해주기) */}
              {/* 11-12줄에서 선언한 history를 이용하여 상품 클릭시 각자 상품에 대한 상세페이지로 이동 */}
              <td onClick={()=>{history.push('detail/'+ a.id)}}>{a.name}</td> {/*상품의 이름 출력 */}
              <td>{a.quan}</td> {/*상품의 수량 출력 */}
              <td>{a.price}</td> {/*상품의 가격 출력 */}
              <td>
                {/*버튼 클릭시 수량증가라는 액션 보내기, 액션값으로 배열 값에 맞는 파라미터 i 값을 보낸다.(index.js 33)*/}
                <button onClick={() => {dispatch({ type: "수량증가" , payload: {i} });}}>+</button>
                &nbsp;
                {/*버튼 클릭시 수량감소라는 액션 보내기, 액션값으로 배열 값에 맞는 파라미터 i 값을 보낸다.(index.js 51)*/}
                <button onClick={() => {dispatch({ type: "수량감소", payload: {i}  });}}>-</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
        {/* Cart.js 14-21 */}
        <div>총가격: {sum()}</div> 

        {/* reducer2에서 넘어온 새로운 리턴값에 대한 스위치 기능 */}
        { state.reducer2 === true   // 만약 true값이 반환되어 왔다면 공지가 보인다.
            ?
        <div className="my-alert">
            <p>지금구매하시면 신규할인 20%</p>
            {/* 닫기 버튼을 누르면 dispatch를 통해 닫기라는 액션을 보낸다.(type이 닫기라는 객체값을 보낸다) */}
            <button onClick={()=>{dispatch({ type: "닫기"});}}>닫기</button>
        </div>
       :  // 만약 false 값이라면 공지 열기 버튼이 보인다
        <div> 
       {/* 열기 버튼을 누르면 dispatch를 통해 열기라는 액션을 보낸다.(type이 열기라는 객체값을 보낸다) */}  
        <button onClick={()=>{dispatch({ type: "열기"});}}>공지 열기</button>
        </div>
        }
    </div> 
  );
}


//아래와 같은 방식 대신 useSelector로 대체 가능 (Cart.js 7-9)
// 아래와 같은 경우 props화 시킨경우 이므로 props를 쓰고, 앞에 작성후 사용 가능

// // store에서 넘어오고 props된 값들이 state파라미터에 저장
// function mapStateToProps(state) {
//   return {
//     state: state.reducer, //state 속 reducer의 값들을 state라는 값에 저장
//     alert: state.reducer2 //state 속 reducer2 의 값들을 alert라는 값에 저장
//   };
// }
// index.js에서 넘어온 store값을 props화 시켜주는 과정
// export default connect(mapStateToProps)(Cart);

export default Cart;

