import React, { Component } from "react";
import { render } from "react-dom";

class Main extends Component {
    componentDidMount() {

    }

    render() {
        const state = this.state || {};

        const normalSize = {
            height: "25rem",
            width: "25rem"
        };

        const fullscreen = {
            height: "100vh",
            width: "100vw",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: -1
        };

        const videoStyle = state.isFullscreen ? fullscreen : normalSize;

        const videoPlayerFit = { objectFit: state.streamVideo ? "cover" : "contain" };

        return (
            <div>
                <div>
                    <button onClick={e => this.toggleMyVideo()}>Toggle Video</button>
                    <button onClick={e => this.toggleFullscreen()}>Fullscreen</button>
                </div>
                <video
                    ref={x => this.myVideo = x}
                    style={{ ...videoStyle, ...videoPlayerFit }}
                    poster="http://icons.iconarchive.com/icons/paomedia/small-n-flat/128/profile-icon.png"></video>
            </div>
        );
    }

    toggleFullscreen() {
        const state = this.state || {};
        const el = document.documentElement;

        el.requestFullscreen = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
        document.exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;

        const isFullscreen = !state.isFullscreen;

        if (isFullscreen)
            el.requestFullscreen();
        else
            document.exitFullscreen();

        this.setState({ isFullscreen });
    }

    toggleMyVideo() {
        const state = this.state || {};
        const newState = !state.streamVideo;

        if (newState) {
            this.steamMyVideo().then(() => this.setState({ streamVideo: newState }));
        } else {
            this.myVideo.pause();
            this.myVideo.srcObject = null;

            this.setState({ streamVideo: newState });
        }
    }

    steamMyVideo() {
        const myVideo = this.myVideo;

        return navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            myVideo.srcObject = stream;
            myVideo.play();
        }).catch(e => console.error(e));
    }
}

const el = document.createElement("div");

document.body.appendChild(el);

render(<Main />, el);