//Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

//import Icon from '../accets/User2.svg';

//Import moment library
var moment = require('moment');
moment().format();

//переменные для элементов DOM
const saveTaskBtn = document.querySelector('.save_task__btn');
const tasksList = document.querySelector('.tasks_list');
const taskName = document.getElementById('task_name');
const taskDescription = document.getElementById('task_description');
const deadlineDate = document.querySelector('.end_date');
const deadlineTime = document.querySelector('.end_time');
const todayDate = document.querySelector('.today_date');
let ingridients = document.getElementById('ingridients');
let sugar = document.getElementById('sugar');
let iron = document.getElementById('iron');
let vitaminC = document.getElementById('vitaminC');
let calories = document.getElementById('calories');
let calcium = document.getElementById('calcium');
let getFox = document.getElementById('getFox');
let close = document.getElementById('close');
// const priorityHigh = document.getElementById('priority_btn-high');
// const priorityMedium = document.getElementById('priority_btn-medium');
// const priorityLow = document.getElementById('priority_btn-low');
// const partPersonal = document.getElementById('part_btn-personal');
// const partWork = document.getElementById('part_btn-work');
// const partStudy = document.getElementById('part_btn-study');
// const partHealth = document.getElementById('part_btn-health');
// const partFinance = document.getElementById('part_btn-finance');
// const partOther = document.getElementById('part_btn-other');

//Код Веры



  function getrandomFox(){
  let API = `https://randomfox.ca/floof/`;
  
  let randomFox = fetch(API).then((res) => res.json()).then((data) => getFox.src =data.image);
	}
	document.getElementById('seeFox').addEventListener('click', getrandomFox);
function closeFox(){
	getFox.src ='';
}
document.getElementById('close').addEventListener('click', closeFox);
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


  function makeUsersList(event) {
    let inputName = document.getElementById('task_name user_name');
    let inputNickname = document.getElementById('task_name nick_name');
    let users = {
      name: inputName.value,
      nickname: inputNickname.value,
    };
    let stringifyusers = JSON.stringify(users);
    localStorage.setItem('user', stringifyusers);
  
   console.log('Новый пользователь был записан в Local Storage.');
  
   let pictureSet = document.querySelector('.picture');
    let nicknameSet = document.querySelector('.nickname_result');
  
    nicknameSet.textContent = users.nickname;
    let userImg = `./accets/User${Math.ceil(Math.random()*3-1)}.svg`;
    
    // const myIcon = new Image();
    // myIcon.src = Icon;
    // pictureSet.appendChild(myIcon);
    pictureSet.setAttribute('src', userImg);
    event.preventDefault();
    }
  
    document.querySelector('.save_user__btn').addEventListener('click', makeUsersList);

  



//function showRegistrationForm() {
//    document.getElementById('registrationForm').style.display = 'block';
//  }
  //window.onload = showRegistrationForm();


// Код Насти



// Код Тани

// function getTaskObj() {
//   const input = document.getElementById('form_task');
//   let x = input.value;
//   if(x.trim() !== ''){
//     let tasksArray = window.localStorage.getItem("tasksArray");
//     tasksArray = tasksArray ? JSON.parse(tasksArray) : [];
//     tasksArray.push(input.value);
//     window.localStorage.setItem("tasksArray",JSON.stringify(tasksArray));
//   }
//   list.innerHTML = '';
//   getSavedList();
//   input.value = '';
// }
todayDate.innerText = moment().format("LL");
document.getElementById('task_making_form').addEventListener('submit', function(event) {
  event.preventDefault();
});

let priorityColor;
let partStr;
let deadline;

function setPriorityColor(){
	let priorityElements = document.forms.taskMaking.elements.prioritybtn;
	for (let i of priorityElements){
		if (i.checked == true){
			priorityColor = `${i.value}_lable`;
		}
	}
}

function setPartStr(){
	let partElements = document.forms.taskMaking.elements.lifepartbtn;
	for (let el of partElements){
		if (el.checked == true){
			let currentSpan = el.nextElementSibling;
			partStr = currentSpan.textContent;
		}
	}
}

function setDeadline() {
	let startDate = moment();
	//let startTime
	let taskDeadlinDate = moment(`${deadlineDate.value}T${deadlineTime.value}`);
	deadline = taskDeadlinDate.diff(startDate, 'ч.')
} 

class taskCard {
	constructor(name, description, deadline, color, lifepart){
		this.name = name;
		this.description = description;
		this.deadline = deadline;
		this.color = color;
		this.lifePart = lifepart;
	}

	makeObj(){

	}

	createTask(){
		this.element = document.createElement('div');
		this.priorityLifeEl = document.createElement('div');
		this.partLifeEl = document.createElement('div');
		this.checkEl = document.createElement('input');
		this.contentBoxEl = document.createElement('div');
		this.nameEl = document.createElement('p');
		this.descriptionEl = document.createElement('p');
    this.deadlineEl = document.createElement('div');
		tasksList.appendChild(this.element);
		this.element.appendChild(this.priorityLifeEl);
		this.element.appendChild(this.checkEl);
		this.element.appendChild(this.contentBoxEl);
		this.contentBoxEl.appendChild(this.nameEl);
		this.contentBoxEl.appendChild(this.descriptionEl);
		this.element.appendChild(this.deadlineEl);
		this.element.setAttribute('class','new_task_element')
		this.checkEl.setAttribute('type','checkbox');
		this.checkEl.setAttribute('class','task_checkbox');
		this.nameEl.setAttribute('class','task_name_text');
		this.descriptionEl.setAttribute('class', 'description_text');
		this.priorityLifeEl.setAttribute('class', this.color);
		this.contentBoxEl.setAttribute('class','content_task_box')
		this.partLifeEl.textContent  = this.lifePart;
		this.nameEl.innerText = this.name;
		this.descriptionEl.innerText = this.description;
		this.deadlineEl.innerText = this.deadline;
	}

	showTask(){

	}
}

saveTaskBtn.addEventListener('click', () =>{
	setPriorityColor();
	setPartStr();
	let taskObject = new taskCard(taskName.value, taskDescription.value, deadline, priorityColor, partStr);
	taskObject.createTask();
	//taskObject.makeObj();
})
