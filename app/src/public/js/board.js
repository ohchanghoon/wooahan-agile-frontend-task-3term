"use strict";

fetch("https://dongurami.tk/api/board/notice", {
    method: "GET",
})
    .then((res) => res.json())
    .then((res) => {
        requestNotice(res.boards);
    });

const makeTdName = (name) => {
    const newTdName = document.createElement("td");
    newTdName.innerText = name;
    return newTdName;
};
const makeTdTitle = (title) => {
    const newTdTitle = document.createElement("td");
    newTdTitle.innerText = title;
    return newTdTitle;
};
const makeTdUser = (user) => {
    const newTdUser = document.createElement("td");
    newTdUser.innerText = user;
    return newTdUser;
};
const makeTdDate = (date) => {
    const newTdDate = document.createElement("td");
    newTdDate.innerText = date;
    return newTdDate;
};
const makeTdHit = (hit) => {
    const newTdHit = document.createElement("td");
    newTdHit.innerText = hit;
    return newTdHit;
};
const makeTdEmot = (emot) => {
    const newTdEmot = document.createElement("td");
    newTdEmot.innerText = emot;
    return newTdEmot;
};

const makeTr = (noticeObj) => {
    const newTr = document.createElement("tr");
    newTr.append(
        makeTdName(noticeObj.no),
        makeTdTitle(noticeObj.title),
        makeTdUser(noticeObj.user),
        makeTdDate(noticeObj.date),
        makeTdHit(noticeObj.hit),
        makeTdEmot(noticeObj.emot)
    );
    return newTr;
};

const requestNotice = (notices) => {
    const noticeNumber = notices.length;
    const noticeAlarm = document.querySelector(".number-notice");
    noticeAlarm.innerText = noticeNumber;
    notices.forEach((item, index) => {
        const noticeObj = {
            no: item.no,
            title: item.title,
            user: item.user,
            date: item.date,
            hit: item.hit,
            emot: item.emot,
        };
        const addSpace = document.querySelector("table");
        addSpace.append(makeTr(noticeObj));
    });
};
