import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';
import Axios from 'axios';
import PropTypes from 'prop-types';


const Contenedor = styled.div`
  max-width: 900px;
  margin:0 auto;
  @media (min-width:992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

    &::after{
      content: '';
      width: 100px;
      height: 6px;
      background-color: #66A2FE;
      display: block;
    }
`;



function App() {

  //crear el state
  const [moneda, guardarMoneda] = useState('');
  const [criptoMoneda, guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);



  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      //evitar que ejecute la primera vez
      if(moneda === '') return;

      //consultar la api para obtener la cotizacion

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;

      const resultado = await Axios.get(url);


      //mostrar el spinner
      guardarCargando(true);

      setTimeout(() => {
        guardarCargando(false);

        guardarResultado(resultado.data.DISPLAY[criptoMoneda][moneda]);
      }, 3000);

    }    
    
    cotizarCriptomoneda();

  }, [moneda, criptoMoneda]);

//mostrar spinner o resultado
const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado}/>

  return (
   <Contenedor>
     <div>
      <Imagen 
        src={imagen}
        alt="Imagen cripto"
      />
     </div>
     <div>
        <Heading>
          Cotiza criptomonedas al instante
        </Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />

        {componente}
        
     </div>
   </Contenedor>
  );
}

Imagen.propTypes = {
  src: PropTypes.string.isRequired,
  alt:PropTypes.string
}

Formulario.propTypes = {
  guardarMoneda: PropTypes.func.isRequired,
  guardarCriptomoneda: PropTypes.func.isRequired
}
export default App;
