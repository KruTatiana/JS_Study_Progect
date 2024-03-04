//Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

//Import moment library
var moment = require('moment');
moment().format();

//переменные для элементов DOM
const addTaskBtn = document.querySelector('.add_task');
const taskName = document.getElementById('task_name');
const taskDescription = document.getElementById('task_description');


//Код Веры



// Код Нади
function makeQuote() {
	fetch('https://stoic.tekloon.net/stoic-quote')
	.then((res) => {
		return res.json();
})
	.then((res) => {
		let quote = document.getElementById("quote");
		let author = document.getElementById('author');
		quote.textContent = res.quote; 
		author.textContent = res.author;
})
.catch((err) => {
    console.log('Произошла ошибка');
  });
}
window.addEventListener('load', () => {
	makeQuote();
  });


  function makeUsersList() {
  let inputName = document.getElementById('user_name');
  let names = {name: inputName.value};
  let stringifyInputName = JSON.stringify(names);
  localStorage.setItem('name', stringifyInputName);

  let inputNickname = document.getElementById('nick_name');
  let nickNames = {nickname: inputNickname.value};
  let stringifyInputNickname = JSON.stringify(nickNames);
  localStorage.setItem('nickname', stringifyInputNickname);

 console.log('Новый пользователь был записан в Local Storage.');
  }

  document.querySelector('.save_user__btn').addEventListener('click', makeUsersList);

//function showRegistrationForm() {
//    document.getElementById('registrationForm').style.display = 'block';
//  }
  //window.onload = showRegistrationForm();


// Код Насти



// Код Тани