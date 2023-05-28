//QUERY SELECTORS//

const billInput = document.querySelector('#input-bill');
const peopleInput = document.querySelector('#input-people');
const billAlert = document.getElementById('alerta-conta');
const peopleAlert =  document.getElementById('alerta-pessoas')
const tipAmountOutput = document.getElementById('saida-tip-amount');
const totalOutput = document.getElementById('saida-total');
const customAlert = document.getElementById('alerta-custom');
const inputCustom = document.querySelector('.input-custom');


// INPUT DO VALOR DA CONTA E Nº PESSOAS //

var billEntry = '';
var peopleEntry = '';

billInput.addEventListener('input',function(event){
    billEntry = event.target.value;
});

peopleInput.addEventListener('input',function(event){
    peopleEntry = event.target.value;
});

//FUNÇÃO EM CASO DE ERRO

function saidaErro(){
    tipAmountOutput.innerHTML = `Erro`;
    totalOutput.innerHTML =  `Erro`;
}

// FUNÇÃO QUE VERIFICA AS ENTRADAS SEPARADAMENTE

function verificaEntradaBill(){
    if (billEntry == "" || billEntry == "0" || /[^0-9.,]/.test(billEntry) || !/^\d+([.,]\d{1,2})?$/.test(billEntry)){
        return true
    } 
};

function verificaEntradaPeople(){
    if(peopleEntry === "" || peopleEntry === "0" || /\D/.test(peopleEntry)){
        return true
    } 
}

// FUNÇÃO QUE VERIFICA AS ENTRADAS CONJUNTAMENTE EM DIFERENTES CENÁRIOS

function  verificaEntradas(){
    if (verificaEntradaBill() && verificaEntradaPeople()) {
        return "ambos verdadeiros"
    }else if (verificaEntradaBill() && !verificaEntradaPeople()){
       return "bill verdadeiro"       
    }else if (!verificaEntradaBill() && verificaEntradaPeople()){
        return "people verdadeiro"    
    }else{
        return false
    }
}

function verificaCasos(){
    if(verificaEntradas()=="ambos verdadeiros"){
        billAlert.innerHTML = `Ops, preencha adequadamente o campo`;
        peopleAlert.innerHTML = `Ops, preencha adequadamente o campo`;
        saidaErro()
    }else if(verificaEntradas()=="bill verdadeiro"){
        billAlert.innerHTML = `Ops, preencha adequadamente o campo`
        saidaErro()
    }else{
        peopleAlert.innerHTML = `Ops, preencha adequadamente o campo`;
        saidaErro()
    }   
};
// FUNÇÃO QUE CALCULA A GORJETA//

var porcentagemSelecionada;
var valorNumericoSelecionado;

function calculaGorjeta(gorjeta){
     if(billEntry.includes(",")){

            var billEntrada = billEntry.replace(',','.')
            customAlert.innerHTML= "";

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
             customAlert.innerHTML= "";
             
             var  tip = (billEntry*valorNumericoSelecionado)/100;
             var tipPerson = (tip/peopleEntry);

             var  billValue = parseFloat(billEntry);
             var  peopleValue = parseInt(peopleEntry);

             var totalPorPessoa = (billValue+tip)/peopleValue;

             tipAmountOutput.innerHTML = `$ ${tipPerson.toFixed(2)}`;
             totalOutput.innerHTML =  `$ ${totalPorPessoa.toFixed(2)}`;   
            } 
    };


function saidaGorjeta(gorjeta){
    if (!verificaEntradas()) { 
        calculaGorjeta(gorjeta)
    }else {
        verificaCasos()
    }
    }
 
//APLICAÇÃO NOS BOTÕES
const botoes = document.querySelectorAll('.botao-tip:not([class*=" "])');

    botoes.forEach(botao => {
        
        botao.addEventListener('mouseup', function(event) {
            event.preventDefault();
            saidaGorjeta(botao);
           }   
     )});
    
//BOTAO CUSTOM//

function saidaCustom(valor){
    if (!verificaEntradas()) { 
        verificaNAN(valor)
    }else {
        verificaCasos()
    }
    }

function alertaErroCustom(){
    customAlert.innerHTML = `Ops, preencha adequadamente o campo`
    inputCustom.value = "";
}


function verificaNAN(valor){
    if (/^[0-9%]+$/.test(valor)) {
        inputCustom.parentElement.dataset.porcentagem = valor;
        customAlert.innerHTML= ""
        var billEntrada = billEntry.replace(',','.');
        var  tip = (billEntrada*valor)/100;
        var tipPerson = (tip/peopleEntry);

        var  billValue = parseFloat(billEntrada);
        var  peopleValue = parseInt(peopleEntry);

        var totalPorPessoa = (billValue+tip)/peopleValue;

        tipAmountOutput.innerHTML = `$ ${tipPerson.toFixed(2)}`;
        totalOutput.innerHTML =  `$ ${totalPorPessoa.toFixed(2)}`;
       
      } else {
        alertaErroCustom();
        saidaErro();
      }
}

inputCustom.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {

    const userInput = inputCustom.value;
    const valorNumerico = parseFloat(userInput.replace('%', '')); 
    event.preventDefault();
    saidaCustom(valorNumerico);  
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
         billAlert.innerHTML = "";
         peopleAlert.innerHTML = "";
         customAlert.innerHTML= ""
         billEntry = ""
         peopleEntry = ""
    }

    document.getElementById("reset").addEventListener("click", resetPlaceholders);
 




