import React, { useState, useRef, useEffect } from "react";

const Video = ({ setVideoMsg }) => {
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
    let preview = <video id="videopreview" muted srcObject={''} controls={false}></video>
    const chunks = useRef([]);
    useEffect(() => {
        getAccess();
    }, [])
    function getAccess() {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((mic) => {
                let mediaRecorder;
                let mediaPreview;
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
            )
            }
        </div>
    );
}
export default Video;
