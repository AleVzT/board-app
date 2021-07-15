import React from 'react';

import { NodoBoard } from './components/NodoBoard';
import { useFetch } from './hooks/useFetch';

export const BoardGateApp = () => {

    /* Se traen los datos de la api con la configuracion de la placa */
    const { data, loading } = useFetch('config');   
    
      return (
        <>

            <h2> BoardGateApp </h2>

            <hr /> 

            {
                loading
                ?
                    (
                        <div className="alert alert-info text-center">
                            Loading...
                        </div>

                    )
                :
                    (

                        <div className="container">
                            <div className="row">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-8 boardGate">
                                    
                                    <h3>
                                        TABLERO
                                    </h3>
                                    <NodoBoard data = { data } /> 

                                </div>
                                <div className="col-sm-2"></div>
                            </div>
                        </div>
                    )
            }

        </>
    )
}
