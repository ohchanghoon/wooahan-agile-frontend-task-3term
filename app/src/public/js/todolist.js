"use strict";

const nameInput = document.querySelector("#name");
const desInput = document.querySelector("#description");
const table = document.querySelector('table');
const registbtn = document.querySelector('button');

const getFetch = () => {
    fetch ('/api/todolist', {
        method:'GET',
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.length !== 0) {
                create(res);
            } else alert('현재 빈 등록 상태입니다.');
        })
}
const create = (res) => {
    for (let i = 0; i < res.length; i++) {
        let name = res[i].name;
        let des = res[i].description;
        let id = res[i].id
        let TRInTable = document.createElement(`tr`);
        TRInTable.setAttribute('index', `${id}`)

        table.appendChild(TRInTable);
        TRInTable.innerHTML = `<td>${name}</td>
                                <td>${des}</td>
                                <td><button id = 'asdf'>수정</button></td>
                                <td><button id = 'qwer'>삭제</button></td>`
    }
}

getFetch();             //1단계 : 창을 켰을 때 등록된 것 보이게 하기.

registbtn.addEventListener('click', () => {
    fetch ('/api/todolist', {
        method:'POST',
        headers:{
            'content-type':'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            name: nameInput.value,
            description: desInput.value
        })
    })
    .then((res) => res.text())
    .then((res) => {
        if (nameInput.value !== '' || desInput.value !== '') {
            let id = res
            let TRInTable = document.createElement(`tr`);
            TRInTable.setAttribute('index', `${id}`)
            table.appendChild(TRInTable);
            TRInTable.innerHTML = `<td>${nameInput.value}</td>
                                <td>${desInput.value}</td>
                                <td><button id = "asdf">수정</button></td>
                                <td><button id = "qwer">삭제</button></td>`
        }
         else alert('To Do 등록에 실패하였습니다.');
        })
})
const onClickUpdateBtn = (click, ind) => {
    fetch (`/api/todolist/${ind}`, {
        method: 'PUT',
        headers:{
            'content-type' : 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            name: nameInput.value,
            description: desInput.value
        })
    })
    .then((res) => res.text())
    .then((res) => {click.innerHTML = `<td>${nameInput.value}</td>
                                    <td>${desInput.value}</td>
                                    <td><button id = "asdf">수정</button></td>
                                    <td><button id = "qwer">삭제</button></td>`
                            })
}
const deleteTest = (e) => {
    const click = e.target.parentNode.parentNode;
    const index = click.getAttribute('index')
    if (e.target.id === "qwer") {
        onClickdeleteBtn(click, index)
    } else if (e.target.id === "asdf") {
        onClickUpdateBtn(click, index)
    }
    console.log(e.target.id);
}

table.addEventListener('click', deleteTest);

const onClickdeleteBtn = (click, index) => {
    fetch (`/api/todolist/${index}`, {
        method: 'DELETE',
    })
    .then((res) => res.text())
    .then((res) => {if (res === index) {
        table.removeChild(click);
    }})
}