// INPUT DO VALOR DA CONTA E Nº PESSOAS //

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


// BOTÕES DE PORCENTAGEM //

var porcentagemSelecionada;
var valorNumericoSelecionado;

const botoes = document.querySelectorAll('.botao-tip');

    botoes.forEach(botao => {
        
        botao.addEventListener('mouseup', function() {
            if (billEntry == "" || peopleEntry === "") { 
                alert('Ops, algum campo não foi preenchido devidamente')  
           } else {  
            porcentagemSelecionada = botao.dataset.porcentagem;
             valorNumericoSelecionado = parseFloat(porcentagemSelecionada.replace('%', '')); 

             var  tip = (billEntry*valorNumericoSelecionado)/100;
             var tipPerson = (tip/peopleEntry);

             var  billValue = parseFloat(billEntry);
             var  peopleValue = parseInt(peopleEntry);

             var totalPorPessoa = (billValue+tip)/peopleValue;

             console.log(
            `VALOR porcentagem ${valorNumericoSelecionado} TIPO ${typeof valorNumericoSelecionado}!
             VALOR BillEntry é ${billEntry} TIPO ${typeof billEntry}! 
             VALOR peopleEntry ${peopleEntry}TIPO ${ typeof peopleEntry}!
             VALOR tip ${tip} TIPO ${typeof tip}! 
             VALOR tip/person ${tipPerson} TIPO ${typeof tipPerson}!
             VALOR billValue ${billValue} TIPO ${typeof billValue}!
             VALOR peopleValue ${peopleValue} TIPO ${typeof peopleValue}!
             VALOR totalPorPessoa ${totalPorPessoa} TIPO ${typeof totalPorPessoa}!
             `
             );        
             
             alert(`O valor de gorjeta por pessoa é ${tipPerson} e o total por pessoa ${totalPorPessoa}`)
           }   
        }  
    )});
