import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import './audio.css'
import { Modal } from "react-bootstrap";
const Audio = ({ setAudioMsg }) => {
    let toatlSec = 0
    let mediaRecorder;
    let preview = <audio id="audiopreview" controls={false}></audio>
    let clock = <div id="clock"><span id="min">00</span><span>:</span><span id="sec">00</span></div>
    let setI;
    let [clickable, setClickable] = useState(true);
    let [showMe, setShowMe] = useState(true);

    const startButton = <label id="" style={{ color: "red" }}><i class="bi bi-record-circle"></i></label>
    const stopButton = <label id=""><i class="bi bi-stop-fill"></i></label>
    let [startStopLabel, setStartStopLabel] = useState(startButton)
    const chunks = useRef([]);

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
    const setTimer = () => {
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
        // return () => {
        //     clearInterval(setI)
        //     console.log('willUnmount')
        //     try {
        //         mediaRecorder.stream.getTracks().forEach(track => track.stop());
        //     } catch { }
        // }
    }, [])
    function getAccess() {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((mic) => {
                try {
                    mediaRecorder = new MediaRecorder(mic, {
                        mimeType: "audio/webm"
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

                mediaRecorder.ondataavailable = function (e) {
                    console.log("data available");
                    chunks.current.push(e.data);
                };
                mediaRecorder.onstop = function () {
                    clearInterval(setI)
                    console.log(toatlSec)
                    setClickable(false);
                    console.log("stopped");
                    const url = URL.createObjectURL(chunks.current[0]);
                    chunks.current = [];

                    setRecording({
                        active: false,
                        available: true,
                        url: url
                    });

                    let audio = document.querySelector("#audiopreview");
                    audio.src = url;
                    audio.controls = true
                    mediaRecorder.stream.getTracks().forEach(track => track.stop());
                    // let comp = <audio key={recording.url} id="mulMedPrev" controls>
                    //     <source src={recording.url} type="audio" />
                    // </audio>;
                    // setAudioMsg({ msg: comp, content: url, type: "audio" })
                };

                setStream({
                    ...stream,
                    access: true,
                    recorder: mediaRecorder
                });
                console.log(stream.recorder)
            })
            .catch((error) => {
                console.log(error);
                setStream({ ...stream, error });
            });
    }
    const beforeClose = () => {
        clearInterval(setI)
        console.log('beforeClose')
        try {
            mediaRecorder.stream.getTracks().forEach(track => track.stop());
        } catch { }
    }
    const close = () => {
        if (recording.active) stream.recorder.stop();
        beforeClose()
        setShowMe(false)
        setAudioMsg({ msg: '', content: '', type: "" })
    }
    const ok = () => {
        beforeClose()
        setShowMe(false)
        let comp = <audio key={recording.url} id="mulMedPrev" controls>
            <source src={recording.url} type="audio" />
        </audio>;
        setAudioMsg({ msg: comp, content: recording.url, type: "audio" })
    }
    return (
        <Modal className="myModal" show={showMe}>
            <Modal.Header className="modalHeader"><h1>Record an audio message</h1></Modal.Header>
            <Modal.Body className="modalBody">
                {recording.available ? preview : clock}
            </Modal.Body>
            <Modal.Footer className="modalFooter">
                <button onClick={(e) => close()}><i class="bi bi-x-circle"></i></button>
                {recording.url == "" && <Button className="btn" onClick={() => {
                    if (!clickable) return;
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
export default Audio;
