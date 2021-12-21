"use strict";

const getSelect = document.querySelector('[name="selectbox"]');
let answer = "";
getSelect.addEventListener("change", function (e) {
    answer = e.target.value;
});
const judgeAnswer = {
    true: "정답",
    false: "오답",
};
document.querySelector("#submit-btn").addEventListener("click", function () {
    fetch("/api/selectbox/submit", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            answer,
        }),
    })
        .then((res) => {
            console.log("res :>> ", res);
            return res.json();
        })
        .then((res) => {
            console.log(`res`, res);
            document.querySelector("#result").innerText = judgeAnswer[res];
        });
    // then 두번 쓰는 이유 >> fetch 공부
});
