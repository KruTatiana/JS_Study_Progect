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
const btnTasksCleaner = document.getElementById("btnTasksCleaner");
const tasksLinks = document.getElementsByClassName("tasksLink");
const menuListContainer = document.getElementById("menuListContainer");
let ingridients = document.getElementById("ingridients");
let sugar = document.getElementById("sugar");
let iron = document.getElementById("iron");
let vitaminC = document.getElementById("vitaminC");
let calories = document.getElementById("calories");
let calcium = document.getElementById("calcium");
let getFox = document.getElementById("getFox");
let close = document.getElementById("close");
const title = document.getElementById("title");
let priorityColor;
let partStr;
let partValue;
let deadline;
let taskMemoryObj = {};
let taskId;
let arrayFromStorage;
let priority;

//класс для сборки карточек задач

class taskCard {
    constructor(
        name,
        description,
        deadline,
        color,
        priority,
        lifepart,
        partValue,
        deadlineDate,
        deadlineTime,
        id,
        checkbox
    ) {
        this.name = name;
        this.description = description;
        this.deadline = deadline;
        this.color = color;
        this.priority = priority;
        this.lifePart = lifepart;
        this.partValue = partValue;
        this.deadlineDate = deadlineDate;
        this.deadlineTime = deadlineTime;
        this.id = id;
        this.checkbox = checkbox;
    }

    createTask() {
        this.element = document.createElement("div");
        this.priorityLifeEl = document.createElement("div");
        this.checkEl = document.createElement("input");
        this.contentBoxEl = document.createElement("div");
        this.nameEl = document.createElement("p");
        this.descriptionEl = document.createElement("p");
        this.rightEl = document.createElement("div");
        this.buttonClean = document.createElement("input");
        tasksList.appendChild(this.element);
        this.element.appendChild(this.priorityLifeEl);
        this.element.appendChild(this.checkEl);
        this.element.appendChild(this.contentBoxEl);
        if (!isNaN(this.deadline)) {
            this.deadlineEl = document.createElement("div");
            this.deadlineText = document.createElement("p");
            this.deadlineHours = document.createElement("p");
            this.rightEl.appendChild(this.deadlineEl);
            this.deadlineEl.appendChild(this.deadlineText);
            this.deadlineEl.appendChild(this.deadlineHours);
            this.deadlineEl.setAttribute("class", "deadline_el");
            this.deadlineText.innerText = "Осталось";
            this.deadlineHours.innerText = `${this.deadline} ч.`;
        }
        if (this.lifePart != undefined) {
            this.partLifeEl = document.createElement("div");
            this.contentBoxEl.appendChild(this.partLifeEl);
            this.partLifeEl.setAttribute("class", "part_life_element");
            this.partLifeEl.innerText = this.lifePart;
        }
        this.contentBoxEl.appendChild(this.nameEl);
        this.contentBoxEl.appendChild(this.descriptionEl);
        this.element.appendChild(this.rightEl);
        this.rightEl.appendChild(this.buttonClean);
        this.element.setAttribute("class", `new_task_element ${this.partValue} priority_${this.priority}`);

        this.checkEl.setAttribute("type", "checkbox");
        this.checkEl.setAttribute("class", "task_checkbox");
        this.checkEl.setAttribute("id", this.id);
        this.nameEl.setAttribute("class", "task_name_text");
        this.descriptionEl.setAttribute("class", "description_text");
        this.priorityLifeEl.setAttribute("class", this.color);
        this.contentBoxEl.setAttribute("class", "content_task_box");
        this.rightEl.setAttribute("class", "right_el");
        this.buttonClean.setAttribute("type", "image");
        this.buttonClean.setAttribute("src", "./accets/Icontrash.svg");
        this.buttonClean.setAttribute("class", "button_trash");
        this.nameEl.innerText = this.name;
        this.descriptionEl.innerText = this.description;
        if (this.checkbox == "checked") {
            this.checkEl.setAttribute("checked", "checked");
            this.element.classList.add("complete");
        } else {
            this.element.classList.add("active");
        }
        this.checkEl.addEventListener("change", () => {
            if (this.checkEl.checked) {
                this.element.classList.add("complete");
                this.element.classList.remove("active");
            } else {
                this.element.classList.add("active");
                this.element.classList.remove("complete");
            }
        });
    }

    makeObj() {
        taskMemoryObj.name = this.name;
        taskMemoryObj.description = this.description;
        taskMemoryObj.color = this.color;
        taskMemoryObj.priority = this.priority;
        taskMemoryObj.lifePart = this.lifePart;
        taskMemoryObj.partValue = this.partValue;
        taskMemoryObj.deadlineDate = this.deadlineDate;
        taskMemoryObj.deadlineTime = this.deadlineTime;
        taskMemoryObj.id = this.id;

        if (this.checkEl.checked == true) {
            taskMemoryObj.checkbox = "checked";
        }
    }
}

