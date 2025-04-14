import { useState } from 'react'
import './App.css'
import { cryptText, decryptText } from './modules/index'

function App() {

  const [message, setMessage] = useState('')
  const [cText, setCText] = useState('')
  const [deslocamento, setDeslocamento] = useState(0)
  const [inputValue , setInputValue] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    let cmsg : string;
    if(inputValue == 'C'){
      cmsg = cryptText(message, deslocamento)
    } else {
      cmsg = decryptText(message, deslocamento)
    }
    setCText(() => cmsg)
  }

  function copyToClipboard(){
    navigator.clipboard.writeText(cText);
    alert("Password Copied!");
  }

  return (
    <>
      <div className="main">
        
      <h1>Cifra de César</h1>
        <form onSubmit={handleSubmit}>
      <div className="card">
        <label htmlFor="">Texto Normal</label>
        <br />  
        <textarea name="nText" id="message" value={message} onChange={(e) => setMessage(e.target.value)}
         placeholder='Digite o texto...' rows={4} cols={35}></textarea>
        <br />
        <br />

        <div>
        <label htmlFor="">Deslocamento</label> <br />
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
      </div>
      <div className='buttons'>
        <button type='submit' onClick={() => setInputValue('C')}>Criptografar</button>
        <button type='submit' onClick={() => setInputValue('D')}>Descriptografar</button>
      </div>
      <div className='card'>  
      <label htmlFor="">Texto Final</label>
        <br />  
        <textarea name="cryptText" id="cText" placeholder='Texto Final' value={cText} readOnly rows={4} cols={35}></textarea>
        <br />
        <button onClick={() => copyToClipboard()}>Copiar</button>
      </div>

      </form>
    </div>
    </>
  )
}

export default App
