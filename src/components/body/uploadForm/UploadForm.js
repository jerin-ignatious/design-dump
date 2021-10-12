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
    const [phoneError, setPhoneError] = useState(false);
    const [nameError, setNameError] = useState(false);

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        if(!name.match(/^[a-zA-Z ]*$/)){
            setNameError(true);
        }
        else if(phone.length !== 10 || !phone.match(/[0-9]/)){
            setPhoneError(true);
        }
        else{
            setLoader(true);
            setPhoneError(false);
            setNameError(false);

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
                alert("Your design has been submitted👍 \nWe will contact you once your design is ready");
            } catch (e) {
                console.error("Error adding document: ", e);
                alert("Error while submitting your design");
                setLoader(false);
            }
            
            document.getElementById("filename").value = null;
            setName('');
            setEmail('');
            setPhone('');
            setFile('');
            setMessage('');
        }
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
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {nameError && <p style={{fontSize: 16, color:'red'}}>No special characters allowed</p>}
                </div>
                <div className='form-item'>
                    <label>Email</label>
                    <br/>
                    <input 
                        type='email' 
                        placeholder='email address'
                        required
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
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    {phoneError && <p style={{fontSize: 16, color:'red'}}>Please enter a valid phone number</p>}
                </div>
                <div className='form-item'>
                    <label>Upload Design</label>
                    <br/>
                    <input 
                        type = "file" 
                        required
                        id = 'filename'
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