//Функция для получения состава продуктов

function onBtnClick() {
    let ingridientsValue = ingridients.value;
    let API = `https://api.edamam.com/api/nutrition-data?app_id=d7be0f59&app_key=7670b7efd74aa8278e4343bfd8644a49&nutrition-type=cooking&ingr=1%20${ingridientsValue}`;

    let caloriesResult = fetch(API)
        .then((res) => res.json())
        .then((data) => (calories.textContent = Math.ceil(data.totalNutrients.ENERC_KCAL.quantity)))
        .catch((err) => console.log("Произошла ошибка при получении данных"));
    let sugarResult = fetch(API)
        .then((res) => res.json())
        .then((data) => (sugar.textContent = Math.ceil(data.totalNutrients.SUGAR.quantity)))
        .catch((err) => console.log("Произошла ошибка при получении данных"));
    let ironResult = fetch(API)
        .then((res) => res.json())
        .then((data) => (iron.textContent = Math.ceil(data.totalNutrients.FE.quantity)))
        .catch((err) => console.log("Произошла ошибка при получении данных"));
    let vitaminCResult = fetch(API)
        .then((res) => res.json())
        .then((data) => (vitaminC.textContent = Math.ceil(data.totalNutrients.VITC.quantity)))
        .catch((err) => console.log("Произошла ошибка при получении данных"));
    let calciumCResult = fetch(API)
        .then((res) => res.json())
        .then((data) => (calcium.textContent = Math.ceil(data.totalNutrients.CA.quantity)))
        .catch((err) => console.log("Произошла ошибка при получении данных"));
}
document.getElementById("button_find").addEventListener("click", onBtnClick);

//Очистить форму с продуктами

function onBtnClickCleaner() {
    calories.textContent = 0;
    sugar.textContent = 0;
    iron.textContent = 0;
    vitaminC.textContent = 0;
    calcium.textContent = 0;
    ingridients.value = "";
}
document.getElementById("button_cleaner").addEventListener("click", onBtnClickCleaner);

//Функция для показа лисичек

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

//Функция для мотивирующих фраз

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

//Функция для списка пользователей в Local Storage

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

//Вывод пользователя на страницу

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

//Меню для сортировки задач

menuListContainer.addEventListener("click", function (evt) {
    const eventTarget = evt.target;
    const tasksList = document.getElementsByClassName("new_task_element");
    for (let i = 0; i < tasksList.length; i += 1) {
        const task = tasksList[i];
        if (task.classList.contains(eventTarget.id)) {
            task.classList.remove("disabled");
        } else {
            task.classList.add("disabled");
        }
    }
    // отображаем в меню выбранный раздел
    for (let i = 0; i < tasksLinks.length; i += 1) {
        if (tasksLinks[i].id === eventTarget.id) {
            tasksLinks[i].classList.add("active-link");
        } else {
            tasksLinks[i].classList.remove("active-link");
        }
    }
    // отображаем в заголовке выбранный раздел
    if (eventTarget.id === "new_task_element" || eventTarget.classList.contains("categoryLink")) {
        title.textContent = eventTarget.textContent;
    } else if (eventTarget.classList.contains("simpleLink")) {
        title.textContent = eventTarget.textContent + " задачи";
    } else if (eventTarget.classList.contains("priorityLink")) {
        title.textContent = eventTarget.textContent + " приоритет";
    }
});

btnTasksCleaner.addEventListener("click", () => {
    localStorage.removeItem("idArray");
    localStorage.removeItem("tasksStorage");
    taskList.innerHTML = "";
});

//вывод в список задач сегодняшней даты

todayDate.innerText = moment().format("LL");
document.getElementById("task_making_form").addEventListener("submit", function (event) {
    event.preventDefault();
});


//вызов JSON из LocalStorage с проверкой на наличие в нем данных

function checkStorage() {
    arrayFromStorage = localStorage.getItem("tasksStorage");
    arrayFromStorage = arrayFromStorage ? JSON.parse(arrayFromStorage) : [];
}

//Проверка зарегестрированного пользователя для активации добавления задачи

let userData = localStorage.getItem("user");
if (userData) {
    document.querySelector(".add_task").removeAttribute("disabled");
}

//Расчет даты дедлайна задачи

function setDeadline(date, time) {
    let startDate = moment();
    let taskDeadlinDate = moment(`${date}T${time}`);
    deadline = taskDeadlinDate.diff(startDate, "hours");
    return deadline;
}

//Сохранение пареметров задачи в LocalStorage

