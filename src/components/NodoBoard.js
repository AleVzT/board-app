import React, { useState } from 'react';

import { useForm } from './../hooks/useForm';
import { CalendarModal } from './ClusterModal';

export const NodoBoard = ( { data } ) => {

    let { columna, fila, board } = !!data && data;

    const [openModal, setOpenModal] = useState(false);

    const { cols, rows, handleInputDimension } = useForm({
        cols: columna,
        rows: fila
    });

    const [ dataModal, setDataModal ] = useState();

    const [boardState, setBoardState] = useState(board);
    
    /* Cambiar de estado los puntos */
    const changeValue = (i, k, cols) => {
        board = boardState;
        board[i][k] = cols? 0 : 1;
        setBoardState([...board]);
    };

    /* Guardar la placa configurada */
    const handelSendBoard = () => {
        setOpenModal(false);
        /* Se hace la peticion POST enviando la configuracion de la placa */
        fetch('http://localhost:8080/api/config', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                board : boardState
            })
        }).then( resp => resp.json() )
        .then( data =>  {
            
            /* Se guardan los datos del Cluster Generado */
            const { cluster } = data;
            setDataModal(cluster);
            setOpenModal(true);

        });
    };

    /* Cambia la configuración de la placa */
    const handleSubmitForm = (e) => {
        e.preventDefault();

        board = new Array(parseInt(rows)).fill(0).map( () => new Array(parseInt(cols)).fill(0));
        setBoardState([...board]);
    }

    return (
        <>
            <form onSubmit={ handleSubmitForm }>
                <label>Filas:</label>
                <input 
                    type="number"
                    name="rows"
                    value={ rows }
                    onChange= { handleInputDimension }
                />
                <label>Columnas:</label>
                <input 
                    type="number"
                    name="cols"
                    value={ cols }
                    onChange= { handleInputDimension } 
                />
                <input type="submit" value="OK" />
                <div className="alert alert-warning boardGate" role="alert">
                    Al modificar la dimensión del tablero se reinicia la configuración
                </div>
            </form>
       

            <hr /> 
            { 
                boardState.map( (rows, i)  => {
                    return  <div key={ i }>
                                {
                                    rows.map( (cols, k) => {
                                        return  (                                         
                                                <button 
                                                    type="button" 
                                                    className="btn btn-light"
                                                    key={ k } 
                                                    onClick={ () => changeValue(i, k, cols) }> { cols? '-' : 'o' }
                                                </button>
                                        )
                                    })
                                }
                            </div>
                })
            }
            <hr />
            <button 
                    type="button" 
                    className="btn btn-success button-tablero"
                    onClick={ handelSendBoard }
            >Enviar</button>
            {/* Se renderiza la modal para mostrar el cluster */}
            <CalendarModal openModal = { openModal } dataModal = { dataModal } />
        </>
    )
}
