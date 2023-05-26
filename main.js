//QUERY SELECTORS//

const billInput = document.querySelector('#input-bill');
const peopleInput = document.querySelector('#input-people');
const tipAmountOutput = document.getElementById('saida-tip-amount');
const totalOutput = document.getElementById('saida-total');



// INPUT DO VALOR DA CONTA E Nº PESSOAS //

var billEntry = '';
var peopleEntry = '';

billInput.addEventListener('input',function(event){
    billEntry = event.target.value;
});

peopleInput.addEventListener('input',function(event){
    peopleEntry = event.target.value;
});

  
// FUNÇÃO QUE CALCULA A GORJETA//

var porcentagemSelecionada;
var valorNumericoSelecionado;

function calculaGorjeta(gorjeta){
     if (billEntry == "" || peopleEntry === "" || billEntry == "0" || peopleEntry === "0") { 
                alert('Ops, algum campo não foi preenchido devidamente')  
           } else if(/[^0-9.,]/.test(billEntry) || /\D/.test(peopleEntry)){ 
            alert('Ops, preencha adequadamente os campos com números')  
           }else if(!/^\d+([.,]\d{1,2})?$/.test(billEntry)){
            alert('Ops, preencha apenas até duas casas após a vírgula')  
           }else if(billEntry.includes(",")){

            var billEntrada = billEntry.replace(',','.')

             porcentagemSelecionada = gorjeta.dataset.porcentagem;
             valorNumericoSelecionado = parseFloat(porcentagemSelecionada.replace('%', '')); 

             var  tip = (billEntrada*valorNumericoSelecionado)/100;
             var tipPerson = (tip/peopleEntry);

             var  billValue = parseFloat(billEntrada);
             var  peopleValue = parseInt(peopleEntry);

             var totalPorPessoa = (billValue+tip)/peopleValue;

             tipAmountOutput.innerHTML = `$ ${tipPerson.toFixed(2)}`;
             totalOutput.innerHTML =  `$ ${totalPorPessoa.toFixed(2)}`;
           }else {  
             porcentagemSelecionada = gorjeta.dataset.porcentagem;
             valorNumericoSelecionado = parseFloat(porcentagemSelecionada.replace('%', ''));

             
             var  tip = (billEntry*valorNumericoSelecionado)/100;
             var tipPerson = (tip/peopleEntry);

             var  billValue = parseFloat(billEntry);
             var  peopleValue = parseInt(peopleEntry);

             var totalPorPessoa = (billValue+tip)/peopleValue;

             tipAmountOutput.innerHTML = `$ ${tipPerson.toFixed(2)}`;
             totalOutput.innerHTML =  `$ ${totalPorPessoa.toFixed(2)}`;
}
}

const botoes = document.querySelectorAll('.botao-tip:not([class*=" "])');

    botoes.forEach(botao => {
        
        botao.addEventListener('mouseup', function() {
            calculaGorjeta(botao);
           }   
     )});
    
    //BOTAO CUSTOM//

const inputCustom = document.querySelector('.input-custom');

function verificaNAN(valor){
    if(isNaN(valor) || valor == 0){
        inputCustom.parentElement.dataset.porcentagem = '';
        alert("Ops!")  
    }else{
        inputCustom.parentElement.dataset.porcentagem = valor;

        var billEntrada = billEntry.replace(',','.');
        var  tip = (billEntrada*valor)/100;
        var tipPerson = (tip/peopleEntry);

        var  billValue = parseFloat(billEntrada);
        var  peopleValue = parseInt(peopleEntry);

        var totalPorPessoa = (billValue+tip)/peopleValue;

        tipAmountOutput.innerHTML = `$ ${tipPerson.toFixed(2)}`;
        totalOutput.innerHTML =  `$ ${totalPorPessoa.toFixed(2)}`;
    }
}

inputCustom.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {

    const userInput = inputCustom.value;
    const valorNumerico = parseFloat(userInput.replace('%', '')/*.replace(/,/g, '.')*/); 
    
    verificaNAN(valorNumerico)     
    }
 }
) 

    //RESETAR//

    function resetPlaceholders(){
         billInput.value ="";
         peopleInput.value ="";
         tipAmountOutput.value ="$ 0,00";
         totalOutput.value ="$ 0,00";
         inputCustom.value = "";
         inputCustom.parentElement.dataset.porcentagem = "";
         inputCustom.placeholder = "Custom";
    }

    document.getElementById("reset").addEventListener("click", resetPlaceholders);
 




