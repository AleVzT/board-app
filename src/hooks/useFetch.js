import { useEffect, useState } from "react";

export const useFetch = ( endpoint, data, method = 'GET' ) => {

    const baseUrl = 'http://localhost:8080/api';

    const url = `${ baseUrl }/${ endpoint }`;

    const [state, setState] = useState({ data: null, loading: true, error: null });
     
    useEffect( () => {

        /* Se llama la api con la configuracion de la placa */
        fetch( url )
            .then( resp => resp.json() )
            .then( data =>  {

                setState({
                    loading: false,
                    error: null,
                    data
                });
            });

    },[]);

    return state;
        
    
}
