import React, { useState, useRef, useEffect } from "react";

const Video = ({ setVideoMsg }) => {
    const chunks = useRef([]);
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
    return (
        <div className="video">
            {(
                <div className="video-container">
                    <button
                        className={"active"}

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
                    {clock}
                    {preview}
                  
                </div>
            )
            }
        </div>
    );
}
export default Video;
