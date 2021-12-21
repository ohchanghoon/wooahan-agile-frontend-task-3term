"use strict";

const getSelect = document.querySelector("select");
let answer = "";
getSelect.addEventListener("change", function (e) {
    answer = e.target.value;
});
const judgeAnswer = {
    true: "정답",
    false: "오답",
};
document.getElementById("submit-btn").addEventListener("click", function () {
    fetch("/api/selectbox/submit", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            answer,
        }),
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(`res`, res);
            document.getElementById("result").innerText = judgeAnswer[res];
        });
    // then 두번 쓰는 이유 >> fetch 공부
});
