import axios from "axios";

const initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });
    socket.on("codeChange", ({ roomId, code }) => {
      socket.to(roomId).emit("codeUpdate", code);
    });
    socket.on("inputChange", ({ roomId, input }) => {
      socket.to(roomId).emit("inputUpdate", input);
    });







    socket.on("offer", ({ roomId, offer }) => {
      socket.to(roomId).emit("offer", { offer });
    });

    socket.on("answer", ({ roomId, answer }) => {
      socket.to(roomId).emit("answer", { answer });
    });

    socket.on("ice-candidate", ({ roomId, candidate }) => {
      socket.to(roomId).emit("ice-candidate", { candidate });
    });




    socket.on("runCode", async ({ roomId, code, stdin }) => {
      try {
        const data = {
          language_id: 14, 
          source_code: code,
          stdin: stdin || "",
        };
        // const result = await axios.post("http://localhost:8080/api/run", data);
        const result = await axios.post("https://codequest-1-k3kl.onrender.com/api/run", data);
        const output = result?.data?.stdout || result?.data?.stderr || "No output";
        io.to(roomId).emit("output", output);
      } catch (err) {
        io.to(roomId).emit("output", "Error running code!");
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export default initSocket;
