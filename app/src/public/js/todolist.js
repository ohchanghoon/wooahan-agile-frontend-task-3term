"use strict";
const idName = document.querySelector("#name");
const idDescription = document.querySelector("#description");
const idtable = document.querySelector("table");
const button = document.querySelector("button");
let indexCode = {};

const lookUp = () => {
  fetch("/api/todolist", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((lookUpAnswer) => {
      indexCode = lookUpAnswer;
      createNewDiv(indexCode);
    });
};
//처음에 들어있는 데이터들을 조회 시켜주는 함수임
lookUp();
//lookUp()을 통해 조회 시켜주기
const regist = (e) => {
  const registAPI = {
    name: idName.value,
    description: idDescription.value,
  };

  fetch("/api/todolist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(registAPI),
  })
    .then((res) => res.text())
    .then((data) => location.reload());
};

//등록하는 과정 API 명세를 보고 fetch함수를 통하여 데이터를 백엔드에 전달해 주어 등록시켜주는 함수를 만들어 준다.

const createNewDiv = (indexCode) => {
  for (let index = 0; index < indexCode.length; index++) {
    const newTr = document.createElement("tr");
    const id = indexCode[index].id;

    newTr.setAttribute("index", `${id}`);

    newTr.innerHTML = `<td>${indexCode[index].name}</td>
  <td >${indexCode[index].description}</td>
  <td ><button id="update">Update</button></td>
  <td ><button id="delete">Delete</button></td>`;
    idtable.appendChild(newTr);
  }
};

function deleteLable(e) {
  const delIndex = e.target.parentNode.parentNode.getAttribute("index");

  fetch(`/api/todolist/${delIndex}`, {
    method: "DELETE",
  })
    .then((res) => res.text())
    .then((res) => {
      e.target.parentNode.parentNode.remove();
    });
}
function updateLable(e) {
  const updateIndex = e.target.parentNode.parentNode.getAttribute("index");
  const updateAPI = {
    name: idName.value,
    description: idDescription.value,
  };

  fetch(`/api/todolist/${updateIndex}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateAPI),
  })
    .then((res) => res.text())
    .then((data) => {
      e.target.parentNode.parentNode.childNodes[0].innerText = idName.value;
      e.target.parentNode.parentNode.childNodes[2].innerText =
        idDescription.value;
    });
}
const judge = (e) => {
  if (e.target.id === "delete") {
    deleteLable(e);
  } else updateLable(e);
};
idtable.addEventListener("click", judge);
button.addEventListener("click", regist);
