import React, { useState } from 'react'
import ReactModal from 'react-modal';
import './body.css'
import UploadForm from './uploadForm/UploadForm';

export default function Body() {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <div className='body'>
            <button 
                className = 'modal-button'
                onClick={() => setModalIsOpen(true)}
            >
                Upload Design
            </button>
            <ReactModal 
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
            >
                <div className='modal'>
                    <div>
                        <UploadForm/>
                    </div>
                    <div>
                        <div className = 'close-button'
                            onClick={() => setModalIsOpen(false)}
                        >
                            <i className='fa fa-close'></i>
                        </div>
                    </div>
                </div>
            </ReactModal>
        </div>
    )
}
