'use strict';

function readBoard() {
  const request = {
    method: 'GET',
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  };

  fetch('https://dongurami.tk/api/board/notice', request)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.boards);
      for (let i = 0; i < data.boards.length; i++) {
        console.log(data.boards[i].no);
        printBoard(data.boards[i]);
      }
    });
}

function printBoard(data) {
  const tbody = document.querySelector('tbody');
  const newTr = document.createElement('tr');
  // newTr.setAttribute('index', index.id);
  newTr.innerHTML = `
  <td class="no">${data.no}</td>
  <td class="title">${data.title}</td>
  <td class="studentName">${data.studentName}</td>
  <td class="inDate">${data.inDate}</td>
  <td class="hit">${data.hit}</td>
  <td class="emotionCount">${data.emotionCount}</td>
  `;
  // console.log('4', index.id);
  tbody.appendChild(newTr);
}

readBoard();
