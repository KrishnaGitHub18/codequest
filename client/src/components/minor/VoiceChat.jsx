import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

// const socket = io("http://localhost:8080");
const socket = io(import.meta.env.VITE_API_URL);

function VoiceChat({ roomId }) {
  const localStreamRef = useRef(null);
  const peerRef = useRef(null); 
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!roomId) return;
    socket.emit("joinRoom", roomId);
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      localStreamRef.current = stream;
    });

    socket.on("offer", async ({ offer }) => {
      if (!peerRef.current) peerRef.current = createPeerConnection();
      await peerRef.current.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerRef.current.createAnswer();
      await peerRef.current.setLocalDescription(answer);
      socket.emit("answer", { roomId, answer });
    });

    socket.on("answer", async ({ answer }) => {
      if (peerRef.current && !peerRef.current.currentRemoteDescription) {
        await peerRef.current.setRemoteDescription(new RTCSessionDescription(answer));
      }
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      if (peerRef.current) {
        await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });
    return () => {
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      localStreamRef.current?.getTracks().forEach((t) => t.stop());
      peerRef.current?.close();
      peerRef.current = null;
    };
  }, [roomId]);



  const createPeerConnection = () => {
    const peer = new RTCPeerConnection();
    localStreamRef.current?.getTracks().forEach((track) =>
      peer.addTrack(track, localStreamRef.current)
    );

    peer.ontrack = (event) => {
      const audio = document.createElement("audio");
      audio.srcObject = event.streams[0];
      audio.autoplay = true;
      audio.muted = false; 
      document.body.appendChild(audio);
    };

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", { roomId, candidate: event.candidate });
      }
    };

    return peer;
  };



  const startCall = async () => {
    if (!peerRef.current) peerRef.current = createPeerConnection();
    const offer = await peerRef.current.createOffer();
    await peerRef.current.setLocalDescription(offer);

    socket.emit("offer", { roomId, offer });
  };

  return (
    <div>
      <button onClick={startCall}>Start Call</button>
      <button
        onClick={() => {
          localStreamRef.current?.getTracks().forEach(
            (t) => (t.enabled = isMuted)
          );
          setIsMuted(!isMuted);
        }}
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>
    </div>
  );
}

export default VoiceChat;
