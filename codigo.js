//Váriaveis
let linguagem = document.querySelector('#linguagem');
var deslocamento = document.getElementById('deslocamento');
var cod = document.querySelector('#cod');
var decod = document.getElementById('decod');
var botao = document.querySelector('#botao');
var mensagem = document.querySelector('#mensagem');
var popup = document.querySelector('#escuro');
var fechar = document.querySelector('#fechar');

//Mostra e esconde o campo de deslocamento
//Cifra de César = 1 e Base64 = 2
linguagem.addEventListener("change", function () {
  linguagem.value=="2" ? deslocamento.style.display = 'none' : deslocamento.style.display = 'block'
});

//Muda a mensagem no botao
//Se clicar no radio e decodificar 
decod.addEventListener('click',function(){
  botao.innerText = 'Decodificar';
})
//Se clicar no radio de codificar
cod.addEventListener('click',function(){
  botao.innerText = 'Codificar';
})
//Botão que fecha o popup, quando este está aberto, depois da função execultada
fechar.addEventListener('click',function(){
  popup.style.display = 'none';
})

//Variáveis usadas nas funções de cod/decod
var maius = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var minus = 'abcdefghijklmnopqrstubwxyz';
var carac = '1234567890!,;:'; //não está sendo usada
var resultado = document.querySelector('#resultado');

//Função codificar césar
function cod1() {
  var mensagemEntrada = mensagem.value;
  var mensagemSaida = "";
  let desl = Number(deslocamento.value);
  for(var i=0;i<=(mensagemEntrada.length);i++){
    for(var j=0;(j<minus.length);j++){
      var k=0;
      //Verifica se ó caracter é minúsculo
      if (mensagemEntrada.charAt(i)==minus.charAt(j)){
        mensagemSaida += minus.charAt((j + desl)%26); 
        break;
        //Verifica se o caracter é maiúsculo
      } else if (mensagemEntrada.charAt(i)==maius.charAt(j)) {
        mensagemSaida += maius.charAt((j+desl)%26);
        break;
        //Verifica se é um espaço vazio
      } else if (mensagemEntrada.charAt(i)== " ") {
        mensagemSaida += " ";
        break;
      }       
    }
  }
  return mensagemSaida
}
  
//Função codificar base64
function cod2() {
  var mensagemEntrada = mensagem.value;
  var mensagemSaida = "";
  mensagemSaida = btoa(mensagemEntrada);
  return mensagemSaida;
}

//Função decodificar césar
//Decodificação da cifra de césar está com um bug
//em alguns testes ele "come" algumas letras
//ocorrência frequentes com as letras: x, s e y
function decod1(){
  var mensagemEntrada = mensagem.value;
  var mensagemSaida = "";
  let desl = Number(deslocamento.value);
  for(var i=0;i<=(mensagemEntrada.length);i++){
    for(var j=0;(j<minus.length);j++){
      //Verifica se o caracter e minúsculo
      if (mensagemEntrada.charAt(i)==minus.charAt(j)){
        mensagemSaida += minus.charAt((j - desl)%26); 
        break;
        //Verifica se o caracter e maiúsculo
      } else if (mensagemEntrada.charAt(i)==maius.charAt(j)) {
        mensagemSaida += maius.charAt((j-desl)%26);
        break;
        //Verifica se é um espaço vazio
      } else if (mensagemEntrada.charAt(i)== " ") {
        mensagemSaida += " ";
        break;
      }
    }
  }
  return mensagemSaida
}
  
//Função decodificar base64  
function decod2(){
  var mensagemEntrada = mensagem.value;
  var mensagemSaida = "";
  mensagemSaida = atob(mensagemEntrada);
  return mensagemSaida;
}

//Evento que chama as funções 
botao.addEventListener('click',function (){
  popup.style.display = 'block';
  
  if (linguagem.value=='1' && cod.checked){ 
    //Cifra de César e Codificar
    resultado.innerText = cod1();
  } else if (linguagem.value=='2' && cod.checked) {
    //Base64 e Codificar
    resultado.innerText = cod2();
  } else if (linguagem.value=='1' && decod.checked) {
    //Cifra de César e Decodificar
    resultado.innerText = decod1();
  } else if (linguagem.value=='2' && decod.checked) {
    //Base64 e Decodificar
    resultado.innerText = decod2();
  } else {
    //Mensagem de erro
    resultado.innerText = 'Erro, tente novamente!';
  }
})