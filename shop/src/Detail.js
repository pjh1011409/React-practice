import React, {useState, useEffect} from 'react';
import { useHistory, useParams} from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import axios from 'axios';

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
    
    function 재고빼기(){
      let 재고량 = [...props.재고];
      재고량 = 재고량[0] -1;
      props.재고변경(재고량);
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
                  
                   
                      <Info 재고={props.재고} ></Info>
                    
                  <button className="btn btn-danger" onClick= {재고빼기
                  }>주문하기</button>
                  &nbsp;
                  <button className="btn btn-danger" onClick={() =>{
                      history.push('/')
                  }}>뒤로가기</button> 
                  
                </div>
              </div>
        </div> 
    )
  }

  function Info(props){
    return(
        <p>재고: {props.재고[0]}</p>
    )
  }

  export default Detail;
