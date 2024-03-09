//Import our custom CSS
import "../scss/styles.scss";
// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

//Import moment library
var moment = require("moment");
moment().format();

//переменные для элементов DOM
const saveTaskBtn = document.querySelector(".save_task__btn");
const tasksList = document.querySelector(".tasks_list");
const taskName = document.getElementById("task_name");
const taskDescription = document.getElementById("task_description");
const deadlineDate = document.querySelector(".end_date");
const deadlineTime = document.querySelector(".end_time");
const todayDate = document.querySelector(".today_date");
let ingridients = document.getElementById("ingridients");
let sugar = document.getElementById("sugar");
let iron = document.getElementById("iron");
let vitaminC = document.getElementById("vitaminC");
let calories = document.getElementById("calories");
let calcium = document.getElementById("calcium");
let getFox = document.getElementById("getFox");
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

function onBtnClick() {
    let ingridientsValue = ingridients.value;
    //const API = 'https://api.edamam.com/api/nutrition-data?app_id=d7be0f59&app_key=7670b7efd74aa8278e4343bfd8644a49&nutrition-type=cooking&ingr=1%20onion'
    let API = `https://api.edamam.com/api/nutrition-data?app_id=d7be0f59&app_key=7670b7efd74aa8278e4343bfd8644a49&nutrition-type=cooking&ingr=1%20${ingridientsValue}`;

    let caloriesResult = fetch(API)
        .then((res) => res.json())
        .then((data) => (calories.textContent = Math.ceil(data.totalNutrients.ENERC_KCAL.quantity)))
		.catch((err) => console.log ('Произошла ошибка при получении данных'));
    let sugarResult = fetch(API)
        .then((res) => res.json())
        .then((data) => (sugar.textContent = Math.ceil(data.totalNutrients.SUGAR.quantity)))
		.catch((err) => console.log ('Произошла ошибка при получении данных'));
		let ironResult = fetch(API)
        .then((res) => res.json())
        .then((data) => (iron.textContent = Math.ceil(data.totalNutrients.FE.quantity)))
		.catch((err) => console.log ('Произошла ошибка при получении данных'));
		let vitaminCResult = fetch(API)
        .then((res) => res.json())
        .then((data) => (vitaminC.textContent = Math.ceil(data.totalNutrients.VITC.quantity)))
		.catch((err) => console.log ('Произошла ошибка при получении данных'));
		let calciumCResult = fetch(API)
        .then((res) => res.json())
        .then((data) => (calcium.textContent = Math.ceil(data.totalNutrients.CA.quantity)))
		.catch((err) => console.log ('Произошла ошибка при получении данных'));
}
document.getElementById("button_find").addEventListener("click", onBtnClick);

function onBtnClickCleaner() {
    calories.textContent = 0;
    sugar.textContent = 0;
    iron.textContent = 0;
    vitaminC.textContent = 0;
    calcium.textContent = 0;
    ingridients.value = "";
}
document.getElementById("button_cleaner").addEventListener("click", onBtnClickCleaner);

  function getRandomFox(){
  let API = `https://randomfox.ca/floof/`;
  
  let randomFox = fetch(API)
  .then((res) => res.json())
  .then((data) => getFox.src =data.image)
 .catch((err) => console.log('Не удалось получить данные'));

	}
	document.getElementById('seeFox').addEventListener('click', getRandomFox);
function closeFox(){
	getFox.src ='';
}
document.getElementById('close').addEventListener('click', closeFox);
// Код Нади
function makeQuote() {
    fetch("https://stoic.tekloon.net/stoic-quote")
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            let quote = document.getElementById("quote");
            let author = document.getElementById("author");
            quote.textContent = res.quote;
            author.textContent = res.author;
        })
        .catch((err) => {
            console.log("Произошла ошибка");
        });
}
window.addEventListener("load", () => {
    makeQuote();
});

