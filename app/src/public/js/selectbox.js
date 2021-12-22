let optionValue = document.querySelector('select'),
btnValue = document.querySelector("#submit-btn"),
resultText = document.querySelector("#result"),
result = '';

optionValue.addEventListener("change", (e) => {
    result = e.target.value;
});


btnValue.addEventListener('click', () => {
    fetch('/api/selectbox/submit', {
        method : 'POST',
        headers : {
            'Content-type' : 'application/json; charset=utf-8'
        },
        body : JSON.stringify({
            answer: result
        }),
    })
    .then((res) => res.json())
    .then((res) => {res === true ? resultText.innerText="정답" 
    : resultText.innerText="오답";});
})