"use strict";
// let writerHidden = res.boards.writerHiddenFlag;
const parentTable = document.querySelector("table");
const noticePostNumDiv = document.querySelector(".noticePostNumDiv");


fetch ('https://dongurami.tk/api/board/notice', {
    method: 'GET',
})
    .then((res) => res.json())
    .then((res) => {
        for (let i = 0; i < res.boards.length; i ++) {
            let num = res.boards[i].no;
            let title = res.boards[i].title;
            let writer = res.boards[i].studentName;
            let date = res.boards[i].inDate;
            let views = res.boards[i].hit;
            let likes = res.boards[i].emotionCount;
            const newTr = document.createElement('tr')
            
            newTr.innerHTML = `<td>${num}</td>
                                <td>${title}</td>
                                <td>${writer}</td>
                                <td>${date}</td>
                                <td>${views}</td>
                                <td>${likes}</td>`
                                parentTable.appendChild(newTr);
        
        }
        let noticePostNum = res.boards.length;
        noticePostNumDiv.innerHTML = `총 ${noticePostNum}건의 글이 있습니다.`;
    })