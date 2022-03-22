import React from "react";
import { Table } from "react-bootstrap";
import { connect, useSelector, useDispatch } from "react-redux";
import {useHistory } from "react-router-dom";
function Cart(props) {

    let state = useSelector((state)=>state);
    let dispatch = useDispatch();
    let history = useHistory();


    function sum(){
      let result = 0;
      for(let i=0; i<state.reducer.length; i++){
        result += state.reducer[i].price;
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
        {state.reducer.map((a, i) => {
          return (
            <tr key={i}>
              <td>{a.id+1}</td>
              <td onClick={()=>{history.push('detail/'+ a.id)}}>{a.name}</td>
              <td>{a.quan}</td>
              <td>{a.price}</td>
              <td>
                <button onClick={() => {dispatch({ type: "수량증가" , payload: {i} });}}>+</button>
                &nbsp;
                <button onClick={() => {dispatch({ type: "수량감소", payload: {i}  });}}>-</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
        <div>총가격: {sum()}</div>

        { state.reducer2 === true
            ?
        <div className="my-alert">
            <p>지금구매하시면 신규할인 20%</p>
            <button onClick={()=>{dispatch({ type: "닫기"});}}>닫기</button>
        </div>
        : 
        <div>
        <button onClick={()=>{dispatch({ type: "열기"});}}>공지 열기</button>
        </div>
        }
    </div> 
  );
}

// function mapStateToProps(state) {
//   return {
//     state: state.reducer,
//     alert: state.reducer2
//   };
// }

// export default connect(mapStateToProps)(Cart);



export default Cart;
