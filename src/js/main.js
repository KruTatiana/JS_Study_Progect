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
const taskList = document.querySelector(".tasks_list");
let ingridients = document.getElementById("ingridients");
let sugar = document.getElementById("sugar");
let iron = document.getElementById("iron");
let vitaminC = document.getElementById("vitaminC");
let calories = document.getElementById("calories");
let calcium = document.getElementById("calcium");
let getFox = document.getElementById("getFox");
let close = document.getElementById("close");

//Код Веры

function onBtnClick() {
    let ingridientsValue = ingridients.value;
    //const API = 'https://api.edamam.com/api/nutrition-data?app_id=d7be0f59&app_key=7670b7efd74aa8278e4343bfd8644a49&nutrition-type=cooking&ingr=1%20onion'
    let API = `https://api.edamam.com/api/nutrition-data?app_id=d7be0f59&app_key=7670b7efd74aa8278e4343bfd8644a49&nutrition-type=cooking&ingr=1%20${ingridientsValue}`;

    let caloriesResult = fetch(API)
        .then((res) => res.json())
        .then((data) => (calories.textContent = Math.ceil(data.totalNutrients.ENERC_KCAL.quantity)));
    let sugarResult = fetch(API)
        .then((res) => res.json())
        .then((data) => (sugar.textContent = Math.ceil(data.totalNutrients.SUGAR.quantity)));
    let ironResult = fetch(API)
        .then((res) => res.json())
        .then((data) => (iron.textContent = Math.ceil(data.totalNutrients.FE.quantity)));
    let vitaminCResult = fetch(API)
        .then((res) => res.json())
        .then((data) => (vitaminC.textContent = Math.ceil(data.totalNutrients.VITC.quantity)));
    let calciumCResult = fetch(API)
        .then((res) => res.json())
        .then((data) => (calcium.textContent = Math.ceil(data.totalNutrients.CA.quantity)));
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

function getRandomFox() {
    let API = `https://randomfox.ca/floof/`;

    let randomFox = fetch(API)
        .then((res) => res.json())
        .then((data) => (getFox.src = data.image));
}
document.getElementById("seeFox").addEventListener("click", getRandomFox);
function closeFox() {
    getFox.src = "";
}
document.getElementById("close").addEventListener("click", closeFox); // надо в девелоп заменить кавычки в close ''
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

function makeUsersList() {
    let inputName = document.getElementById("task_name user_name");
    let inputNickname = document.getElementById("task_name nick_name");
    let randNumb = Math.ceil(Math.random() * 3);

    let users = {
        name: inputName.value,
        nickname: inputNickname.value,
        pictureNumber: randNumb,
    };
    let stringifyusers = JSON.stringify(users);
    localStorage.setItem("user", stringifyusers);
    localStorage.removeItem("tasksStorage");
    localStorage.removeItem("idArray");

    console.log("Новый пользователь был записан в Local Storage.");

    let pictureSet = document.querySelector(".profile-img");
    let nicknameSet = document.querySelector(".nickname_result");

    let usersJSON = localStorage.getItem("user");
    let usersObject = JSON.parse(usersJSON);

    nicknameSet.innerHTML = usersObject.nickname;
    let userImg = `./accets/User${randNumb}.svg`;
    pictureSet.setAttribute("src", userImg);
}

document.querySelector(".save_user__btn").addEventListener("click", makeUsersList);

function setUserWhenLoadpage() {
    let usersJSON = localStorage.getItem("user");
    if (usersJSON) {
        let usersObject = JSON.parse(usersJSON);
        let pictureSet = document.querySelector(".profile-img");
        let nicknameSet = document.querySelector(".nickname_result");
        nicknameSet.innerHTML = usersObject.nickname;
        let userImg = `./accets/User${usersObject.pictureNumber}.svg`;
        pictureSet.setAttribute("src", userImg);
    } else {
        new bootstrap.Modal(document.getElementById("registrationForm")).show();
    }
}

window.onload = setUserWhenLoadpage();

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

//вывод в список задач сегодняшней даты

todayDate.innerText = moment().format("LL");
document.getElementById("task_making_form").addEventListener("submit", function (event) {
    event.preventDefault();
});

//глобальные переменные

let priorityColor;
let partStr;
let deadline;

//класс для сборки карточек задач

class taskCard {
    constructor(name, description, deadline, color, lifepart, deadlineDate) {
        this.name = name;
        this.description = description;
        this.deadline = deadline;
        this.color = color;
        this.lifePart = lifepart;
        this.deadlineDate = deadlineDate;
    }

    makeObj() {
        taskMemoryObj.name = this.name;
        taskMemoryObj.description = this.description;
        taskMemoryObj.deadline;
    }

    createTask() {
        this.element = document.createElement("div");
        this.priorityLifeEl = document.createElement("div");
        this.partLifeEl = document.createElement("div");
        this.checkEl = document.createElement("input");
        this.contentBoxEl = document.createElement("div");
        this.nameEl = document.createElement("p");
        this.descriptionEl = document.createElement("p");
        this.deadlineEl = document.createElement("div");
        tasksList.appendChild(this.element);
        this.element.appendChild(this.priorityLifeEl);
        this.element.appendChild(this.checkEl);
        this.element.appendChild(this.contentBoxEl);
        this.contentBoxEl.appendChild(this.nameEl);
        this.contentBoxEl.appendChild(this.descriptionEl);
        this.element.appendChild(this.deadlineEl);
        this.element.setAttribute("class", "new_task_element");
        this.checkEl.setAttribute("type", "checkbox");
        this.checkEl.setAttribute("class", "task_checkbox");
        this.nameEl.setAttribute("class", "task_name_text");
        this.descriptionEl.setAttribute("class", "description_text");
        this.priorityLifeEl.setAttribute("class", this.color);
        this.contentBoxEl.setAttribute("class", "content_task_box");
        this.partLifeEl.innerText = this.lifePart;
        this.nameEl.innerText = this.name;
        this.descriptionEl.innerText = this.description;
        this.deadlineEl.innerText = this.deadline;
    }

    showTask() {}
}

saveTaskBtn.addEventListener("click", () => {
    setPriorityColor();
    setPartStr();
    setDeadline();
    let taskObject = new taskCard(
        taskName.value,
        taskDescription.value,
        deadline,
        priorityColor,
        partStr,
        deadlineDate.value
    );
    taskObject.createTask();
    //taskObject.makeObj();
});
