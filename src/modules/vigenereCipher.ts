export function cryptVigenere(mensagem: String, password: String){
    let resultado = "";
    password = password.toUpperCase()
    var j = 0

    for (let i = 0; i < mensagem.length; i++) {
        const char = mensagem[i];
        if (j >= password.length){
            j = 0;
        }

        // Para letras maiúsculas
        if (char >= 'A' && char <= 'Z') {
            let codigo = char.charCodeAt(0) + (password[j].charCodeAt(0) - 64);
            if (codigo > 'Z'.charCodeAt(0)) {
                codigo -= 26;
            }
            resultado += String.fromCharCode(codigo);
        }
        // Para letras minúsculas
        else if (char >= 'a' && char <= 'z') {
            let codigo = char.charCodeAt(0) + (password[j].charCodeAt(0) - 64);
            if (codigo > 'z'.charCodeAt(0)) {
                codigo -= 26;
            }
            resultado += String.fromCharCode(codigo);
        }
        // Outros caracteres permanecem os mesmos
        else {
            resultado += char;
        }
        j++;
    }
    return(resultado)
}

export function decryptVigenere(mensagem: String, password: String){
    password = password.toUpperCase()
    let resultado = "";
    var j = 0;

    for (let i = 0; i < mensagem.length; i++) {
        const char = mensagem[i];
        if (j >= password.length){
            j = 0;
        }

        // Para letras maiúsculas
        if (char >= 'A' && char <= 'Z') {
            let codigo = char.charCodeAt(0) - (password[j].charCodeAt(0) - 64);
            if (codigo < 'A'.charCodeAt(0)) {
                codigo += 26;
            }
            resultado += String.fromCharCode(codigo);
        }
        // Para letras minúsculas
        else if (char >= 'a' && char <= 'z') {
            let codigo = char.charCodeAt(0) - (password[j].charCodeAt(0) - 64);
            if (codigo < 'a'.charCodeAt(0)) {
                codigo += 26;
            }
            resultado += String.fromCharCode(codigo);
        }
        // Outros caracteres permanecem os mesmos
        else {
            resultado += char;
        }
        j++;
    }
    return resultado;
}