//inicialització
_get("calculaFact").onclick = () => executaFuncio(calculaFactorial, "resultat", "num1");
_get("calculaArrel").onclick = () => executaFuncio(arrel, "resultat", "num1");
_get("calculaMajor").onclick = () => executaFuncio(major, "resultat", "num1", "num2");
_get("calculaPot").onclick = () => executaFuncio(potencia, "resultat", "num1", "num2");
_get("calculaRAND").onclick = () => executaFuncio(random, "resultat");
_get("fonsAleatori").onclick = () => fonsAleatori();

//funcions d'ajuda
function _get(idElement) { return document.getElementById(idElement); }

function executaFuncio(funcio, output, input1, input2) {
    var num1 = input1 !== undefined ? parseInt(_get(input1).value) : null;
    var num2 = input2 !== undefined ? parseInt(_get(input2).value) : null;

    var resultat;
    if (num1 && num2) {
        resultat = funcio(num1, num2);
    } else if (num1){
        resultat = funcio(num1);
    } else{
        resultat = funcio();
    }

    _get(output).value = resultat;
}
//fi funcions ajuda

//funcions que heu d'implementar
function calculaFactorial(numero) {
    var resultado = 1;
    while (numero >= 1) {
        resultado *= numero;
        numero--;
    }
    return resultado;
}

function major(numero1, numero2) {
    if(numero1 > numero2)
    return numero1;
    else return numero2;
}

function potencia(base, exp) {
    return base**exp;
}

function arrel(num) {
    return Math.sqrt(num).toFixed(3);
}

function random() {
    return Math.round(Math.random()*100);
}
function random(number = 100) {
    return Math.round(Math.random()*number);
}

function fonsAleatori() {
    document.body.style.backgroundColor = `rgb(${random(255)},${random(255)},${random(255)})`;
    
}
