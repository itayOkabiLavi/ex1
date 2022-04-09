import React, { useState, useRef, useEffect } from "react";

const Photo = ({ setVideoMsg }) => {
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

                mediaPreview.onstart = function () {
                    let video = document.querySelector("#videopreview");
                    video.srcObject = mic;
                    video.onloadedmetadata = function (e) {
                        video.play();
                    };
                }

                mediaPreview.start();
                mediaPreview.onstop = function () {
                    setstopClickable(false);
                    let video = document.querySelector("#videopreview");
                    let img = document.querySelector("#imgPre");
                    const canvas = document.querySelector("canvas");
                    canvas.width =400;
                    canvas.height = 400;
                    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
                    var imgURL = canvas.toDataURL("image/png");
                    img.src = imgURL
                    console.log("stopped");
                    // const url = URL.createObjectURL(chunks.current[0]);
                    // chunks.current = [];

                    setRecording({
                        active: false,
                        available: true,
                        url: imgURL
                    });

                    video.srcObject = null
                    video.src = imgURL;
                    video.controls = true
                    mediaPreview.stream.getTracks().forEach(track => track.stop());
                    let comp = <img key={img} id="mulMedPrev" controls>
                        {/*<source src={img} type="image" />*/}
                    </img>;
                    console.log("recording.url", img)
                    setVideoMsg({ msg: comp, content: imgURL, type: "image" })
                };
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
                    <img id="imgPre" src=""></img>
                    <canvas style={{display:"none"}}></canvas>
                </div>
            )
            }
        </div>
    );
}
export default Photo;
