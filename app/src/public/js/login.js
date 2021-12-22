let idBox = document.querySelector("#id");
let passwordBox = document.querySelector("#password");
let loginBtn = document.querySelector("#login");
let infoBtn = document.querySelector('#confirm')
let resultWellcome = document.querySelector('#result')
let resCode = '';

const logfetchFuc = () => {
    fetch('/api/login', {
        method : 'POST',
        headers : {
            'Content-type' : 'application/json; charset=utf-8'
        },
        body : JSON.stringify ({
            id : idBox.value,
            password : passwordBox.value
        }),
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.msg === 'success') {
            alert('코드가 발급되었습니다.');
            resCode = res.code;
        } else alert(res.msg);
    })

}
loginBtn.addEventListener('click', () => logfetchFuc());

const infofetchFuc = () => {
    fetch(`/api/check?code=${resCode}`, {
        method : 'GET',
        headers : {
            'Content-type' : 'application/json; charset=utf-8'
        }
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.msg === 'success') {
            resultWellcome.innerText = '우아한 애자일님 환영합니다.';
        } else alert(res.msg);
    })
}
infoBtn.addEventListener('click', () => infofetchFuc());