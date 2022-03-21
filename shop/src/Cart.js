import React from "react";
import { Table } from "react-bootstrap";
import { connect, useSelector, useDispatch } from "react-redux";

function Cart(props) {

    let state = useSelector((state)=>state);
    let dispatch = useDispatch();

  return (
    <div>
    <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
        </tr>
      </thead>
      <tbody>
        {state.reducer.map((a, i) => {
          return (
            <tr key={i}>
              <td>{a.id}</td>
              <td>{a.name}</td>
              <td>{a.quan}</td>
              <td>
                <button onClick={() => {dispatch({ type: "수량증가"});}}>+</button>
                &nbsp;
                <button onClick={() => {dispatch({ type: "수량감소" });}}>-</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
        { props.alert === true
            ?
        <div className="my-alert">
            <p>지금구매하시면 신규할인 20%</p>
            <button onClick={()=>{props.dispatch({ type: "닫기"});}}>닫기</button>
        </div>
        : 
        <div>
        <button onClick={()=>{props.dispatch({ type: "열기"});}}>공지 열기</button>
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
