//-----------------CALLBACKS---------------//
// callbacks son funciones que pueden ser llamadas dentro de otra funcion para poder ejecutar un proceso de manera sincrona. Se le puede enviar a una funcion otra funcion para que sea ejecutada durante el procesod e la funcion inicial.

// se va a simular que se estan haciendo distintas tareas de manera sincrona al ejecutar el boton.

const setTexto = datos => {
    contenido.textContent = datos;
};

//simular que se obtiene información de una API
const getData = patito => {
    setTexto('Solicitando Autorización');
    setTimeout(()=>{
        patito(false);
    },2500);
};

const mostrarData = patito2 => {
    setTexto('Esperando la información');
    setTimeout(()=>{
        patito2({nombre:"Juan"});
    },2500);
};

boton.addEventListener('click',()=>{
    getData(autorizar => {
        if(autorizar){
            mostrarData(usuario => {
                setTexto(usuario.nombre);
            });
        }else{
            setTexto("No hay patito");
        }
    });
});

//-----------------PROMESAS---------------//

// las promesas permiten ejecutar funciones de manera sincrona de una manera mas rapida y limpia. Las promesas son un objeto, que reciben una funcion que tendrá dos objetos de manera interna. Uno que permite resolver la primera (continuar con el proceso que se esta realizando) o rechazar la promesa que se esta llevando al momento. En esta caso, las promesas no necesitan enviar o recibir una funcion para que se ejecuten.

const setTexto2 = datos => {
    contenido2.textContent = datos;
};

//simular que se obtiene información de una API
const getData2 = () => {
    return new Promise((resolve,reject)=>{
        setTexto2('Solicitando Autorización');
        setTimeout(()=>{
            resolve(true); //se ejecuta resolve en vez del callback(funcion) anterior
        },2500);
    });
};

const mostrarData2 = () => {
    return new Promise((resolve,reject)=> {
        setTexto2('Esperando la información');
        setTimeout(()=>{
            resolve({nombre:"Juan"});
        },2500);
    });
};

boton2.addEventListener('click',()=>{
    getData2().then(autorizar => {
        if(autorizar){
            return mostrarData2();
        };
    }).then(usuario => {
        setTexto2(usuario.nombre);
    });; //en then recibe como argumento la respuesta de datos
});

