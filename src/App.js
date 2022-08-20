import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import { default as NumberFormat } from 'react-number-format';
import './style.css'

import api from './service/api';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch(){
    // 01310930/json/

    if(input === ''){
      alert("Fill any CEP value!")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")

    }catch{
      alert("Error to find!")
      setInput("")
    }
  }

  return (
      <div className="container">
        <h1 className="title">PLAYGROUND AXIOS API</h1>

        <div className="containerInput">

          <NumberFormat
            type="text"
            format="#####-###"
            placeholder="00000-000"
            value={input}
            onChange={(e) => setInput(e.target.value) } />

          <button className="buttonSearch" onClick={handleSearch}>
            <FiSearch size={25} color="#FFF" />
          </button>
        </div>


        {Object.keys(cep).length > 0 &&(
          <main className='main'>
            <h2>CEP: {cep.cep}</h2>

            <span>{cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>{cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>

          </main>
        )}

      </div>
  );
}

export default App;
