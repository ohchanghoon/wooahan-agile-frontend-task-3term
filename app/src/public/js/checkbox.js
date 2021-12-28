"use strict";

let button = document.getElementById("submit_btn");    
let labelValue = document.querySelectorAll("#checkbox label input");
let result = document.getElementById("result");
// let checkbox = document.querySelectorAll('#checkbox').checked;


console.log(labelValue);
function checkValue() {
    const checkList = [];
    for (let i = 0; i < labelValue.length; i++) {
        if (labelValue[i].checked === true) {
            checkList.push(labelValue[i].value);
        }
        // console.log(labelValue[i].checked);
    }
    return checkList; //i 번재 체크 박스가 체크가 된지 안된지 판별을 해서 체크가 되어있으면 체크리스트라는 배열에 value
}

button.addEventListener('click', () => {
    console.log(checkValue());
    submitResult()
})
function submitResult () {
    fetch('/api/checkbox/submit', {
        method : 'POST',
        headers : {
            'Content-type' : 'application/json; charset=utf-8'
        },
        body : JSON.stringify({ answers : checkValue(),})
        }
        )
        .then((res) => res.json())
        .then((answer) => { 
            console.log(answer) 
            answer == true ? result.innerText = '정답': result.innerText = '오답' })
}

//1. 체크한 값을 가져와야 함
//2. 체크박스에서 체크여부를 확인해서 배열에 담아야 함
//3. 배열에 있는 내용들이 맞으면 true 틀리면 false
//4. true이면 정답 false면 오답


//유사배열 -> 객체-> 배열처럼 접근햇을때 데이터를 뽑아낼수 있다. 
