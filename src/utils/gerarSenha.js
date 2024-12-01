function gerarSenha(requisitos) {
    const { tamanhoMinSenha, tamanhoMaxSenha, requerMaiusculas, requerMinusculas, requerNumeros, requerSimbolos } = requisitos;

    const caracteres = {
        maiusculas: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        minusculas: 'abcdefghijklmnopqrstuvwxyz',
        numeros: '0123456789',
        simbolos: '!@#$%&'
    };

    let pool = '';
    if (requerMaiusculas) pool += caracteres.maiusculas;
    if (requerMinusculas) pool += caracteres.minusculas;
    if (requerNumeros) pool += caracteres.numeros;
    if (requerSimbolos) pool += caracteres.simbolos;

    const tamanhoSenha = Math.floor(
        Math.random() * (tamanhoMaxSenha - tamanhoMinSenha + 1) + tamanhoMinSenha
    );

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        senha += pool.charAt(Math.floor(Math.random() * pool.length));
    }

    return senha;
}


module.exports = gerarSenha;