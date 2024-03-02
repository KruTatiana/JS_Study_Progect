//Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

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


// Код Насти



// Код Тани