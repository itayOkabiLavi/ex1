import { Modal } from "react-bootstrap";
import React, { useState, useRef, useEffect } from "react";

const Video = ({ setVideoMsg }) => {
    const chunks = useRef([]);
    let [showMe, setShowMe] = useState(true);   

    let [startClickable, setstartClickable] = useState(true);
    let [stopClickable, setstopClickable] = useState(false);
    let preview = <video id="videopreview" muted srcObject={''} controls={false}></video>
    let toatlSec = 0
    let mediaRecorder;
    let mediaPreview;
    let clock = <div id="clock"><span id="min"></span><span id="sec"></span></div>
    let setI;
    let [stream, setStream] = useState({
        access: false,
        recorder: null,
        error: ""
    });


    let [recording, setRecording] = useState({
        active: false,
        available: false,
        url: ""
    });
    let setTimer = () => {
        return setInterval(() => {
            ++toatlSec
            let min = document.getElementById("min")
            let sec = document.getElementById("sec")
            sec.innerText = toatlSec % 60
            min.innerText = parseInt(toatlSec / 60) + ':'
        }, 1000)
    }
    useEffect(() => {
        getAccess();
        return () => {
            clearInterval(setI)
            console.log('willUnmount')
            try {
                mediaRecorder.stream.getTracks().forEach(track => track.stop());
            } catch { }
        }
    }, [])
    function getAccess() {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((mic) => {
                try {
                    mediaPreview = new MediaRecorder(mic, {
                        mimeType: "video/webm"
                    })
                    mediaRecorder = new MediaRecorder(mic, {
                        mimeType: "video/webm"
                    });
                } catch (err) {
                    console.log(err);
                }

                const track = mediaRecorder.stream.getTracks()[0];

                track.onended = () => {
                    console.log("ended");
                }

                mediaRecorder.onstart = function () {
                    //mediaPreview.stop()
                    //mediaPreview.stream.getTracks().forEach(track => track.stop());
                    setI = setTimer()
                    setstartClickable(false);
                    setstopClickable(true);
                    setRecording({
                        active: true,
                        available: false,
                        url: ""
                    });
                };
                mediaPreview.onstart = function () {
                    let video = document.querySelector("#videopreview");
                    video.srcObject = mic;
                    video.onloadedmetadata = function (e) {
                        video.play();
                    };
                }
                mediaPreview.onstop=()=>{
                    // let video = document.querySelector("#videopreview");
                    // console.log(video)
                    // video.srcObject = null
                    // video.src=null
                }
                mediaRecorder.ondataavailable = function (e) {
                    console.log("data available");
                    chunks.current.push(e.data);
                };
                mediaPreview.start();

                mediaRecorder.onstop = function () {
                    clearInterval(setI)
                    setstopClickable(false);
                    console.log("stopped");
                    const url = URL.createObjectURL(chunks.current[0]);
                    chunks.current = [];

                    setRecording({
                        active: false,
                        available: true,
                        url: url
                    });

                    let video = document.querySelector("#videopreview");
                    video.srcObject = null
                    video.src = url;
                    video.controls = true
                    mediaRecorder.stream.getTracks().forEach(track => track.stop());
                    let comp = <video key={recording.url} id="mulMedPrev" controls>
                        <source src={recording.url} type="video" />
                    </video>;
                    setVideoMsg({ msg: comp, content: url, type: "video" })
                };

                setStream({
                    ...stream,
                    access: true,
                    recorder: mediaRecorder
                });
            })
            .catch((error) => {
                console.log(error);
                setStream({ ...stream, error });
            });
    }
    const close = () => {
        setShowMe(false)
    }
    const ok = () => {
        setShowMe(false)
    }
    return (
        <Modal className="myModal" show={showMe}>
            <Modal.Header className="modalHeader"><h1>Record a video</h1>
            Wait for the video preview to load.
            </Modal.Header>
            <Modal.Body className="modalBody">
                {clock}
                {preview}
            </Modal.Body>
            <Modal.Footer className="modalFooter">
            <button onClick={(e)=> close()}><i class="bi bi-x-circle"></i></button>
            <button id="startRecordingBtn" 
                    onClick={(e) => { if (startClickable) { stream.recorder.start(); } }}>
                    <i class="bi bi-record-circle"></i>
            </button>
            <button id="" onClick={(e) => {if (stopClickable) {stream.recorder.stop()}}}>
                <i class="bi bi-stop-fill"></i>
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
export default Video;
