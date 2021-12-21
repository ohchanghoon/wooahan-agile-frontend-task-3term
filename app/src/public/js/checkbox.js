'use strict';

let getChecked = () => {
  const query = 'input[type="checkbox"]:checked';
  const selectedEls = document.querySelectorAll(query);
  let check = [];

  selectedEls.forEach((el) => {
    check.push(el.value);
  });
  return check;
};

function getResult(check) {
  const data = {
    answers: check,
  };
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  };

  fetch('/api/checkbox/submit', request)
    .then((res) => res.json())
    .then((data) => changeResult(data));
}

function changeResult(data) {
  document.querySelector('#result').innerHTML = data ? '정답' : '오답';
}

document.querySelector('#submit_btn').addEventListener('click', () => {
  const value = getChecked();
  getResult(value);
});
