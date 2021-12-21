"use strict";

const getChecked = document.getElementById("checkbox");
const answers = [];
getChecked.addEventListener("change", function (e) {
    answers.push(e.target.value);
});

const judgeAnswer = {
    true: "정답",
    false: "오답",
};

document.getElementById("submit_btn").addEventListener("click", function () {
    fetch("/api/checkbox/submit", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ answers }),
    })
        .then((res) => res.json())
        .then((res) => {
            document.getElementById("result").innerText = judgeAnswer[res];
        });
});
