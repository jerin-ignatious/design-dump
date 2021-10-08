import React, { useState } from 'react'
import './upload-form.css'
import { app } from '../../../firebase/base'
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';

const db = getFirestore();

export default function UploadForm() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [file, setFile] = useState('');
    const [message, setMessage] = useState('');
    const [loader, setLoader] = useState(false);

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        setLoader(true);

        const storage = getStorage();
        const storageRef = ref(storage, email + '/' + file.name);
        uploadBytes(storageRef, file).then(() => {
        console.log('Uploaded file!');
        });

        try {
            const docRef = await addDoc(collection(db, "users"), {
                name: name,
                email: email,
                phone: phone,
                file: file.name,
                message: message,
            });

            setLoader(false);
            alert("Your design has been submitted👍");
        } catch (e) {
            console.error("Error adding document: ", e);
            alert("Error while submitting your design");
            setLoader(false);
        }

        setName('');
        setEmail('');
        setPhone('');
        setFile('');
        setMessage('');
    }

    return (
        <div className='upload-form'>
            <form onSubmit={handleSubmit}>
                <div className='form-item'>
                    <label>Name</label>
                    <br/>
                    <input
                        type='text' 
                        placeholder='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='form-item'>
                    <label>Email</label>
                    <br/>
                    <input 
                        type='email' 
                        placeholder='email address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='form-item'>
                    <label>Phone</label>
                    <br/>
                    <input 
                        type='number' 
                        placeholder='phone number'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className='form-item'>
                    <label>Upload Design</label>
                    <br/>
                    <input 
                        type = "file" 
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>
                <div className='form-item'>
                    <label>Additional Information</label>
                    <br/>
                    <textarea 
                        placeholder='Instructions for us'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <button 
                    className='form-button'
                    type='submit'
                    style = {{ background : loader ? '#ccc' : "skyblue"}}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}
