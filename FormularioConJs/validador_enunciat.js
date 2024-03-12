const form = document.querySelector('form');
const nom = document.querySelector('#nom');
const llin1 = document.querySelector('#llin1');
const llin2 = document.querySelector('#llin2');
const pais = document.querySelector('#pais');
const captcha = document.querySelector('#label-captcha');
const regenera = document.querySelector('#regenera');
const usuari = document.querySelector('#usuari');
const password = document.querySelector('#password');
const dataNaix = document.querySelector('#dataNaix');
const dni = document.querySelector('#dni');
const cp = document.querySelector('#cp');
const listaNombres = document.querySelector('#listaNombres');
const eliminar = document.querySelector('#eliminar');

/* Attach events oninput*/
nom.oninput = () => { validaNom(24, 2, nom, "nombre"); }
llin1.oninput = () => { validaNom(24, 2, llin1, "primer apellido"); }
llin2.oninput = () => { validaNom(24, 2, llin2, "segundo apellido"); }
usuari.oninput = () => { validaUsuari(20, 4, usuari, "Usuario"); }
password.oninput = () => { validapassword(16, 8, password, "contraseña"); }
captcha.onsubmit = () => { validaCaptcha(); }
regenera.onclick = () => { generaCaptcha(); }
pais.oninput = () => { validaPais(); }
dataNaix.oninput = () => { validaEdad(dataNaix); }
dni.oninput = () => { validadni(dni); }
cp.oninput = () => { validaCP(cp); }

/* Funció que marca els inputs com a vàlids/invàlids*/
function setValidity(element, msgError) {
    element.classList.remove("is-invalid");
    element.classList.remove("is-valid");

    if (msgError.length == 0) {
        element.classList.add("is-valid");
    } else {
        element.classList.add("is-invalid");
    }

    element.setCustomValidity(msgError);
    document.querySelector(`#error-${element.id}`).textContent = msgError;
}

form.onsubmit = function (event) {
    form.querySelectorAll("input").forEach(element => {
        element.dispatchEvent(new Event("input"));
    });

    validaCaptcha();

    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        alert("Revisau les errades abans de continuar");
    }

    form.classList.add('was-validated');
    
};

form.onreset = () => {
    form.querySelectorAll("input").forEach(function (element) {
        element.classList.remove("is-invalid", "is-valid");

    });

}
/*funcion de validación*/
function validaNom(max, min, texto, campo) {
    let msgError = "";
    const longitud = texto.value.length;
    if (longitud > max || longitud < min) {
        msgError = `El ${campo} tiene que tener entre ${min} y ${max} caracteres `;
    }

    msgError += soloLetras(texto);
    setValidity(texto, msgError);

}
function validaUsuari(max, min, texto, campo) {
    let msgError = "";
    const longitud = texto.value.length;
    if (longitud > max || longitud < min) {
        msgError = `El ${campo} tiene que tener entre ${min} y ${max} caracteres.`;
    }

    msgError += verificaUsuario(texto);
    setValidity(texto, msgError);
}

function validapassword(max, min, texto, campo) {
    let msgError = "";
    const longitud = texto.value.length;
    if (longitud > max || longitud < min) {
        msgError = `El ${campo} tiene que tener entre ${min} y ${max} caracteres `;
    }

    msgError += verificadoPassword(texto);
    setValidity(texto, msgError);

}

function verificaUsuario(texto) {
    let valida = /^[a-zA-Z][a-zA-Z0-9]*(?:[-_\.][a-zA-Z0-9]*)?$/g.test(texto.value);
    if (!valida) {
        return " Debe empezar con una letra y puede contener un solo simbolo(-, _, .) `";
    } else {
        return "";
    }
}


function soloLetras(texto) {
    let valida = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/g.test(texto.value);
    if (!valida) {
        return "No puede contener números";
    } else {
        return "";
    }
}

function verificadoPassword(texto) {
    let valida = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_.$#])[\s\S]{8,}$/g.test(texto.value);
    if (!valida) {
        return " Debe contener mínimo una mayúscula, minúscula,número y símbolo  (-, _, ., $, #)";
    } else {
        return "";
    }
}

function validaEdad(fecha) {
    let msgError = "";
    let edadCliente = fecha.value;
    let fechaActual = new Date();
    edadCliente = new Date(edadCliente);
    let mayorDeEdad = fechaActual.getFullYear() - edadCliente.getFullYear();
    let mesNacimiento = fechaActual.getMonth() - edadCliente.getMonth();
    if (mesNacimiento > 0 || (mesNacimiento == 0 && fechaActual.getDate() < edadCliente.getDate())) {
        --mayorDeEdad;
    }

    if (mayorDeEdad < 18) {
        msgError += "Es menor de edad";
    } else msgError += "";
    setValidity(fecha, msgError);

}

