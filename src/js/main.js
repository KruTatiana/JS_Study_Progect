//Import our custom CSS
import "../scss/styles.scss";
// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

//Import moment library
var moment = require("moment");
moment().format();

//переменные для элементов DOM
const addTaskBtn = document.querySelector(".add_task");
const taskName = document.getElementById("task_name");
const taskDescription = document.getElementById("task_description");

//Код Веры

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
  /*let usersArray = [
    {
        "name": "Alexandra",
        "nickname": "User1",
        "url": "accets/User1.svg",
      },
      {
        "name": "Valery",
        "nickname": "User2",
        "url": "accets/User2.svg",
      },
      {
        "name": "Bob",
        "nickname": "User2",
        "url": "accets/User3.svg",
      },
  ];*/
  let usersArray = [];
  let stringifyUsers = JSON.stringify(usersArray);
  localStorage.setItem('key', stringifyUsers);
  console.log('Новый пользователь был записан в Local Storage.');


  let inputName = document.getElementById('user_name').value;
  //let stringifyInputName = JSON.stringify(inputName);
  let inputNickname = document.getElementById('nick_name').value;
  //let stringifyInputNickname = JSON.stringify(inputNickname);
  //localStorage.setItem('name', stringifyInputName );
 //localStorage.setItem('nickname', stringifyInputNickname);
 usersArray.push(inputName);
 localStorage.setItem('name', stringifyUsers);
 /*const json = {
    "name": user_name,
    "nickname": nick_name,
};*/
  }

  document.querySelector('.save_user__btn').addEventListener('click', makeUsersList);

//function showRegistrationForm() {
//    document.getElementById('registrationForm').style.display = 'block';
//  }
  //window.onload = showRegistrationForm();


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
