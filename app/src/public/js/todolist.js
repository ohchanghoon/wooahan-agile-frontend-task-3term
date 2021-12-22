"use strict";

const name = document.querySelector("#name"),
  description = document.querySelector("#description");
const table = document.querySelector("table");
const regBtn = document.querySelector("button");

table.addEventListener("click", tableHandler);
regBtn.addEventListener("click", reg);

function inquire() {
  fetch("/api/todolist", {
    method: "GET",
  })
    .then((res) => res.text())
    .then((res) => {
      // 흠..
    })
    .catch((err) => {
      console.error("To Do 조회에 실패하셨습니다.");
    });
}

function reg() {
  const user = {
    name: name.value,
    description: description.value,
  };
  const tr = document.createElement(`tr`);

  tr.innerHTML = `
        <td>${user.name}</td>
        <td>${user.description}</td>
        <td><button id="td-update">수정</button></td>
        <td><button id="td-delete">삭제</button></td>
    `;

  table.appendChild(tr);

  fetch("/api/todolist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.text())
    .then((res) => {
      if (typeof res === "string") {
        tr.setAttribute("index", res);
      } else {
        alert("To Do 등록에 실패하셨습니다.");
      }
    })
    .catch((err) => {
      console.error("To Do 등록에 실패하셨습니다.");
    });
}

function tableHandler(e) {
  const target = e.target;
  const currentTr = target.parentNode.parentNode;
  const index = currentTr.getAttribute("index");

  switch (target.id) {
    case "td-update":
      trUpdate(currentTr, index);
      break;
    case "td-delete":
      trDelete(currentTr, index);
      break;
    default:
      break;
  }
}

function trUpdate(currentTr, index) {
  const updateUser = {
    name: name.value,
    description: description.value,
  };

  fetch(`/api/todolist/${index}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(updateUser),
  })
    .then((res) => res.text())
    .then((res) => {
      if (res === index) {
        currentTr.innerHTML = `
                <td>${updateUser.name}</td>
                <td>${updateUser.description}</td>
                <td><button id="td-update">수정</button></td>
                <td><button id="td-delete">삭제</button></td>
            `;
      } else {
        alert("To Do 수정에 실패하셨습니다.");
      }
    })
    .catch((err) => {
      console.error("To Do 수정에 실패하셨습니다.");
    });
}

function trDelete(currentTr, index) {
  fetch(`/api/todolist/${index}`, {
    method: "DELETE",
  })
    .then((res) => res.text())
    .then((res) => {
      if (res === index) {
        table.removeChild(currentTr);
      } else {
        alert("To Do 삭제에 실패하셨습니다.");
      }
    })
    .catch((err) => {
      console.error("To Do 삭제에 실패하셨습니다.");
    });
}
