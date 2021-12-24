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
      let totalBoard = document.querySelector('#total-board');
      totalBoard.innerText = data.boards.length;
    });
}

function printBoard(data) {
  const tbody = document.querySelector('tbody');
  const newTr = document.createElement('tr');

  newTr.innerHTML = `
  <td>${data.no}</td>
  <td>${data.title}</td>
  <td>${data.studentName}</td>
  <td>${data.inDate.slice(0, 10)}</td>
  <td>${data.hit}</td>
  <td>${data.emotionCount}</td>
  `;
  tbody.appendChild(newTr);
}

readBoard();
