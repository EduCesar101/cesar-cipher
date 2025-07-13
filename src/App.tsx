import { useState } from 'react'
import './App.css'
import { cryptCesar, decryptCesar } from './modules/cesarCipher'
import { cryptVigenere, decryptVigenere } from './modules/vigenereCipher'
import { cryptTransposition, decryptTransposition } from './modules/transpositionCipher'

function App() {

  const [message, setMessage] = useState('')
  const [cText, setCText] = useState('')
  const [deslocamento, setDeslocamento] = useState(0)
  const [inputValue , setInputValue] = useState('')
  const [password, setPassword] = useState('')
  const [ciferType, setCiferType] = useState(0)
  let ciferNames = ["Cifra de César", "Cifra de Vigenere", "Cifra de Transposição"]

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    let cmsg : string;
    if(inputValue == 'C'){
      switch(ciferType){
        case 0:
          cmsg = cryptCesar(message, deslocamento)
          break
        
        case 1:
          cmsg = cryptVigenere(message, password)
          break
        
        case 2:
          cmsg = cryptTransposition(message, password)
          break
      }
    } else {
      switch(ciferType){
        case 0:
          cmsg = decryptCesar(message, deslocamento)
          break

        case 1:
          cmsg = decryptVigenere(message, password)
          break
        
        case 2:
          cmsg = decryptTransposition(message, password)
          break
      }
    }
    setCText(() => cmsg)
  }

  // Copy text to clipboard
  function copyToClipboard(){
    navigator.clipboard.writeText(cText);
    alert("Password Copied!");
  }

  return (
    <>
    <main>
      <div className="card">
        <h1>deCIFER</h1>
        <form onSubmit={handleSubmit}>

          <select name="" id="" onChange={(e) => setCiferType(parseInt(e.target.value))}>
            <option value="0" selected>Cifra de César</option>
            <option value="1">Cifra de Vigenere</option>
            <option value="2">Cifra de Transposição</option>
          </select>

          {/* Nome da Cifra */}
          <h3>{ciferNames[ciferType]}</h3>

        <div className="container">
          <label htmlFor="">Texto Normal</label>
          <br />  
          <textarea name="nText" id="message" value={message} onChange={(e) => setMessage(e.target.value)}
          placeholder='Digite o texto...' rows={4} cols={35}></textarea>
          <br />
          <br />
          
          {/*Cifra de Cesar*/}
          {ciferType == 0 && (
          <div className='passCifer'>
              <label htmlFor="">Deslocamento</label>
          <br />

          <button onClick={() => {
            if(deslocamento > 0){
              setDeslocamento(deslocamento - 1)
            }
              
            }}>-</button>
            <input type="number" value={deslocamento} onChange={(e) => setDeslocamento(e.target.valueAsNumber)} min={0} max={25} maxLength={2} readOnly/>
            <button onClick={() => {
              if(deslocamento < 25){
                setDeslocamento(deslocamento + 1)
              }
            }}>+</button>
          </div>
          )}

          {/*Cifra de Vigenere ou Cifra de Transposição*/}
          {ciferType !== 0 && (
            <div className="passCifer">
              <label htmlFor="">Senha</label> <br />
              <input type="text" onChange={(e) => setPassword(e.target.value)} max={25}/>
            </div>
          )}

          </div>
          <div className='buttons'>
            <button type='submit' onClick={() => setInputValue('C')}>Criptografar</button>
            <button type='submit' onClick={() => setInputValue('D')}>Descriptografar</button>
          </div>
          <div className='container'>  
            <label htmlFor="">Texto Final</label>
            <br />  
            <textarea name="cryptText" id="cText" placeholder='Texto Final' value={cText} readOnly rows={4} cols={35}></textarea>
            <br />
            <button onClick={() => copyToClipboard()}>Copiar</button>
          </div>

        </form>

      </div>
      </main>
    </>
  )
}

export default App
