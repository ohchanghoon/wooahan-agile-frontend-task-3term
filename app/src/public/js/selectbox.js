"use strict";
const selectBox = document.querySelector("select");

//Q: 이거는 왜 queryselectorall로 받아오면 정답이여야할때 오답이 나오는지??
const btn = document.querySelector("#submit-btn");
const returnResult = document.querySelector("#result");

const onSubmit = () => {
  // 버튼을 눌렀을때 작동하는 동작 만들기.
  const data = {
    answer: selectBox.value,
  };
  //  selectBox의 요소중 선택된 녀석 data에 넣어주기.
  fetch("/api/selectbox/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    //fetch 함수를 이용하여 보내줄 서버의 주소와 method에 get,post방식, headers에 content-type 정해주기
    body: JSON.stringify(data),
    //body에 JSON.stringify() 메서드를 이용하여 data 객체를 JSON 문자열로 변환 하여 서버로 전송
  })
    .then((response) => response.json())
    .then((isAnswer) => (returnResult.innerHTML = isAnswer ? "정답" : "오답"));
  /*서버로 부터 받은 데이터를 response로 받아오는데 then을 두번 쓰는 이유는 fetch함수와 json()함수가 모두 비동기 방식이기 때문이다.
    첫번째 then에서 자바스크립트를 json형식으로 바꿔주고,그 작업이 완료된 이후에 두번째 then이 실행되어야 한다. 
    첫 번째 then 함수에 전달된 인자 res는 http 통신 요청과 응답에서 응답의 정보를 담고 있는 객체(Response Object)이다.
    응답으로 받는 JSON 데이터를 사용하기 위해서는 Response Object 의 json 함수를 호출하고, return 해야 한다. 
    그러면 두 번째 then 함수에서 응답 body의 데이터를 받을 수 있다.
  */
};
btn.addEventListener("click", onSubmit);
//addEventListener을 이용하여 btn이 "click"이 되었을 때, onSubmit이 동작될 수 있게 만들어줌.
