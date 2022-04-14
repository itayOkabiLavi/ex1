import { Modal, Button } from "react-bootstrap";
import React, { useState, useRef, useEffect } from "react";

const Video = ({ setVideoMsg }) => {
    const chunks = useRef([]);
    let [showMe, setShowMe] = useState(true);
    let preview = <video id="videopreview" muted srcObject={''} controls={false}></video>
    let toatlSec = 0
    let mediaRecorder;
    let mediaPreview;
    let clock = <div id="clock"><span id="min">00</span><span>:</span><span id="sec">00</span></div>
    let setI;
    const startButton = <label id="" style={{ color: "red" }}><i class="bi bi-record-circle"></i></label>
    const stopButton = <label id=""><i class="bi bi-stop-fill"></i></label>
    let [startStopLabel, setStartStopLabel] = useState(startButton)

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
            sec.innerText = String(toatlSec % 60).padStart(2, '0')
            min.innerText = String(parseInt(toatlSec / 60)).padStart(2, '0')
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
                    setI = setTimer()
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
                mediaPreview.onstop = () => {
                    mediaPreview.stream.getTracks().forEach(track => track.stop());
                }
                mediaRecorder.ondataavailable = function (e) {
                    console.log("data available");
                    chunks.current.push(e.data);
                };
                mediaPreview.start();

                mediaRecorder.onstop = function () {
                    const url = URL.createObjectURL(chunks.current[0]);
                    let video = document.querySelector("#videopreview");
                    video.srcObject = null
                    video.src = url;
                    video.controls = true
                    clearInterval(setI)
                    console.log("stopped");
                    chunks.current = [];

                    setRecording({
                        active: false,
                        available: true,
                        url: url
                    });
                    mediaPreview.stream.getTracks().forEach(track => track.stop());
                    mediaRecorder.stream.getTracks().forEach(track => track.stop());
                    // let comp = <video key={recording.url} id="mulMedPrev" controls>
                    //     <source src={recording.url} type="video" />
                    // </video>;
                    // setVideoMsg({ msg: comp, content: url, type: "video" })
                };

                setStream({
                    ...stream,
                    access: true,
                    preview:mediaPreview,
                    recorder: mediaRecorder
                });
            })
            .catch((error) => {
                console.log(error);
                setStream({ ...stream, error });
            });
    }
    const beforeClose = () => {
        if (recording.active) stream.recorder.stop();
        console.log('beforeClose')
        try {
            stream.preview.stop()
        } catch {console.log('1 fail') }
        try {
            stream.recorder.stream.getTracks().forEach(track => track.stop());
        } catch { console.log('2 fail')}
        clearInterval(setI)
        setShowMe(false)
    }
    const close = () => {
        beforeClose()
        setVideoMsg({ msg: '', content: '', type: "" })
    }
    const ok = () => {
        beforeClose()
        let comp = <video key={recording.url} id="mulMedPrev" controls>
            <source src={recording.url} type="video" />
        </video>;
        setVideoMsg({ msg: comp, content: recording.url, type: "video" })
    }
    return (
        <Modal className="myModal" show={showMe}>
            <Modal.Header className="modalHeader"><h1>Record a video</h1>
                Please wait for the video preview to load.
            </Modal.Header>
            <Modal.Body className="modalBody">
                {clock}
                {preview}
            </Modal.Body>
            <Modal.Footer className="modalFooter">
                <button onClick={(e) => close()}><i class="bi bi-x-circle"></i></button>
                {recording.url == "" && <Button className="btn" onClick={() => {
                    if (recording.active) {
                        stream.recorder.stop();
                        setStartStopLabel("")
                    } else {
                        stream.recorder.start();
                        setStartStopLabel(stopButton)
                    }
                }}>
                    {startStopLabel}
                </Button>}
                {recording.available && <button
                    id="okRecBtn"
                    onClick={(e) => { ok() }}>
                    <i class="bi bi-check2-circle"></i>
                </button>}
            </Modal.Footer>
        </Modal>
    );
}
export default Video;
