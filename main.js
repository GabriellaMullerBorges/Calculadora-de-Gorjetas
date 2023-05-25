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

  
// BOTÕES DE PORCENTAGEM E FUNÇÃO //

var porcentagemSelecionada;
var valorNumericoSelecionado;

const botoes = document.querySelectorAll('.botao-tip');

    botoes.forEach(botao => {
        
        botao.addEventListener('mouseup', function() {
            if (billEntry == "" || peopleEntry === "" || billEntry == "0" || peopleEntry === "0") { 
                alert('Ops, algum campo não foi preenchido devidamente')  
           } else if(/[^0-9.,]/.test(billEntry) || /\D/.test(peopleEntry)){ 
            alert('Ops, preencha adequadamente os campos com números')  
           }else if(billEntry.includes(",")){
             var billEntrada = billEntry.replace(',','.')

             porcentagemSelecionada = botao.dataset.porcentagem;
             valorNumericoSelecionado = parseFloat(porcentagemSelecionada.replace('%', '')); 

             var  tip = (billEntrada*valorNumericoSelecionado)/100;
             var tipPerson = (tip/peopleEntry);

             var  billValue = parseFloat(billEntrada);
             var  peopleValue = parseInt(peopleEntry);

             var totalPorPessoa = (billValue+tip)/peopleValue;

             tipAmountOutput.innerHTML = `$ ${tipPerson.toFixed(2)}`;
             totalOutput.innerHTML =  `$ ${totalPorPessoa.toFixed(2)}`;
           }else {  
             porcentagemSelecionada = botao.dataset.porcentagem;
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
    )});  
    
    //RESETAR//

    function resetPlaceholders(){
         billInput.value ="";
         peopleInput.value ="";
         tipAmountOutput.value ="$ 0,00";
         totalOutput.value ="$ 0,00";
    }

 
    document.getElementById("reset").addEventListener("click", resetPlaceholders);
 




