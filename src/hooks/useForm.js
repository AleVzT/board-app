import { useState } from "react";


export const useForm = ( initialState = {cols: 10, rows: 10} ) => {

    const [values, setValues] = useState(initialState);

    const { cols, rows } = values;

    const handleInputDimension = ({ target }) => {
        if(target.value > 0 && target.value < 11) {
            setValues({
                ...values,
                [target.name]: target.value
            });
        }
    }

    return { cols, rows, handleInputDimension };

};
