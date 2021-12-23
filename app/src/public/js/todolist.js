'use strict';

let todoName = '';
let todoDesc = '';
const btn = document.querySelector('div button');
const tbody = document.querySelector('tbody');

function getName() {
  const name = document.querySelector('#name').value;
  todoName = name;
  return name;
}

function getDescription() {
  const description = document.querySelector('#description').value;
  todoDesc = description;
  return description;
}

// 조회

function readToDo() {
  const request = {
    method: 'GET',
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  };

  fetch('/api/todolist', request)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        printToDo(data[i]);
      }
    });
}

// 등록

function createToDo(name, description) {
  const data = {
    name: name,
    description: description,
  };
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  };

  fetch('/api/todolist', request)
    .then((data) => data.text())
    .then((data) => console.log(data))
    .then((data) => readToDo());
  // console.log(name, description);
}

function printToDo(index) {
  const newTr = document.createElement('tr');
  newTr.setAttribute('index', index.id);
  newTr.innerHTML = `
  <td>${index.name}</td>
  <td>${index.description}</td>
  <td><button id="td-update" onclick='updateToDo("${index.id}","${index.name}","${index.description}");'>수정</button></td>
  <td><button id="td-delete" onclick='deleteToDo("${index.id}");'>삭제</button></td>
  `;
  // console.log('4', index.id);
  tbody.appendChild(newTr);
}

btn.addEventListener('click', () => {
  const name = getName();
  const description = getDescription();
  createToDo(name, description);
});

// 수정

function updateToDo(index, name, description) {
  // console.log('update');
  // console.log(index);
  // console.log(name);
  // console.log('설명', description);
  const data = {
    name: name,
    description: description,
  };
  const request = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  };

  fetch(`/api/todolist/${index}`, request)
    .then((data) => data.text())
    .then((data) => {
      // readToDo();
      printToDo(index);
      console.log(data);
    });
}

// 삭제

function deleteToDo(index) {
  console.log('delete');
  fetch(`/api/todolist/${index}`, {
    method: 'DELETE',
  })
    .then((data) => data.text())
    .then((data) => {
      // readToDo();
      console.log(data);
    });
}

// 초기에 기본으로 조회되어야 함.
readToDo();
