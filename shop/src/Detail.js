import React, {useState, useEffect} from 'react';
import { useHistory, useParams} from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import axios from 'axios';
import {Nav} from 'react-bootstrap'
import {CSSTransition} from 'react-transition-group';
import { connect } from "react-redux";

let 박스 = styled.div`
    padding: 20px;
`;
let 제목 = styled.h4`
    font-size: 30px;
    color: ${props => props.색상};
    `;

function Detail(props){
    let history = useHistory();
    let {id} = useParams();
    let shoesId = props.shoes.find((x) =>{
        return x.id == id
      });
    let [notice,notice변경] = useState(true);

    useEffect(() => {
      let timer =  setTimeout(()=>{notice변경(false)}, 2000);
      return ()=>{ clearTimeout(timer) }
    },[]);
    
    let [탭, 탭변경] = useState(0);
    let [효과,효과변경] = useState(false);

    function 수량감소(){
      let copy = [...props.재고]; //재고량이 담긴 배열이 깊은 복사
      if(copy[shoesId.id] === 0){ // 만약 재고가 0이면 0에서 개수는 끝나고 안내메시지 출력
        copy[shoesId.id] = 0;
        props.dispatch({type:'항목추가불가'});
      }
      else{ // 아니라면 1씩 감소 후 그 값이 출력
        copy[shoesId.id] = copy[shoesId.id] - 1; //클릭하면 몇번째 재고량이 1씩 감소
        props.재고변경(copy);
      }
    }
    return(
        <div className="container">
                <박스 >
                    <제목 색상={'red'}>Detail</제목>
                </박스>
                {
                  notice === true 
                  ?
                  <div className='my-alert'>
                      <p>재고가 얼마 남지 않았습니다.</p>
                  </div>
                : null
                }
              <div className="row">
                <div className="col-md-6">
                  <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                  <h4 className="pt-5">{shoesId.title}</h4>
                  <p>{shoesId.content}</p>
                  <p>{shoesId.price}</p>
                  
                   
                      <Info 재고={props.재고} shoesId = {shoesId} ></Info>
                    
                  <button className="btn btn-danger" onClick={()=>{
                    
                    수량감소(); 
                    props.dispatch({type: '항목추가', payload: {id: shoesId.id, name: shoesId.title, quan: 1, price: shoesId.price}});
                    history.push('/Cart');
                    }}>주문하기</button>
                  &nbsp;
                  <button className="btn btn-danger" onClick={() =>{
                      history.push('/')
                  }}>뒤로가기</button> 
                </div>
              </div>

              <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
                  <Nav.Item>
                    <Nav.Link eventKey="link-0" onClick={()=>{탭변경(0); 효과변경(false)}} >Active</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={()=>{탭변경(1); 효과변경(false)}}>Option 2</Nav.Link>
                  </Nav.Item>
              </Nav>

               <CSSTransition in={효과} classNames="wow" timeout={500}>
               <TabContent 탭={탭} 효과변경={효과변경}></TabContent>
               </CSSTransition>
        </div> 
    )
  }
  function TabContent(props){

    useEffect(()=>{
      props.효과변경(true);
    })

    if(props.탭 === 0) {
        return <div>0번째</div>
     }
     else if(props.탭 === 1) {
      return <div>1번째</div>
     }
  }

  function Info(props){
    return(
      <div>
        <p>재고: {props.재고[props.shoesId.id]}</p>
      {/* {
        props.재고.map((i)=>{
          return(
            <p> 재고: {props.재고[i]}</p>
          )
        })

      } */}
      </div>
    )
  }


  
function mapStateToProps(state) {
  return {
    state: state.reducer,
    alert: state.reducer2
  };
}

export default connect(mapStateToProps)(Detail);
