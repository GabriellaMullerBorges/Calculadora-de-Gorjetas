const billInput = document.querySelector('#input-bill');
const peopleInput = document.querySelector('#input-people');

var billEntry = '';
var peopleEntry = '';

billInput.addEventListener('input',function(event){
    billEntry = event.target.value;
});

peopleInput.addEventListener('input',function(event){
    peopleEntry = event.target.value;
});

var bill = billEntry;
var people = peopleEntry;

