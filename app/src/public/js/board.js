"use strict";
const button = document.querySelector(".icon");
const table = document.querySelector("table tbody");
// console.log(button);
const judgeArr = [];
let Answer;

const search = () => {
  fetch("https://dongurami.tk/api/board/notice", {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((res) => res.json())
    .then((searchAnswer) => {
      Answer = searchAnswer;
      createTable(Answer);
      console.log(Answer);
    });
};
search();
const createTable = (Answer) => {
  for (let index = 0; index < Answer.boards.length; index++) {
    const tr = document.createElement("tr");

    if (!judgeArr.includes(Answer.boards[index].no)) {
      tr.innerHTML = `<td  class="no">${Answer.boards[index].no}</td>
        <td class="title">${Answer.boards[index].title}</td>
        <td class="studentName">${Answer.boards[index].studentName}</td>
        <td class="inDate">${Answer.boards[index].inDate}</td>
        <td class="hit">${Answer.boards[index].hit}</td>
        <td class="emotionCount">${Answer.boards[index].emotionCount}</td>`;
      table.appendChild(tr);
    }
    judgeArr.push(Answer.boards[index].no);
  }
};

// button.addEventListener("click", search);
