"use strict";
const getInputId = document.querySelector("#id");
const getInputPassword = document.querySelector("#password");

let getId = "";
let getPassword = "";
let getPrivateCode = "";

getInputId.addEventListener("change", (e) => {
    getId = e.target.value;
});
getInputPassword.addEventListener("change", (e) => {
    getPassword = e.target.value;
});

document.querySelector("#login").addEventListener("click", () => {
    fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ id: getId, password: getPassword }),
    })
        .then((res) => res.json())
        .then((res) => {
            alert(res.msg === "success" ? "코드가 발급되었습니다." : res.msg);
            getPrivateCode = res.code;
        });
});

document.querySelector("#confirm").addEventListener("click", () => {
    fetch(`/api/check?code=${getPrivateCode}`, {
        method: "GET",
    })
        .then((res) => res.json())
        .then((res) => {
            res.msg === "success"
                ? (document.querySelector(
                      "#result"
                  ).innerText = `${res.user.name}님 환영합니다.`)
                : alert(res.msg);
        });
});
