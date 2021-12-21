'use strict';

const selectPurpose = () => {
  let selectOption = document.querySelector('select');
  selectOption = selectOption.options[selectOption.selectedIndex].value;
  return selectOption;
};

const changeResult = (data) => {
  document.querySelector('#result').innerHTML = data ? '정답' : '오답';
};

function getResult(selectOption) {
  const data = {
    answer: selectOption,
  };
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  };

  fetch('/api/selectbox/submit', request)
    .then((res) => res.json())
    .then((data) => changeResult(data));
}

document.getElementById('submit-btn').addEventListener('click', () => {
  const value = selectPurpose();
  getResult(value);
});
