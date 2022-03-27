import React, {useState, useEffect} from 'react'; // state, 컴포넌트 변화에 대한 효과
import { useHistory, useParams} from 'react-router-dom'; // 18,19
import styled from 'styled-components'; // 9-15와 같이 컴포넌트에만 부여될 수 있는 구분된 css
import './Detail.scss'; //Detail css
import {Nav} from 'react-bootstrap' // 부트스트랩에서 가져온 Nav 태그
import {CSSTransition} from 'react-transition-group'; // 99-102 기능
import { connect } from "react-redux"; // 138가능

let 박스 = styled.div`
    padding: 20px;
`;
let 제목 = styled.h4`
    font-size: 30px;
    color: ${props => props.색상};
    `;

function Detail(props){
  let history = useHistory();
  let { id } = useParams(); //<Route> 컴포넌트에 path속성에서 URL을 파라미터로써 값을 받는 객체를 useParams()를 통해 접근
  // 배열 속 상품의 영구번호와 일치한지 find()가 배열 속에서 찾아준다.(Detail.js 70-72)
  let shoesId = props.shoes.find((x) => {
    // (shoesId 는 props화가 되고, 영구번호가 알맞는 상품을 뜻)

    return x.id == id;
  });
  //공지사항 초기값 false 로 저장
  let [notice, notice변경] = useState(true);
  //컴포넌트가 실행, 업데이트 시 notice변경함수에 의해 notice 값이 2초후에 false로 변경(Detail.js 55-62)
  useEffect(() => {
    let timer = setTimeout(() => {
      notice변경(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);


  
  // 로컬스토리지에 상품의 정보 임시저장
  useEffect( ()=>{
    let arr = [];
    arr = localStorage.getItem('watched');
    if(arr === null){arr = []} else {arr = JSON.parse(arr)}
    
    arr.push(shoesId.title);
    arr = new Set(arr);
    arr = [...arr];
    localStorage.setItem('watched', JSON.stringify(arr) );
  }, [] );


  let [탭, 탭변경] = useState(0); //탭 초기값
  let [효과, 효과변경] = useState(false); // 효과 초기값

  // 상세페이지에서 주문하기 버튼 클릭 시 재고(수량)이 감소 (장바구니에서는 그 수량만큼 상품리스트에 상품 추가)
  function 수량감소() {
    let copy = [...props.재고]; //재고량이 담긴 배열이 깊은 복사
    if (copy[shoesId.id] === 0) {
      // 만약 재고가 0이면 0에서 개수는 끝나고 안내메시지 출력
      copy[shoesId.id] = 0;
      props.dispatch({ type: "항목추가불가" }); // 항목추가불가라는 액션을 index.js 33 에 보내기
    } else {
      // 아니라면 1씩 감소 후 그 값이 출력
      copy[shoesId.id] = copy[shoesId.id] - 1; //클릭하면 몇번째 재고량이 1씩 감소
      // 그와 동시에 추가할 재고의 정보를 카트로 옮기자.
      props.dispatch({
        type: "항목추가",
        payload: {
          id: shoesId.id,
          name: shoesId.title,
          quan: 1,
          price: shoesId.price,
        },
      });
      history.push("/Cart"); //그와 동시에 장바구니로 이동
      props.재고변경(copy);
    }
  }

  return (
    <div className="container">
      <박스>
        <제목 색상={"red"}>Detail</제목>
      </박스>
      <div>안녕    </div>
      <Recently shoesId = {shoesId}></Recently>
      {notice === true && (
        <div className="my-alert">
          <p>재고가 얼마 남지 않았습니다.</p>
        </div>
      )}
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          {/* 상품의 이름, 내용, 가격 출력 (shoesId 는 props화가 되고, 영구번호가 알맞는 상품을 뜻) */}
          <h4 className="pt-5">{shoesId.title}</h4>
          <p>{shoesId.content}</p>
          <p>{shoesId.price}</p>
          {/* 상위컴포넌트(App)에 저장된 재고값을 props해오고, 그 값을 또 Info컴포넌트에 줄 수 있게 설정  + shoesId 값도 */}
          <Info 재고={props.재고} shoesId={shoesId}></Info>
          <button
            className="btn btn-danger"
            onClick={() => {
              수량감소();
            }}
          >
            주문하기
          </button>{" "}
          {/* Detail.js 35 */}
          &nbsp;
          {/* 뒤로가기 클릭 시 그 전 페이지로 이동 */}
          <button
            className="btn btn-danger"
            onClick={() => {
              history.push("/");
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          {/* 버튼 클릭시 0번째 탭의 내용 출력(탭의 값을 0으로 변경) + 효과를 false로 변경 */}
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              탭변경(0);
              효과변경(false);
            }}
          >
            Active
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          {/* 버튼 클릭시 0번째 탭의 내용 출력(탭의 값을 1으로 변경) + 효과를 false로 변경 */}
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              탭변경(1);
              효과변경(false);
            }}
          >
            Option 2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {/* 효과가 true인 값을 데이터바인딩 해와서 TabContent컴포넌트가  5초 동안 wow클래스에 입혀진 CSS 효과를 나타낸다. */}
      <CSSTransition in={효과} classNames="wow" timeout={500}>
        {/*TabContent 컴포넌트 값 출력,  */}
        <TabContent 탭={탭} 효과변경={효과변경}></TabContent>
      </CSSTransition>
    </div>
  );
}
  // 탭키 눌렀을 때 출력되는 탭 내용
  function TabContent(props){
    useEffect(()=>{     //컴포넌트 실행시, 업데이트시 효과가 true로 변경
      props.효과변경(true);
    })
   
    if(props.탭 === 0) { // 만약 탭값이 0이면 다음과 같은 코드 출력
        return <div>0번째</div>
     }
     else if(props.탭 === 1) { // 만약 탭값이 1이면 다음과 같은 코드 출력

      return <div>1번째</div>
     }
  }

  function Info(props){
    return(
      <div>  
        {/* 상속받아온 재고의 인덱스 값( 인덱스값 = 각자 상속받아온 상품(상품영구번호)의 id값) */}
        <p>재고: {props.재고[props.shoesId.id]}</p> 
      </div>
    )
  }
function mapStateToProps(state) {
  return {
    state: state.reducer,
  };
}
function Recently(props){

  let [삭제, 삭제변경] = useState(false);
  let arr = localStorage.getItem('watched');
  arr = JSON.parse(arr);
  return(
    <div>
    <p>최근 본 상품</p>
    <button onClick={()=>{삭제변경(true)}}>삭제</button>
    {
      삭제 === false?
      <div>{arr}</div>
      : localStorage.removeItem('watched')

    }
    

      </div>
  )
}
export default connect(mapStateToProps)(Detail);
