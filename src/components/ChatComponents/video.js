import React, { useState, useRef, useEffect } from "react";

const Video = ({ setVideoMsg }) => {
    let setMsg = setVideoMsg

    const [stream, setStream] = useState({
        access: false,
        recorder: null,
        error: ""
    });

    const [recording, setRecording] = useState({
        active: false,
        available: false,
        url: ""
    });
    let preview = <video id="videopreview" width='480' height='200' autoPlay muted srcObject={''} controls={false}></video>
    const chunks = useRef([]);
    useEffect(() => {
        getAccess();
    }, [])
    function getAccess() {
        navigator.mediaDevices
            .getUserMedia({ video: { width: 480, height: 144 }, audio: true })
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
                    //navigator.mediaDevices.getUserMedia({ video: false, audio: false });
                }

                mediaRecorder.onstart = function () {
                    setRecording({
                        active: true,
                        available: false,
                        url: ""
                    });


                    let video = document.querySelector("#videopreview");
                    video.srcObject = mic;
                    video.onloadedmetadata = function (e) {
                        video.play();
                    };


                };
                mediaPreview.onstart = function () { 
                    let video = document.querySelector("#videopreview");
                    video.srcObject = mic;
                    video.onloadedmetadata = function (e) {
                        video.play();
                    };
                }
                mediaRecorder.ondataavailable = function (e) {
                    //if (!recording.active) { return }
                    console.log("data available");
                    chunks.current.push(e.data);
                };
                mediaPreview.start();
                //mediaRecorder.start()
                mediaRecorder.onstop = function () {
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
                    console.log("recording.url", url)
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
                            stream.recorder.start();
                            //!recording.active && stream.recorder.start();
                        }}
                    >
                        Start Recording
                    </button>
                    <button onClick={() => {
                        stream.recorder.stop();

                    }}>Stop Recording</button>
                    {preview}
                    {/*recording.available && video1*/}
                    {/*!recording.available && preview*/}
                </div>
            )
            }
        </div>
        // <div className="video">
        //     {stream.access ? (
        //         <div className="video-container">
        //             <button
        //                 className={recording.active ? "active" : null}
        //                 onClick={() => !recording.active && stream.recorder.start()}
        //             >
        //                 Start Recording
        //             </button>
        //             <button onClick={() => {
        //                 stream.recorder.stop();
        //             }}>Stop Recording</button>
        //             {preview}
        //             {/*recording.available && video1*/}
        //             {/*!recording.available && preview*/}
        //         </div>
        //     ) : (
        //         <button onClick={getAccess}>Get Mic Access</button>
        //     )}
        // </div>
    );
}
export default Video;
