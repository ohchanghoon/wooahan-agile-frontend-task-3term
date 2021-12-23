"use strict";

const Btn = document.querySelector("button");
const title = document.getElementById("name");
const description = document.getElementById("description");
const table = document.querySelector("table");
req();

function toDo(key) {
  return ` 
  <td>${key.name}</td>
  <td>${key.description}</td>
  <td><button id="td-update">수정</button></td>
  <td><button id="td-delete">삭제</button></td>
  `;
}

function req() {
  fetch("/api/todolist", {
    method: "GET",
    headers: {
      "Content-Type": "text/html",
      charset: "utf-8",
    },
  })
    .then((res) => res.json())
    .then((answer) => {
      for (let i = 0; i < answer.length; i++) {
        const getTr = document.createElement(`tr`);
        getTr.setAttribute("index", answer[i].id);
        getTr.innerHTML = toDo(answer[i]);
        table.append(getTr);
      }
    });
}

const add = () => {
  const data = {
    name: title.value,
    description: description.value,
  };
  console.log(data);

  fetch("/api/todolist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then((answer) => {
      if (data.name === "" || data.description === "") {
        alert("To Do 등록 실패");
      } else {
        req();
      }
    });
};

Btn.addEventListener("click", add);

function tableClick(e) {
  const click = e.target;
  const tr = click.parentNode.parentNode;
  const index = tr.getAttribute("index");

  if (click.id === "td-delete") {
    trDelete(tr, index);
  } else {
    trUpdate(tr, index);
  }
}

function trDelete(tr, index) {
  fetch(`/api/todolist/${index}`, {
    method: "DELETE",
  })
    .then((res) => res.text())
    .then((res) => {
      if (res === index) table.removeChild(tr);
    });
}

function trUpdate(tr, index) {
  const data = {
    name: title.value,
    description: description.value,
  };
  console.log(data);
  fetch(`/api/todolist/${index}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then((res) => {
      if (res === index) tr.innerHTML = toDo(data);
    });
}
table.addEventListener("click", tableClick);
