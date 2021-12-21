"use strict";

const getChecked = document.querySelector("#checkbox");
let answers = [];
getChecked.addEventListener("change", function (e) {
    const value = e.target.value;
    answers.includes(value)
        ? (answers = answers.filter((item) => item !== value))
        : answers.push(value);
});

const judgeAnswer = {
    true: "정답",
    false: "오답",
};

document.querySelector("#submit_btn").addEventListener("click", function () {
    fetch("/api/checkbox/submit", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ answers }),
    })
        .then((res) => res.json())
        .then((res) => {
            document.querySelector("#result").innerText = judgeAnswer[res];
        });
});
