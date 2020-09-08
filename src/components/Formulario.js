import React, {useEffect, useState} from 'react';
import Error from './Error';

import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Axios from 'axios';


const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2FE;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`;



const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    //state de llistado de criptomonedas
    const [listaCripto, guardarCriptomonedas] = useState([]);
    const [error, guardarError] = useState(false);

    const MONEDAS = [

        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'},
        {codigo: 'ARS', nombre: 'Peso Argentino'},
    ];

    //utilizar useMoneda

    const [moneda, SelectMonedas] = useMoneda('Elige tu moneda', '', MONEDAS);

    //utilizar criptomoneda
    const [criptoMoneda, SelectCripto] = useCriptomoneda('Elige tu criptomoneda', '',listaCripto);

    //Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await Axios.get(url);

            guardarCriptomonedas(resultado.data.Data);
        }

        consultarAPI();
    }, [])

    //cuando el usuario hace submit
    const cotizarMoneda = e => {
        e.preventDefault();

        //validar si ambos campos estan llenos
        if(moneda === '' || criptoMoneda === '')
        {
            guardarError(true);
            return;
        }
        else
        {
            //pasar los datos al componente principal
            guardarError(false);
            guardarMoneda(moneda);
            guardarCriptomoneda(criptoMoneda);
        }
    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}

            <SelectMonedas />

            <SelectCripto />

            <Boton
                type="submit"
                value="Calcular"
            >

            </Boton>
        </form>
     );
}
 
export default Formulario;