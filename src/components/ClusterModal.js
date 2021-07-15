import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');

export const CalendarModal = ({ openModal, dataModal }) => {

     const [valuesModal, setValuesModal] = useState([]);

    const [modalIsOpen, setIsOpen] = useState(openModal);
    
    useEffect( () => {
        setIsOpen(openModal);
    },[openModal]);


    useEffect( () => {
        setValuesModal(dataModal);
    },[dataModal]);

    /* Cierra la modal */
    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <Modal
            isOpen={ modalIsOpen }
            onRequestClose={ closeModal }
            style={ customStyles }
            contentLabel="Example Modal"
        >

            <h2>Cluster Generado</h2>
            <hr/>
            {
                valuesModal
                ?
                    (
                        valuesModal.map( (c, i)  => {
                            return  <div key={ i }>
                                        {
                                            c                                       
                                        }
                                    </div>
                        })
                    )
                    :
                    ( 
                        <div className="alert alert-info text-center">
                            Loading...
                        </div>
                    )

            }
        
        </Modal>
    )
}