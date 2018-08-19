import React, { Component } from "react";
import { render } from "react-dom";

class Main extends Component {
    componentDidMount() {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        const myVideo = this.myVideo;

        navigator.getUserMedia({ video: true, audio: true }, stream => {
            myVideo.srcObject = stream;
            myVideo.play();
        }, () => console.error("My media failed"));
    }

    render() {
        return (
            <div>
                <video ref={x => this.myVideo = x}></video>
            </div>
        );
    }
}

const el = document.createElement("div");

document.body.appendChild(el);

render(<Main />, el);