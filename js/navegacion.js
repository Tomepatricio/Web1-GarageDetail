document.addEventListener("DOMContentLoaded", iniciar_pagina);

    function iniciar_pagina(){
        
        let URL="http://localhost/tpe parte 3/";

        fetch(URL+"home.html?")
        .then(function(r){
            if (r.ok){
                return r.text();
            }
        })
        .then(function(text){
            let contenedor=document.getElementById("contenedor");
            contenedor.innerHTML=text;
            let validacion=document.getElementById("validacion");
            let valor_captcha = Math.floor(Math.random() * (10000 - 1)) + 1;   
            validacion.innerHTML = valor_captcha;
            let btn = document.getElementById("boton_form");
            btn.addEventListener ("click", validar_captcha);
        })
    

        document.getElementById("navegacion").classList.add ("oculta");
        document.getElementById("menu").addEventListener("click",desplegar_menu);
        
        document.getElementById("home").addEventListener("click",function(){
            fetch(URL+"home.html?")
            .then(function(r){
                if (r.ok){
                    return r.text();
                }
            })
            .then(function(text){
                let contenedor=document.getElementById("contenedor");
                contenedor.innerHTML=text;
                let validacion=document.getElementById("validacion");
                let valor_captcha = Math.floor(Math.random() * (10000 - 1)) + 1;   
                validacion.innerHTML = valor_captcha;
                let btn = document.getElementById("boton_form");
                btn.addEventListener ("click", validar_captcha);
            })
        
        }); 

        document.getElementById("servicios").addEventListener("click",function(){
            fetch(URL+"servicios.html?")
            .then(function(r){
                if (r.ok){
                    return r.text();
                }
            })
            .then(function(text){
                let contenedor=document.getElementById("contenedor");
                contenedor.innerHTML=text;
            })
            mostrarTabla();
            setTimeout(() => {
                document.getElementById ("btn-agregar-tabla").addEventListener("click", agregar_a_tabla);
                document.getElementById("btn-filtrar").addEventListener("click", filtrarServicios);
                document.getElementById("btn-agregar-tres").addEventListener("click",cargarTresTabla);
                setInterval(() => {
                    mostrarTabla();
                }, 60000);
            }, 1000);
        })

        document.getElementById("galeria").addEventListener("click",function(){
            fetch(URL+"galeria.html?")
            .then(function(r){
                if (r.ok){
                    return r.text();
                }
            })
            .then(function(text){
                let contenedor=document.getElementById("contenedor");
                contenedor.innerHTML=text;
            })
        })

    }