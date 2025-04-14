export function cryptText(mensagem: String, deslocamento: number){
    let resultado = "";
    deslocamento = deslocamento % 26; // Garante que o deslocamento esteja entre 0 e 25

    for (let i = 0; i < mensagem.length; i++) {
        const char = mensagem[i];

        // Para letras maiúsculas
        if (char >= 'A' && char <= 'Z') {
            let codigo : number = char.charCodeAt(0) + deslocamento;
            if (codigo > 'Z'.charCodeAt(0)) {
                codigo -= 26;
            }
            resultado += String.fromCharCode(codigo);
        }
        // Para letras minúsculas
        else if (char >= 'a' && char <= 'z') {
            let codigo = char.charCodeAt(0) + deslocamento;
            if (codigo > 'z'.charCodeAt(0)) {
                codigo -= 26;
            }
            resultado += String.fromCharCode(codigo);
        }
        // Outros caracteres permanecem os mesmos
        else {
            resultado += char;
        }
    }
    return resultado;
}

export function decryptText(mensagem: String, deslocamento: number){
    let resultado = "";
    deslocamento = deslocamento % 26; // Garante que o deslocamento esteja entre 0 e 25

    for (let i = 0; i < mensagem.length; i++) {
        const char = mensagem[i];

        // Para letras maiúsculas
        if (char >= 'A' && char <= 'Z') {
            let codigo : number = char.charCodeAt(0) - deslocamento;
            if (codigo < 'A'.charCodeAt(0)) {
                codigo += 26;
            }
            resultado += String.fromCharCode(codigo);
        }
        // Para letras minúsculas
        else if (char >= 'a' && char <= 'z') {
            let codigo = char.charCodeAt(0) - deslocamento;
            if (codigo < 'a'.charCodeAt(0)) {
                codigo += 26;
            }
            resultado += String.fromCharCode(codigo);
        }
        // Outros caracteres permanecem os mesmos
        else {
            resultado += char;
        }
    }
    return resultado;
}