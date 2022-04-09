import React, { useState, useRef } from "react";

const Record = ({ setAudioMsg }) => {
    let setMsg = setAudioMsg
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

    const chunks = useRef([]);

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
                track.onended = () => console.log("ended");

                mediaRecorder.onstart = function () {
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
                    console.log("stopped");

                    const url = URL.createObjectURL(chunks.current[0]);
                    chunks.current = [];

                    setRecording({
                        active: false,
                        available: true,
                        url: url
                    });
                    mediaRecorder.stream.getTracks().forEach(track => track.stop());
                    let comp = <audio key={recording.url} id="mulMedPrev" controls>
                        <source src={recording.url} type="audio" />
                    </audio>;
                    console.log("recording.url", url)
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
        <div className="record">
            {stream.access ? (
                <div className="audio-container">
                    <button
                        className={recording.active ? "active" : null}
                        onClick={() => !recording.active && stream.recorder.start()}
                    >
                        Start Recording
                    </button>
                    <button onClick={() => {
                        stream.recorder.stop();

                        // let comp = <audio key={recording.url} id="mulMedPrev" controls>
                        //     <source src={recording.url} type="audio" />
                        // </audio>;
                        // console.log("recording.url", recording.url)
                        // //while(!recording.available)
                        // setAudioMsg({ msg: comp, content: recording.url, type: "audio" })
                    }}>Stop Recording</button>
                    {recording.available && <audio controls src={recording.url} />}
                </div>
            ) : (
                <button onClick={getAccess}>Get Mic Access</button>
            )}
        </div>
    );
}
export default Record;