function validaPais() {
    if (pais.value !== "ES") {
        disabledPais();
    } else {
        cp.disabled = false;
        dni.disabled = false;
    }
}
function disabledPais() {
    cp.disabled = true;
    dni.disabled = true;
    cp.value = "";
    dni.value = "";
    cp.classList.remove("is-invalid");
    cp.classList.remove("is-valid");
    dni.classList.remove("is-invalid");
    dni.classList.remove("is-valid");
}
function validadni(texto) {
    let msgError = "";
    let valida = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i.test(texto.value);
    if (!valida) {
        msgError += "No es un DNI válido";
    } else {
        msgError += "";

    }
    setValidity(texto, msgError);
}

function validaCP(texto) {
    msgError = "";
    let valida = /^[0-9]{5}$/i.test(texto.value);
    if (!valida) {
        msgError += "No es un Código Postal válido";
    } else {
        msgError += "";

    }
    setValidity(texto, msgError);
}

form.onsubmit = function (event) {
    event.preventDefault();
    let objetosRecuperados = obteArraySessionStorage("datosElegidos");

    const nuevoObjeto = creaObjeto();

    let encontrado = false;
    objetosRecuperados.forEach(element => {
        if (element.usuari == nuevoObjeto.usuari) {
            encontrado = true;
            return;
        }
    });

    if (encontrado) {
        alert("Este usuario ya existe!");
    } else {
        objetosRecuperados.push(nuevoObjeto);
        sessionStorage.setItem("datosElegidos", JSON.stringify(objetosRecuperados));

        actualizaSelect(objetosRecuperados);

       
    }

}

function actualizaSelect(objetos) {
    listaNombres.innerHTML = "";

    let resultado = "";
    for (const objeto of objetos) {
        resultado += `<option value="${objeto.usuari}">${objeto.nombre} (Edad: ${objeto.dataNaix})</option>`;
    }

    listaNombres.innerHTML = resultado;
}

function creaObjeto() {
    return {
        nombre: nom.value,
        primerApellido: llin1.value,
        segundoApellido: llin2.value,
        usuari: usuari.value,
        Pais: pais.value,
        password: password.value,
        dataNaix: dataNaix.value,
        dni: dni.value,
        cp: cp.value,
    }
}

listaNombres.onchange = function () {

    const datosElegidos = listaNombres.value;

    let objetosRecuperados = obteArraySessionStorage("datosElegidos");

    let objetoEncontrado = null;
    for (const objeto of objetosRecuperados) {
        if (objeto.usuari == datosElegidos) {
            objetoEncontrado = objeto;
            break;
        }
    }

    if (objetoEncontrado) {
        nom.value = objetoEncontrado.nombre;
        llin1.value = objetoEncontrado.primerApellido;
        llin2.value = objetoEncontrado.segundoApellido;
        usuari.value = objetoEncontrado.usuari;
        pais.value = objetoEncontrado.pais;
        password.value = objetoEncontrado.password;
        dataNaix.value = objetoEncontrado.dataNaix;
        dni.value = objetoEncontrado.dni;
        cp.value = objetoEncontrado.cp;
    }
}

eliminar.onclick = () => {
    sessionStorage.clear();
    actualizaSelect([]);
}

document.body.onload = () => {
    actualizaSelect(obteArraySessionStorage("datosElegidos"));
}

function obteArraySessionStorage(param) {
    let objetosRecuperados = [];
    let listaNombres = sessionStorage.getItem(param);

    if (listaNombres != null) {
        objetosRecuperados = JSON.parse(listaNombres);
    }

    return objetosRecuperados;
}





/* CAPTCHA */
var generaCaptcha = function(){

    let num1 = Math.round(Math.random() * 10);
    let num2 = Math.round(Math.random() * 10);
    let num3 = Math.round(Math.random());
    let operacio = num3 ? "-" : "+";

    if (num1 > num2) {
        captcha.textContent = `${num1}${operacio}${num2}`;
    } else {
        captcha.textContent = `${num2}${operacio}${num1}`;
    }
}
generaCaptcha();

function validaCaptcha() {
    let respuesta = document.querySelector("#captcha").value;
    let respuestaCorrecta = eval(document.querySelector("#label-captcha").textContent);

    if (respuesta == respuestaCorrecta) {
        setValidity(captcha, "correcto");
    } else {
        setValidity(captcha, "error");
    }
}