function makeUsersList(event) {
  let inputName = document.getElementById('task_name user_name');
  let inputNickname = document.getElementById('task_name nick_name');
  let randNumb = Math.ceil(Math.random()*3-1);
  
  let users = {
    name: inputName.value,
    nickname: inputNickname.value,
    pictureNumber: randNumb,
  };
  let stringifyusers = JSON.stringify(users);
  localStorage.setItem('user', stringifyusers);

 console.log('Новый пользователь был записан в Local Storage.');

 let pictureSet = document.querySelector('.profile-img');
  let nicknameSet = document.querySelector('.nickname_result');

  let usersJSON = localStorage.getItem('user');
  let usersObject = JSON.parse(usersJSON);
  
  nicknameSet.innerHTML = usersObject.nickname;
  let userImg = `./accets/User${randNumb}.svg`;
  pictureSet.setAttribute('src', userImg);
  event.preventDefault();
  }

document.querySelector(".save_user__btn").addEventListener("click", makeUsersList);
//window.onload = makeUsersList();

function setUserWhenLoadpage() {
  let pictureSet = document.querySelector('.profile-img');
  let nicknameSet = document.querySelector('.nickname_result');

  let usersJSON = localStorage.getItem('user');
  let usersObject = JSON.parse(usersJSON);
  
  nicknameSet.innerHTML = usersObject.nickname;
  //nicknameSet.innerHTML = users.nickname;
  let userImg = `./accets/User${usersObject.pictureNumber}.svg`;
  pictureSet.setAttribute('src', userImg);
}

window.onload = setUserWhenLoadpage();

//function showRegistrationForm() {
//    document.getElementById('registrationForm').style.display = 'block';
//  }

// Код Насти

const tasksLinks = document.getElementsByClassName("tasksLink");

const menuListContainer = document.getElementById("menuListContainer");

// добавить заголовок на стринцу !!
const title = document.getElementById("title");

menuListContainer.addEventListener("click", function (evt) {
    const eventTarget = evt.target;
    // получание на стрианице группы задач
    // получить коллекцию из всех задач tasks !!
    // for (let i = 0; i < tasks.length; i += 1) {
    // const task=tasks[i]
    //     if (task.classList.contains(eventTarget.id)) {
    //         task.classList.remove("disabled");
    //     } else {
    //         task.classList.add("disabled");
    //     }
    // }
    // отображаем в меню выбранный раздел
    for (let i = 0; i < tasksLinks.length; i += 1) {
        if (tasksLinks[i].id === eventTarget.id) {
            tasksLinks[i].classList.add("active-link");
        } else {
            tasksLinks[i].classList.remove("active-link");
        }
    }
    // отображаем в заголовке выбранный раздел
    // if (eventTarget.id === "anyTask" || eventTarget.classList.contains("categoryLink")) {
    //     title.textContent = eventTarget.textContent;
    // } else if (eventTarget.classList.contains("simpleLink")) {
    //     title.textContent = eventTarget.textContent + " задачи";
    // } else if (eventTarget.classList.contains("priorityLink")) {
    //     title.textContent = eventTarget.textContent + " приоритет";
    // }
});

// Код Тани

todayDate.innerText = moment().format("LL");
document.getElementById("task_making_form").addEventListener("submit", function (event) {
    event.preventDefault();
});

let priorityColor;
let partStr;
let deadline;
let taskMemoryObj = {};
let taskId;
let arrayFromStorage;

class taskCard {
	constructor(name, description, deadline, color, lifepart, deadlineDate, deadlineTime, id, checkbox){
		this.name = name;
		this.description = description;
		this.deadline = deadline;
		this.color = color;
		this.lifePart = lifepart;
		this.deadlineDate = deadlineDate;
		this.deadlineTime = deadlineTime;
		this.id = id;
		this.checkbox = checkbox;
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
		this.contentBoxEl.appendChild(this.partLifeEl);
		this.contentBoxEl.appendChild(this.nameEl);
		this.contentBoxEl.appendChild(this.descriptionEl);
		this.element.appendChild(this.deadlineEl);
		this.element.setAttribute('class','new_task_element');
		this.checkEl.setAttribute('type','checkbox');
		this.checkEl.setAttribute('class','task_checkbox');
		this.checkEl.setAttribute('id',this.id);
		this.checkEl.setAttribute('onclick', 'addCheck(this)');
		this.partLifeEl.setAttribute('class','part_life_element')
		this.nameEl.setAttribute('class','task_name_text');
		this.descriptionEl.setAttribute('class', 'description_text');
		this.priorityLifeEl.setAttribute('class', this.color);
		this.contentBoxEl.setAttribute('class','content_task_box');
		this.partLifeEl.innerText  = this.lifePart;
		this.nameEl.innerText = this.name;
		this.descriptionEl.innerText = this.description;
		this.deadlineEl.innerText = this.deadline;
		if(this.checkbox == "checked") {
			this.checkEl.setAttribute('checked','checked');
		}
	}

