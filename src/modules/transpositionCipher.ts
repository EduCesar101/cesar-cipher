export function cryptTransposition(message: String, password: String) {
  const cleanMessage = message.replace(/\s/g, ''); // remove espaços
  const numCols = password.length;
  const numRows = Math.ceil(cleanMessage.length / numCols);

  const matrix = Array.from({ length: numRows }, () => Array(numCols).fill(''));

  let index = 0;
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      if (index < cleanMessage.length) {
        matrix[r][c] = cleanMessage[index++];
      }
    }
  }

  const passwordArray = password.split('');
  const sortedIndices = passwordArray
    .map((char, index) => ({ char, index }))
    .sort((a, b) => a.char.localeCompare(b.char))
    .map(obj => obj.index);

  // Criptografa: leitura por colunas na ordem da senha ordenada
  let encrypted = '';
  for (const colIndex of sortedIndices) {
    for (let row = 0; row < numRows; row++) {
      const char = matrix[row][colIndex];
      if (char) encrypted += char;
    }
  }
  return encrypted;
}

export function decryptTransposition(cipherText: String, password: String) {
  const numCols = password.length;
  const numRows = Math.ceil(cipherText.length / numCols);
  const totalChars = cipherText.length;

  // Determina a ordem das colunas com base na senha (ordem alfabética)
  const passwordArray = password.split('');
  const sortedIndices = passwordArray
    .map((char, index) => ({ char, index }))
    .sort((a, b) => a.char.localeCompare(b.char))
    .map(obj => obj.index);

  // Calcula quantos caracteres cada coluna deve ter
  const colLengths = new Array(numCols).fill(Math.floor(totalChars / numCols));
  const extraChars = totalChars % numCols;
  for (let i = 0; i < extraChars; i++) {
    colLengths[sortedIndices[i]]++; // as primeiras colunas têm 1 a mais
  }

  // Preenche a matriz com os caracteres do texto criptografado
  const matrix = Array.from({ length: numRows }, () => Array(numCols).fill(''));
  let pointer = 0;

  for (let i = 0; i < numCols; i++) {
    const colIndex = sortedIndices[i];
    const len = colLengths[colIndex];

    for (let row = 0; row < len; row++) {
      matrix[row][colIndex] = cipherText[pointer++];
    }
  }

  // Lê a mensagem original linha por linha
  let decrypted = '';
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const char = matrix[row][col];
      if (char) decrypted += char;
    }
  }

  return decrypted;
}
