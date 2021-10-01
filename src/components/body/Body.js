import React from 'react'
import './body.css'
import { app } from '../../firebase/base'
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default function Body() {

    const onChange = (event) => {
        const file = event.target.files[0];
        const storage = getStorage();
        const storageRef = ref(storage, file.name);

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded file!');
        });
    }

    return (
        <div>
            Design Dump
            <input type = "file" onChange={onChange}/>
        </div>
    )
}
