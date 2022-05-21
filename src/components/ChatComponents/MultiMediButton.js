import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./MultiMediaButton.css"
import { api } from "../../api";
import Record from "./audio";
import Video from "./video"
import Photo from "./photo";
function MultiMediaButton({ type, icon, uploadMulMed, title }) {
    let [audioMsg, setAudioMsg] = useState("")
    let [videoMsg, setVideoMsg] = useState("")
    let [imgMsg, setImgMsg] = useState("")

    useEffect(() => {
        let content = videoMsg.content
        let type = videoMsg.type
        let msg = videoMsg.msg
        uploadMulMed(content, type, msg)

    }, [videoMsg])
    useEffect(() => {
        let content = audioMsg.content
        let type = audioMsg.type
        let msg = audioMsg.msg
        uploadMulMed(content, type, msg)

    }, [audioMsg])
    useEffect(() => {
        let content = imgMsg.content
        let type = imgMsg.type
        let msg = imgMsg.msg
        uploadMulMed(content, type, msg)
    }, [imgMsg])
    const [showModal, setShowModal] = useState(false)
    const isRec = type.includes("Rec")
    function upload(e) {
        let val = e.target.files[0]
        let comp = "Not valid"
        let srcType = type + "/" + val.name.split(".")[1]
        let content = URL.createObjectURL(val)
        switch (type) {
            case "image":
                comp = <img key={content} id="mulMedPrev" src={content} />
                break;
            case "audio":
                comp = <audio key={content} id="mulMedPrev" controls>
                    <source src={content} type={srcType} />
                </audio>
                break;
            case "video":
                comp = <video key={content} id="mulMedPrev" controls autoPlay muted>
                    <source src={content} type={srcType} />
                </video>
                break;
        }
        uploadMulMed(content, type, comp,val)
        e.target.value = null
    }
    if (isRec) {
        let myComp = ""
        switch (type) {
            case "audioRec":
                myComp = <Record setAudioMsg={setAudioMsg}/>
                break
            case "videoRec":
                myComp = <Video setVideoMsg={setVideoMsg}/>
                break
            case "imageRec":
                myComp = <Photo setImgMsg={setImgMsg}/>
                break
        }
        return (
            <div id={type}>
                <label key={type} id="mulMedInput" title={title} onClick={() => setShowModal(!showModal)}>
                    {icon}
                </label>
                {showModal ? myComp : ""}
            </div>
        )
    }
    else
        return (
            <label key={type} id="mulMedInput" title={title}>
                {icon}
                <input hidden={true} type="file" onChange={(e) => { upload(e) }} accept={type + "/*"} />
            </label>
        );
}

export default MultiMediaButton
