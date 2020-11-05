"use strict";

document.addEventListener("DOMContentLoaded", iniciarPagina);

function iniciarPagina(){

    let baseURL="https://web-unicen.herokuapp.com/api/groups/";
    let nombreGrupo="029tomepatricio/";
    let coleccion="servicios";

    let json_servicios={
        "thing":
        {serv : "Tratamiento Abrillantado",
        list_serv: "Etapas de Proceso: 1-2-5-8",
        precio: "3000"},
    };
    
    mostrarTabla();
    document.getElementById ("btn-agregar-tabla").addEventListener("click", agregar_a_tabla);
    document.getElementById("btn-filtrar").addEventListener("click", filtrarServicios);
    document.getElementById("btn-agregar-tres").addEventListener("click",cargarTresTabla);
    

    setInterval(() => {
        mostrarTabla();    
    }, 20000);

    function borrarElemento(id){
        let cont=document.querySelector("#body_tabla");
        cont.innerHTML="";
        let resultado= document.createElement("tr");
        resultado.innerHTML="Borrando...."
        resultado.classList.add("borrando");
        cont.appendChild(resultado);
        fetch(baseURL+nombreGrupo+coleccion+"/"+id,{
            "method":"DELETE",
            "mode":"cors"
        })
        .then(function(r){
            return r.json()
        })
        .then (function(json){  
            console.log(json);
        })
        .catch(function(e){
            console.log ("ErrorDELETE");
        })
        setTimeout(() => {
            mostrarTabla();
        }, 1000);
    }

    function editarElemento(id,fila){
        fila.innerHTML="";
        let cont=document.querySelector("#body_tabla");
        fila=document.createElement("tr");
        let serv=document.createElement("td");
        let list=document.createElement("td");
        let precio=document.createElement("td");
        let inp=document.createElement("INPUT");
        inp.setAttribute("type","text");
        inp.id="servicioModif"
        let inp2=document.createElement("INPUT");
        inp2.setAttribute("type","text");
        inp2.id="etapaModif"
        let inp3=document.createElement("INPUT");
        inp3.setAttribute("type","number");
        inp3.id="precioModif"
        let editar=document.createElement("button");
        editar.innerHTML="Editar";
        editar.classList.add("editar");
        let borrar=document.createElement("button");
        borrar.innerHTML="Borrar";
        borrar.classList.add("borrar");
        cont.appendChild(fila);
        fila.appendChild(serv);
        serv.appendChild(inp);
        fila.appendChild(list);
        list.appendChild(inp2);
        fila.appendChild(precio);
        precio.appendChild(inp3);
        fila.appendChild(editar);
        fila.appendChild(borrar);
        editar.addEventListener("click",function(){editarAPI(id,inp,inp2,inp3)});
    }

    function editarAPI(id){ 
        let inpServ=document.getElementById("servicioModif").value;
        let inpEtapa=document.getElementById("etapaModif").value;
        let inpPrecio=document.getElementById("precioModif").value;
        let data={
            "thing":{
                "serv": inpServ,
                "list_serv":"Etapas de Proceso: "+inpEtapa,
                "precio":inpPrecio
            }
        }   
        fetch(baseURL+nombreGrupo+coleccion+"/"+id,{
            "method":"PUT",
            "mode":"cors",
            "headers":{"Content-type":"application/json"},
            "body":JSON.stringify(data)
        })
        .then(function(r){
            if(r.ok){
                return r.json()
            }
        })
        .then (function(json){  
            console.log(json);
        })
        .catch(function(e){
            console.log ("ErrorDELETE");
        })
        setTimeout(() => {
            mostrarTabla();
        }, 1000);
    }
    

    function filtrarServicios(){
        let fila=document.querySelectorAll(".servicio");
        let row=document.querySelectorAll("tr");
        let cant=1;
        let iterar=0;
        let valor=document.getElementById("input-filtro").value;
        if (valor != ""){
            iterar++;
            for (let elem of fila) {
                if (valor !== elem.innerHTML){
                    row[cant].classList.add("oculta2");
                    iterar++;
                    cant++;
                }else{
                    cant++;
                }
            }
        }
        if (iterar==cant){
            let cont=document.querySelector("#body_tabla");
            cont.innerHTML="";
            let resultado= document.createElement("tr");
            resultado.innerHTML="No se encontro ningun Resultado!"
            resultado.classList.add("resultFiltro");
            cont.appendChild(resultado);
            setTimeout(() => {
                mostrarTabla();
            }, 2000);
        }
    }
    

    function cargarTresTabla(){
        
        for (let index = 0; index < 3; index++) {
           fetch(baseURL + nombreGrupo + coleccion, {
                "method":"POST",
                "mode": "cors",
                "headers":{"Content-Type":"application/json"},
                "body":JSON.stringify(json_servicios)
            })
            .then(function (r){
                if (r.ok){
                    return r;
                }
            })
            .then (function(json){
                return json;
            })
            .catch(function(e){
                console.log("Error");
            })    
        }
        setTimeout(() => {
            mostrarTabla();    
        }, 1000);
    }

    function mostrarTabla(){
        fetch(baseURL+nombreGrupo+coleccion, {
            "method":"GET",
            "mode":"cors",
        })
        .then(function(r){
            if (r.ok){
                return r.json();
            }
        })
        .then(function(json){
            document.getElementById("body_tabla").innerHTML="";
            for (let data of json.servicios) {
                let cont=document.querySelector("#body_tabla");
                let fila=document.createElement("tr");
                let serv=document.createElement("td");
                serv.innerHTML=data.thing.serv;
                serv.classList.add("servicio");
                let list=document.createElement("td");
                list.innerHTML=data.thing.list_serv;
                let precio=document.createElement("td");
                precio.innerHTML="$"+data.thing.precio;
                let editar=document.createElement("button");
                editar.innerHTML="Editar";
                editar.classList.add("editar");
                let borrar=document.createElement("button");
                borrar.innerHTML="Borrar";
                borrar.classList.add("borrar");
                cont.appendChild(fila);
                fila.appendChild(serv);
                fila.appendChild(list);
                fila.appendChild(precio);
                fila.appendChild(editar);
                fila.appendChild(borrar);
                borrar.addEventListener("click", function(){borrarElemento(data._id)});
                editar.addEventListener("click",function(){editarElemento(data._id,fila)});
            }    
        })
    }

    function agregar_a_tabla(){
        let servicio = document.getElementById("input_servicio").value;
        let etapa = document.getElementById("input_etapa").value;
        let precio = document.getElementById("input_precio").value;
        let auxiliar={
            "thing":
            {
            "serv":servicio,
            "list_serv":"Etapas de Proceso: "+etapa,
            "precio":precio
            }
        }
        if (servicio=="" || etapa=="" || precio==""){
            alert("Completar Todos los campos");
        }else{
            console.log(auxiliar);
            fetch(baseURL + nombreGrupo + coleccion, {
                "method":"POST",
                "mode": "cors",
                "headers":{"Content-Type":"application/json"},
                "body":JSON.stringify(auxiliar)
            })
            .then(function (r){
                if (r.ok){
                    return r;
                }
            })
            .then (function(json){
                return json;
            })
            .catch(function(e){
                console.log("Error");
            })
        }
        setTimeout(() => {
            mostrarTabla();    
        }, 1000);
    }
    
}
