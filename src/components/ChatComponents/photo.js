import { Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";

const Photo = ({ setImgMsg }) => {
    let [stream, setStream] = useState({
        access: false,
        recorder: null,
        error: ""
    });
    let [clickable, setClickable] = useState(true);
    let [showMe, setShowMe] = useState(true);   
    
    let preview = <video id="videopreview" muted srcObject={''} controls={false}></video>
    let [showPreview, setShowPreview] = useState(true)
    useEffect(() => {
        getAccess();
    }, [])
    function getAccess() {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((mic) => {
                let mediaPreview;
                try {
                    mediaPreview = new MediaRecorder(mic, {
                        mimeType: "video/webm"
                    })
                } catch (err) {
                    console.log(err);
                }

                const track = mediaPreview.stream.getTracks()[0];

                track.onended = () => {
                    console.log("ended");
                }
                mediaPreview.onstop = function () {
                    mediaPreview.stream.getTracks().forEach(track => track.stop());
                }
                mediaPreview.onstart = function () {
                    let video = document.querySelector("#videopreview");
                    video.srcObject = mic;
                    video.onloadedmetadata = function (e) {
                        video.play();
                    };
                }

                mediaPreview.start();

                setStream({
                    ...stream,
                    access: true,
                    recorder: mediaPreview
                });
            })
            .catch((error) => {
                console.log(error);
                setStream({ ...stream, error });
            });
    }
    let onstop = function () {
        setClickable(false);
        setShowPreview(false)
        let video = document.querySelector("#videopreview");
        let img = document.querySelector("#imgPre");
        const canvas = document.querySelector("canvas");
        canvas.width = 720;
        canvas.height = 480;
        canvas.getContext("2d").drawImage(video, 0, 0);
        var imgURL = canvas.toDataURL("image/png");
        img.src = imgURL        
        video.srcObject = null
        video.src = imgURL;
        let comp = <img key={'imageRec'} src={imgURL} id="mulMedPrev"></img>;
        setImgMsg({ msg: comp, content: imgURL, type: "image" })
        stream.recorder.stop()
    };
    let close = () => {
        setShowMe(false)
    }
    const ok = () => {
        setShowMe(false)
    }
    return (
        <Modal className="myModal" show={showMe}>
            <Modal.Header className="modalHeader"><h1>Take a selfie</h1>
            Please wait for the picture preview to load.</Modal.Header>
            <Modal.Body className="modalBody">
                {showPreview ? preview : 
                <div>
                    <img id="imgPre" src=""></img>
                    <canvas style={{ display: "none" }}></canvas>
                </div>
                }
            </Modal.Body>
            <Modal.Footer className="modalFooter">
                <button onClick={(e)=> close()}><i class="bi bi-x-circle"></i></button>
                <button id="retakePic"><i class="bi bi-arrow-clockwise"></i></button>
                <button onClick={() => { if (clickable) { onstop(); }}}>
                    <i class="bi bi-camera"></i>
                </button>
                <button 
                    id="okRecBtn"
                    onClick={(e)=>{ok()}}>
                    <i class="bi bi-check2-circle"></i>
                </button>
            </Modal.Footer>
        </Modal>
    );
}
export default Photo;
