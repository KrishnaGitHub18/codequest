import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8080");

function VoiceChat({ roomId }) {
  const [isMuted, setIsMuted] = useState(false);
  const localStreamRef = useRef(null);
  const peersRef = useRef({}); 

//   useEffect(() => {
//     if (!roomId) return;

//     socket.emit("joinRoom", roomId);

//     navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
//       localStreamRef.current = stream;

//       // Add local audio (for debugging, muted to prevent echo)
//       const audio = document.createElement("audio");
//       audio.srcObject = stream;
//       audio.muted = true;
//       audio.play();
//     });

//     socket.on("offer", async ({ sender, offer }) => {
//       if (peersRef.current[sender]) return;
//       const peer = createPeerConnection(sender);

//       await peer.setRemoteDescription(new RTCSessionDescription(offer));
//       const answer = await peer.createAnswer();
//       await peer.setLocalDescription(answer);

//       socket.emit("answer", { roomId, answer, to: sender });
//     });

//     socket.on("answer", async ({ sender, answer }) => {
//       const peer = peersRef.current[sender];
//       if (peer) {
//         await peer.setRemoteDescription(new RTCSessionDescription(answer));
//       }
//     });

//     socket.on("ice-candidate", async ({ sender, candidate }) => {
//       const peer = peersRef.current[sender];
//       if (peer && candidate) {
//         await peer.addIceCandidate(new RTCIceCandidate(candidate));
//       }
//     });

//     return () => {
//       socket.off("offer");
//       socket.off("answer");
//       socket.off("ice-candidate");
//     };
//   }, [roomId]);

    const pendingCandidates = useRef({});

useEffect(() => {
  if (!roomId) return;

  socket.emit("joinRoom", roomId);

  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    localStreamRef.current = stream;
    const audio = document.createElement("audio");
    audio.srcObject = stream;
    audio.muted = true;
    audio.play();
  });

  socket.on("offer", async ({ sender, offer }) => {
    const peer = createPeerConnection(sender);
    await peer.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);

    socket.emit("answer", { roomId, answer });

    if (pendingCandidates.current[sender]) {
      for (const candidate of pendingCandidates.current[sender]) {
        await peer.addIceCandidate(new RTCIceCandidate(candidate));
      }
      delete pendingCandidates.current[sender];
    }
  });

  socket.on("answer", async ({ sender, answer }) => {
    const peer = peersRef.current[sender];
    if (peer) {
      await peer.setRemoteDescription(new RTCSessionDescription(answer));

      if (pendingCandidates.current[sender]) {
        for (const candidate of pendingCandidates.current[sender]) {
          await peer.addIceCandidate(new RTCIceCandidate(candidate));
        }
        delete pendingCandidates.current[sender];
      }
    }
  });

  socket.on("ice-candidate", async ({ sender, candidate }) => {
    const peer = peersRef.current[sender];
    if (peer && peer.remoteDescription) {
      await peer.addIceCandidate(new RTCIceCandidate(candidate));
    } else {
      if (!pendingCandidates.current[sender]) {
        pendingCandidates.current[sender] = [];
      }
      pendingCandidates.current[sender].push(candidate);
    }
  });

  return () => {
    socket.off("offer");
    socket.off("answer");
    socket.off("ice-candidate");
  };
}, [roomId]);


  const createPeerConnection = (peerId) => {
    const peer = new RTCPeerConnection();

    localStreamRef.current.getTracks().forEach((track) =>
      peer.addTrack(track, localStreamRef.current)
    );

    peer.ontrack = (event) => {

        console.log("Received remote track:", event.streams);

      const audio = document.createElement("audio");
      audio.srcObject = event.streams[0];
      audio.autoplay = true;
      document.body.appendChild(audio);
    };

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", { roomId, candidate: event.candidate });
      }
    };

    peersRef.current[peerId] = peer;
    return peer;
  };

  const startCall = async () => {
    const peer = createPeerConnection(socket.id);
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);

    socket.emit("offer", { roomId, offer });
  };

  return (
    <div className="p-3 bg-[#2a2a2a] rounded-lg border border-gray-700">
      <button
        onClick={startCall}
        className="px-4 py-2 bg-green-600 rounded-md mr-2"
      >
        Start Call
      </button>
      <button
        onClick={() => {
          localStreamRef.current.getTracks().forEach((t) => (t.enabled = !isMuted));
          setIsMuted(!isMuted);
        }}
        className="px-4 py-2 bg-red-600 rounded-md"
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>
    </div>
  );
}

export default VoiceChat;