function setTaskObjectToStorage() {
    checkStorage();
    arrayFromStorage.push(taskMemoryObj);
    window.localStorage.setItem("tasksStorage", JSON.stringify(arrayFromStorage));
}

//функция для создания карточек задач при загрузке страницы
function getTaskList() {
    checkStorage();
    for (let obj of arrayFromStorage) {
        setDeadline(obj.deadlineDate, obj.deadlineTime);
        let cardObject = new taskCard(
            obj.name,
            obj.description,
            deadline,
            obj.color,
            obj.priority,
            obj.lifePart,
            obj.partValue,
            obj.deadlineDate,
            obj.deadlineTime,
            obj.id,
            obj.checkbox
        );
        cardObject.createTask();
    }
}
getTaskList();

//Функция для генерации переменной приоритета из данных формы

function setPriorityColor() {
    let priorityElements = document.forms.taskMaking.elements.prioritybtn;
    for (let i of priorityElements) {
        if (i.checked == true) {
            priorityColor = `${i.value}_lable`;
            priority = i.value;
            i.checked = "";
        }
    }
}

//Функция для генерации переменной сферы жизни из данных формы

function setPartStr() {
    let partElements = document.forms.taskMaking.elements.lifepartbtn;
    for (let el of partElements) {
        if (el.checked == true) {
            let currentSpan = el.nextElementSibling;
            partStr = currentSpan.textContent;
            partValue = el.value;
            el.checked = "";
        }
    }
}

//Функция для генерации уникального id для каждой задачи

function setId() {
    let idArray = localStorage.getItem("idArray");
    idArray = idArray ? JSON.parse(idArray) : [];
    if (idArray.length == 0) {
        taskId = "taskId1";
    } else {
        let num = idArray.length + 1;
        taskId = `taskId${num}`;
    }
    idArray.push(taskId);
    window.localStorage.setItem("idArray", JSON.stringify(idArray));
}

//подключение динамических чекбоксов

taskList.onclick = function (event) {
    let target = event.target;
    if (target.type == "checkbox") {
        setChecked(target);
    } else if (target.type == "image") {
        removeTask(target);
    }
};

//Фиксация выполненных задач

function setChecked(check) {
    let checkboxСond = check.checked;
    let checkboxId = check.id;
    if (checkboxСond == true) {
        arrayFromStorage = localStorage.getItem("tasksStorage");
        arrayFromStorage = JSON.parse(arrayFromStorage);
        for (let obj of arrayFromStorage) {
            if (obj.id == checkboxId) {
                obj.checkbox = "checked";
            }
            window.localStorage.setItem("tasksStorage", JSON.stringify(arrayFromStorage));
        }
    } else if (checkboxСond == false) {
        arrayFromStorage = localStorage.getItem("tasksStorage");
        arrayFromStorage = JSON.parse(arrayFromStorage);
        for (let obj of arrayFromStorage) {
            if (obj.id == checkboxId) {
                delete obj.checkbox;
            }
            window.localStorage.setItem("tasksStorage", JSON.stringify(arrayFromStorage));
        }
    }
}

//Удаление задачи кнопкой на самой задаче

    function removeTask(el){
        let rightEl = el.parentNode;
        let newTaskEl = rightEl.parentNode;
        let idEl = newTaskEl.childNodes[1];
        let taskId = idEl.id;
        arrayFromStorage = localStorage.getItem('tasksStorage');
	    arrayFromStorage = JSON.parse(arrayFromStorage);
        arrayFromStorage.forEach((obj,key) => {
            if(obj.id == taskId) {
                arrayFromStorage.splice(key,1);
            }
        });
        window.localStorage.setItem('tasksStorage', JSON.stringify(arrayFromStorage));
        tasksList.innerHTML = '';
        getTaskList();
    }

//кнопка "сохранить задачу" из формы добавления задачи

saveTaskBtn.addEventListener("click", () => {
    if (taskName.value.trim() !== "" && taskDescription.value.trim() !== "") {
        setPriorityColor();
        setPartStr();
        setDeadline(deadlineDate.value, deadlineTime.value);
        setId();
        let taskObject = new taskCard(
            taskName.value,
            taskDescription.value,
            deadline,
            priorityColor,
            priority,
            partStr,
            partValue,
            deadlineDate.value,
            deadlineTime.value,
            taskId
        );
        taskObject.createTask();
        taskObject.makeObj();
        setTaskObjectToStorage();
        taskName.value = "";
        taskDescription.value = "";
        deadlineDate.value = "";
        deadlineTime.value = "";
    } else {
        document.querySelector(".form_error").innerText = 'Поля "Название" и "Описание" обязательны для заполнения!';
    }
});