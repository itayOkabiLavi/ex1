import React, { useState, useEffect } from "react";

const Photo = ({ setImgMsg }) => {
    let [stream, setStream] = useState({
        access: false,
        recorder: null,
        error: ""
    });
    let [clickable, setClickable] = useState(true);

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
    return (
        <div className="video">
            {(
                <div className="video-container">
                    <button onClick={() => {
                        if (clickable) {
                            onstop();
                        }
                    }}>take photo</button>
                    {preview}
                    <img id="imgPre" src=""></img>
                    <canvas style={{ display: "none" }}></canvas>
                </div>
            )
            }
        </div>
    );
}
export default Photo;
