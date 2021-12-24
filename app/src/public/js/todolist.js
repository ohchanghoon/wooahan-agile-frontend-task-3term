"use strict";

const getData = () => {
    fetch("/api/todolist", {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=utf-8",
        },
    })
        .then((res) => res.json())
        .then((res) => {
            newTable(res);
        });
};
getData();

const makeTdName = (name) => {
    const newTdName = document.createElement("td");
    newTdName.innerText = name;
    return newTdName;
};
const makeTdDes = (desc) => {
    const newTdDes = document.createElement("td");
    newTdDes.innerText = desc;
    return newTdDes;
};

// (a, b) => {
//     const newTdUpdate = document.createElement("td");
//     const newButtonUpdate = document.createElement("button");
//     newButtonUpdate.setAttribute("id", a);
//     newButtonUpdate.setAttribute("onclick", clickUpdate(newButtonUpdate));
//     newButtonUpdate.innerText = b;
//     newTdUpdate.append(newButtonUpdate);
//     return newTdUpdate;
// }

// ('td-update', '수정')

const makeUpdateBtn = () => {
    const newTdUpdate = document.createElement("td");
    const newButtonUpdate = document.createElement("button");
    newButtonUpdate.setAttribute("id", "td-update");
    newButtonUpdate.setAttribute("onclick", clickUpdate(newButtonUpdate));
    newButtonUpdate.innerText = "수정";
    newTdUpdate.append(newButtonUpdate);
    return newTdUpdate;
};

const makeDelBtn = () => {
    const newTdDel = document.createElement("td");
    const newButtonDel = document.createElement("button");
    newButtonDel.setAttribute("id", "td-delete");
    newButtonDel.setAttribute("onclick", clickDel(newButtonDel));
    newButtonDel.innerText = "삭제";
    newTdDel.append(newButtonDel);
    return newTdDel;
};
const makeTr = (name, desc, id) => {
    const newTr = document.createElement("tr");
    newTr.setAttribute("index", id);
    newTr.append(
        makeTdName(name),
        makeTdDes(desc),
        makeUpdateBtn(),
        makeDelBtn()
    );
    return newTr;
};
const newTable = (getList) => {
    const names = getList.map((item) => item.name);
    const ids = getList.map((item) => item.id);
    const descriptions = getList.map((item) => item.description);

    names.forEach((item, index) => {
        const addSpace = document.querySelector("table");
        addSpace.append(makeTr(item, descriptions[index], ids[index]));
    });
};

const nameTag = document.querySelector("#name");
const desTag = document.querySelector("#description");
const registerTag = document.querySelector("#description + button");

let getName = "";
let getDes = "";

nameTag.addEventListener("change", (e) => {
    getName = e.target.value;
});

desTag.addEventListener("change", (e) => {
    getDes = e.target.value;
});

registerTag.addEventListener("click", () => {
    getName && getDes
        ? fetch("/api/todolist", {
              method: "POST",
              headers: {
                  "Content-type": "application/json; charset=utf-8",
              },
              body: JSON.stringify({
                  name: getName,
                  description: getDes,
              }),
          })
              .then((res) => res.text())
              .then((res) => {
                  const addSpace = document.querySelector("table");
                  addSpace.append(makeTr(getName, getDes, res));
              })
        : alert("빈 칸을 채워주세요");
});

const clickDel = (button) => {
    button.addEventListener("click", (event) => {
        const getId = event.target.parentNode.parentNode.getAttribute("index");
        fetch(`/api/todolist/${getId} `, {
            method: "DELETE",
        })
            .then((res) => res.text())
            .then((res) => {
                event.target.parentNode.parentNode.remove();
            });
    });
};

const clickUpdate = (button) => {
    button.addEventListener("click", (event) => {
        const getId = event.target.parentNode.parentNode.getAttribute("index");
        getName && getDes
            ? fetch(`/api/todolist/${getId} `, {
                  method: "PUT",
                  headers: {
                      "Content-type": "application/json; charset=utf-8",
                  },
                  body: JSON.stringify({
                      name: getName,
                      description: getDes,
                  }),
              })
                  .then((res) => res.text())
                  .then((res) => {
                      event.target.parentNode.parentNode.querySelector(
                          "td"
                      ).innerText = getName;
                      event.target.parentNode.parentNode.querySelector(
                          "td+td"
                      ).innerText = getDes;
                  })
            : alert("빈 칸을 채워주세요");
    });
};
