import { Modal } from "bootstrap";
import React from "react";
export default class MultiMedia extends React.Component {
    constructor(props) {
        this.type = props.type
        this.startRecord = props.startRecord
        this.stopRecord = props.stopRecord
        this.rec = ''

    }
    startRecord = e => {
        let audioChunks;
        // This will prompt for permission if not allowed earlier
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                this.rec = new MediaRecorder(stream)
                audioChunks = [];
                this.rec.ondataavailable = e => {
                    audioChunks.push(e.data);
                    if (this.rec.state == "inactive") {
                        let blob = new Blob(audioChunks, { type: 'audio/x-mpeg-3' });
                        let recordedAudio = document.getElementById('recordedAudio')
                        recordedAudio.src = URL.createObjectURL(blob);
                        recordedAudio.src = URL.createObjectURL(blob);
                        recordedAudio.controls = true;
                        recordedAudio.autoplay = true;
                    }
                }
                this.rec.start();
            })
            .catch(e => console.log(e));

    }
    stopRecord = e => {
        this.rec.stop();
        navigator.mediaDevices.getUserMedia({ audio: false })
    }
    render() {
        if (this.type == 'audio') {
            return (
                <Modal show={true} id='recordModal'>
                    <p>record</p>
                    <button onClick={this.startRecord}>start</button>
                    <button onClick={this.stopRecord}>stop</button>
                    <audio id='recordedAudio'></audio>
                </Modal>
            )
        }
    }
}