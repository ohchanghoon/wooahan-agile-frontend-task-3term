"use strict";

const table = document.querySelector("#free-notice");

function innerHtmlKey(notice) {
  return ` 
  <td>${notice.no}</td>
  <td>${notice.title}</td>
  <td>${notice.studentName}</td>
  <td>${notice.inDate}</td>
  <td>${notice.hit}</td>
  <td>${notice.emotionCount}</td>
  `;
}

function homepage() {
  fetch("https://dongurami.tk/api/board/notice", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      for (let i = 0; i < res.boards.length; i++) {
        let tr = document.createElement(`tr`);
        tr.innerHTML = innerHtmlKey(res.boards[i]);
        table.appendChild(tr);
      }
    })
    .catch((err) => {
      console.error("게시글 조회에 실패하셨습니다.");
    });
}

homepage();
