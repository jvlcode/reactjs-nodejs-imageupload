import { useRef, useState } from "react"
import axios from 'axios';

export default function Fileupload(){
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const [resultText, setResultText] = useState("");

    const fileInput = useRef();

    const saveFile = ()=>{
        setFile(fileInput.current.files[0]);
        setFileName(fileInput.current.files[0].name)
    }

    const uploadFile = async ()=>{
        const formData = new FormData();
        formData.append('file',file );
        formData.append('fileName',fileName );

        try{
           const res =  await axios.post('http://localhost:8000/upload',
                formData
            )
            setResultText(res.data.message)
            fileInput.current.value = "";
            setTimeout(()=>{
                setResultText("");
            },5000)
        }catch(ex){
            if(ex.response != undefined){
                setResultText(ex.response.data.message)
            }else{
                setResultText("Server Error!")
            }
            setTimeout(()=>{
                setResultText("");
            },5000)
        }


    }


    return (
        <div className="mt-5">
            <input type="file" ref={fileInput} onChange={saveFile} />
            <button onClick={uploadFile}>Upload</button>
            {resultText?(<p>{resultText}</p>):null}
        </div>
    )
}