	makeObj(){
		taskMemoryObj.name = this.name;
		taskMemoryObj.description = this.description;
		taskMemoryObj.color = this.color;
		taskMemoryObj.lifePart = this.lifePart;
		taskMemoryObj.deadlineDate = this.deadlineDate;
		taskMemoryObj.deadlineTime = this.deadlineTime;
		taskMemoryObj.id = this.id;

		if(this.checkEl.checked == true){
			taskMemoryObj.checkbox = "checked";
		}
	}

	// showTask(){

	// }
}

function checkStorage() {
	arrayFromStorage = localStorage.getItem('tasksStorage');
	arrayFromStorage = arrayFromStorage ? JSON.parse(arrayFromStorage) : [];
}

function setDeadline() {
	let startDate = moment();
	let taskDeadlinDate = moment(`${deadlineDate.value}T${deadlineTime.value}`);
	deadline = taskDeadlinDate.diff(startDate, 'ч.')
} 

function setTaskObjectToStorage() {
	checkStorage();
	arrayFromStorage.push(taskMemoryObj);
	window.localStorage.setItem("tasksStorage", JSON.stringify(arrayFromStorage));
}

function getTaskList() {
	setDeadline();
  checkStorage();
	for (let obj of arrayFromStorage){
			let cardObject = new taskCard (obj.name, obj.description, deadline, obj.color, obj.lifePart, obj.deadlineDate, obj.deadlineTime, obj.id, obj.checkbox);
			cardObject.createTask();
		}
	}
	getTaskList();

function setPriorityColor() {
    let priorityElements = document.forms.taskMaking.elements.prioritybtn;
    for (let i of priorityElements) {
        if (i.checked == true) {
            priorityColor = `${i.value}_lable`;
			i.checked = '';
        }
    }
}

function setPartStr() {
    let partElements = document.forms.taskMaking.elements.lifepartbtn;
    for (let el of partElements) {
        if (el.checked == true) {
            let currentSpan = el.nextElementSibling;
            partStr = currentSpan.textContent;
			el.checked ='';
        }
    }
}

function setId() {
	let idArray = localStorage.getItem('idArray');
	idArray = idArray ? JSON.parse(idArray) : [];
	if (idArray.length == 0) {
		taskId = 'taskId1';
	}else{
		let num = idArray.length+1
		taskId = `taskId${num}`;
		}
	idArray.push(taskId);
}

function addCheck(el) {
	let checkboxId = el.id;
	checkStorage();
	for (let obj of arrayFromStorage){
		obj.forEach(date => {
			if (date.id == checkboxId){
				date.checkbox = "checked";
			}
		});
	}
}

saveTaskBtn.addEventListener('click', () =>{
	setPriorityColor();
	setPartStr();
	setDeadline();
	setId();
	let taskObject = new taskCard(taskName.value, taskDescription.value, deadline, priorityColor, partStr, deadlineDate.value, deadlineTime.value, taskId);
	taskObject.createTask();
	taskObject.makeObj();
	setTaskObjectToStorage();
	taskName.value = '';
	taskDescription.value = '';
	deadlineDate.value = '';
	deadlineTime.value = '';
})


//Clean LokalStorage

const clearLocalStorage = () => {
	window.localStorage.clear();
	console.log('Local Storage очищен.');
};

document.querySelector('.b-18').addEventListener('click', clearLocalStorage);
