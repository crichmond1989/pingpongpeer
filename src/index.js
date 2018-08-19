import Peer from "peerjs";
import React, { Component } from "react";
import { render } from "react-dom";

class Main extends Component {
    constructor(props) {
        super(props);

        const peer = new Peer();

        peer.on("open", id => {
            console.log(`Peer opened. ID: ${id}`);

            this.setState({ peerId: id });
        });
    }

    render() {
        const state = this.state || {};

        return (
            <div>
                <p>Peer ID: {state.peerId || "Unknown"}</p>
            </div>
        );
    }
}

const el = document.createElement("div");

document.body.appendChild(el);

render(<Main />, el);