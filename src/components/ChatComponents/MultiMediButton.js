import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./MultiMediaButton.css"
import Record from "./audio";
import Video from "./video"
import Photo from "./photo";
function MultiMediaButton({ type, icon, uploadMulMed, title }) {
    const [content, setContent] = useState("")
    const [filter, setFilter] = useState("")
    let [audioMsg, setAudioMsg] = useState("")
    let [videoMsg, setVideoMsg] = useState("")
    let [imgMsg, setImgMsg] = useState("")

    useEffect(() => {
        let content = videoMsg.content
        let type = videoMsg.type
        let msg = videoMsg.msg
        console.log('useEffect', msg)
        uploadMulMed(content, type, msg)
    }, [videoMsg])
    useEffect(() => {
        let content = audioMsg.content
        let type = audioMsg.type
        let msg = audioMsg.msg
        console.log('useEffect', msg)
        uploadMulMed(content, type, msg)

    }, [audioMsg])
    useEffect(() => {
        let content = imgMsg.content
        let type = imgMsg.type
        let msg = imgMsg.msg
        console.log('useEffect', msg)
        uploadMulMed(content, type, msg)
    }, [imgMsg])
    const [showModal, setShowModal] = useState(false)
    const isRec = type.includes("Rec")
    //type = isRec ? type - "Rec" : type
    // 
    function upload(e) {
        let val = e.target.files[0]
        console.log("called uploadMulMed ", val, type)
        let comp = "Not valid"
        let srcType = "audio/" + val.name.split(".")[1]
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
        uploadMulMed(content, type, comp)
        e.target.value = null
    }
    if (isRec) {
        console.log("type", type)
        return (
            <div id={type}>
                <label key={type} id="mulMedInput" title={title} onClick={() => setShowModal(!showModal)}>
                    {icon}
                </label>
                <Modal show={showModal}>
                    <div>
                        {type == "audioRec" && <Record setAudioMsg={setAudioMsg}></Record>}
                        {type == "videoRec" && <Video setVideoMsg={setVideoMsg}></Video>}
                        {type == "imageRec" && <Photo setImgMsg={setImgMsg}></Photo>}

                        <Button onClick={() => {
                            let video = document.querySelector("#videopreview");
                            try {
                                video.srcObject.getTracks().forEach(track => track.stop());
                            } catch { }
                            setShowModal(!showModal);
                        }}>exit</Button>
                    </div>
                </Modal>
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
