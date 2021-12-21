let inputValue = document.querySelectorAll("#checkbox label input");
let btnValue = document.querySelector("#submit_btn");
let resultText = document.querySelector("#result");

const onSubmit = () => {
    const answer = [];
    
    for (let i = 0; i < inputValue.length; i++) {
        if (inputValue[i].checked) answer.push(inputValue[i].value);
    }
    fetch('/api/checkbox/submit', {
        method : 'POST',
        headers : {
            'Content-type' : 'application/json; charset=utf-8'
        },
        body : JSON.stringify({
            answers : answer,
        }),
    })
    .then((res) => res.json())
    .then((res) => {res === true ? resultText.innerText="정답" 
    : resultText.innerText="오답";});
}

btnValue.addEventListener('click', () => onSubmit())