const form = document.querySelector('form');
const nom = document.querySelector('#nom');
const llin1 = document.querySelector('#llin1');
const llin2 = document.querySelector('#llin2');
const pais = document.querySelector('#pais');
const captcha = document.querySelector('#label-captcha');
const usuari = document.querySelector('#usuari');
const password = document.querySelector('#password');
const dataNaix = document.querySelector('#dataNaix');
const dni = document.querySelector('dni');
/* Attach events oninput*/

nom.oninput = () => { validaNom(24, 2, nom, "nombre"); }
llin1.oninput = () => { validaNom(24, 2, llin1, "primer apellido"); }
llin2.oninput = () => { validaNom(24, 2, llin2, "segundo apellido"); }
usuari.oninput = () => { validaUsuari(20, 4, usuari, "Usuario"); }
password.oninput = () => { validapassword(16, 8, password, "contraseña"); }
captcha.onsubmit = () => { validaCaptcha(); }
pais.oninput = () => { validaPais(); }
dataNaix.oninput = () => { validaEdad(dataNaix); }
dni.oninput = () => { validadni(); }

const usuaris = ["daniel.82", "manuel-223", "darknight_1", "mrNum.1234", "user77", "fairyGoth"];

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
    document.querySelector(`#error-${element.id}`).innerHTML = msgError;
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

form.onreset = () => { }




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
        cp.disabled = true;
        dni.disabled = true;
        cp.value = "";
        dni.value = "";
    } else {
        cp.disabled = false;
        dni.disabled = false;
    }
}
function validadni() {
    msgError = "";
    let valida = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
    if (!valida) {
        return "No es un DNI valido";
    } else {
        return "";
    }

}



/* CAPTCHA */


function generaCaptcha() {
    let num1 = Math.round(Math.random() * 10);
    let num2 = Math.round(Math.random() * 10);
    let num3 = Math.round(Math.random());
    let operacio = num3 ? "-" : "+";

    if (num1 > num2) {
        captcha.textContent = `${num1}${operacio}${num2}`;
    } else {
        captcha.textContent = `${num2}${operacio}${num1}`;
    }
};
generaCaptcha();

function validaCaptcha() {
    if (generaCaptcha.value == eval(document.querySelector("#label_captcha").textContent)) setValidity(captcha, "correcto");
    else {
        setValidity(captcha, "error");
    }
}
