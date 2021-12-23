"use strict"
const button = document.querySelector('#submit-btn');
const result = document.querySelector('#result');
const select = document.querySelector('select');
let value = "";

select.addEventListener('change', () => {
    value = select.value;
})

button.addEventListener('click', () => {
    fetch('/api/selectbox/submit',{
        method: "POST",
        headers: {
            "Content-type" : "application/json; charset=utf-8"
        },
        body: JSON.stringify({ answer: value })
    })
    .then((res) => res.json())
    .then((answer) => {
        if (answer === true) {
            document.querySelector('#result').innerHTML = '정답'
        } else {
            document.querySelector('#result').innerHTML = '오답' 
        }
    })
});