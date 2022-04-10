import React, { useState, useRef, useEffect } from "react";
import './audio.css'
const Audio = ({ setAudioMsg }) => {
    let [stream, setStream] = useState({
        access: false,
        recorder: null,
        error: ""
    });
    let [startClickable, setstartClickable] = useState(true);
    let [stopClickable, setstopClickable] = useState(false);

    let [recording, setRecording] = useState({
        active: false,
        available: false,
        url: ""
    });
    let preview = <audio id="audiopreview" controls={false}></audio>
    const chunks = useRef([]);
    useEffect(() => {
        getAccess();
    }, [])
    function getAccess() {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((mic) => {
                let mediaRecorder;
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
                    setstartClickable(false);
                    setstopClickable(true);
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
                    setstopClickable(false);
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
                    let comp = <audio key={recording.url} id="mulMedPrev" controls>
                        <source src={recording.url} type="audio" />
                    </audio>;
                    setAudioMsg({ msg: comp, content: url, type: "audio" })
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
    return (

        <div className="audio-container" id="audio-container">
            <button
                className={recording.active ? "active" : null}

                onClick={() => {
                    if (startClickable) {
                        stream.recorder.start();
                    }
                }}
            >
                Start Recording
            </button>
            <button onClick={() => {
                if (stopClickable) {
                    stream.recorder.stop();
                }
            }}>Stop Recording</button>
            {preview}
        </div>

    );
}
export default Audio;
