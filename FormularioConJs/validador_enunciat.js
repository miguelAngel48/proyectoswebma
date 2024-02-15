const form = document.querySelector('form');
const nom = document.querySelector("nom");

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

form.onreset = () =>{}

/* Attach events oninput*/
nom.oninput = validaNom;


/*funcion de validación*/
function validaNom(){
   if(nomvalue.length > 24){
     msgError = "No tiene que ser superior a 24 carácteres";
   }
   
};

function soloLetras(texto){
   var valida = /^[A-Za-zÁ-]+$/.test(texto);
   if (valida){
    return "";
   }

   return "Solo se pueden letras"
}

setValidity(nom,msgError);
/* CAPTCHA */
var generaCaptcha = function(){

}();

function validaCaptcha(){

}
