"use strict"

document.addEventListener ("DOMContentLoaded", function iniciar_pagina(){

    function iniciar_pagina(){

    }
let valor_captcha = Math.floor(Math.random() * (10000 - 1)) + 1;   
validacion.innerHTML = valor_captcha;

let valor_input = document.getElementById("input_validacion");
    valor_input.addEventListener ("keyup", codigo);

let btn = document.getElementById("boton_form");
btn.addEventListener ("click", validar_captcha);


function codigo (){
    valor_input = document.getElementById ("input_validacion").value;
    valor_input = parseInt (valor_input);
}


function validar_captcha (){
    if (valor_captcha === valor_input){
        let resultado = document.getElementById("result_captcha");
        resultado.innerHTML = "Consulta enviada con Exito"; 
    }
    else {
        let resultado = document.getElementById("result_captcha");
        resultado.innerHTML = "Volver a Intertar - Captcha Erroneo";
    }
}

});