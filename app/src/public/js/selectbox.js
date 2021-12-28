"use strict"

let button = document.getElementById('submit-btn');
let selectValue = document.querySelector("select");
let result = document.querySelector('#result');


selectValue.addEventListener('change', (event) => {
    selectValue = event.target.value;
})

button.addEventListener('click', () => {
    fetch('/api/selectbox/submit', {
        method : 'POST',
        headers : {
            'Content-type' : 'application/json; charset=utf-8'
        },
        body : JSON.stringify({
            answer: selectValue,
        })
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            res === true ? result.innerText = '정답' : result.innerText = '오답'
    })
})


//1.연애라는 단어만 딱 추출할 수 있게 만들기
//2.다른 리스트를 클릭 했을때에도 value 값을 추출할 수 있게 만들기
//3. 그 추출한 값이 반응 해야 함