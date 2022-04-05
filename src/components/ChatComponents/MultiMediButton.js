import React, { useState } from "react";
import "./MultiMediaButton.css"

function MultiMediaButton ({ type, icon, uploadMulMed, title }) {
    const [content, setContent] = useState("")
    const [filter, setFilter] = useState("")
    const isRec = type.includes("Rec")
    type = isRec ? type - "Rec" : type
    // 
    function upload(e) {
        let val = e.target.files[0]
        console.log("called uploadMulMed ",val, type)
        let comp = "Not valid"
        let srcType = "audio/" + val.name.split(".")[1]
        let content = URL.createObjectURL(val)
        switch (type) {
            case "image":
                comp = <img key={content} id="mulMedPrev" src={content}/>
                break;
            case "audio":
                comp = <audio key={content} id="mulMedPrev" controls>
                    <source src={content} type={srcType}/>
                </audio>
                break;
            case "video":
                comp = <video key={content} id="mulMedPrev" controls autoPlay muted>
                    <source src={content} type={srcType}/>
                </video>
                break;
        }
        uploadMulMed(content, type, comp)
        e.target.value = null
    }
    if (isRec)
        return(
            <label key={type} id="mulMedInput" title={title}>
                {icon}
                <div></div>
            </label>
        )
    else
        return(
            <label key={type} id="mulMedInput" title={title}>
                {icon}
                <input hidden={true} type="file" onChange={(e)=>{upload(e)}} accept={type + "/*"}/>
            </label>
        );
}

export default MultiMediaButton