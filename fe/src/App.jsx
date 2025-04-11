import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles"; // Required styles
import { useState } from "react";

const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL;
const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/livestream";

function App() {
  const [token, setToken] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [enableVideo, setEnableVideo] = useState(true);
  const [enableAudio, setEnableAudio] = useState(true);

  const fetchToken = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${BACKEND_URL}?room=${roomName}&user=${username}`
      );
      const { token } = await res.json();
      setToken(token);
      setHasJoined(true);
    } catch (error) {
      console.error("Error fetching token:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoin = (e) => {
    e.preventDefault();
    fetchToken();
  };

  const handleLeave = () => {
    setToken(null);
    setHasJoined(false);
  };

  return (
    <div
      style={{
        height: "100vh",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {!hasJoined ? (
        <div
          style={{
            maxWidth: "500px",
            margin: "auto",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <h1 style={{ textAlign: "center", marginBottom: "24px" }}>
            Livestream
          </h1>
          <form
            onSubmit={handleJoin}
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ flex: 1 }}>
                <label
                  htmlFor="username"
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    fontWeight: "bold",
                  }}
                >
                  Tên hiển thị:
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                  required
                />
              </div>

              <div style={{ flex: 1 }}>
                <label
                  htmlFor="roomName"
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    fontWeight: "bold",
                  }}
                >
                  ID Phòng:
                </label>
                <input
                  type="text"
                  id="roomName"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                  required
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "8px 0",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <input
                  type="checkbox"
                  id="enableVideo"
                  checked={enableVideo}
                  onChange={(e) => setEnableVideo(e.target.checked)}
                />
                <label htmlFor="enableVideo">Bật Camera</label>
              </div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <input
                  type="checkbox"
                  id="enableAudio"
                  checked={enableAudio}
                  onChange={(e) => setEnableAudio(e.target.checked)}
                />
                <label htmlFor="enableAudio">Bật Microphone</label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                padding: "10px 16px",
                backgroundColor: "#4a7dfc",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: isLoading ? "wait" : "pointer",
                fontWeight: "bold",
                marginTop: "8px",
              }}
            >
              {isLoading ? "Đang kết nối..." : "Tham gia phòng"}
            </button>
          </form>
        </div>
      ) : (
        <LiveKitRoom
          token={token}
          serverUrl={LIVEKIT_URL}
          connect={true}
          video={enableVideo}
          audio={enableAudio}
          data-lk-theme="default"
          style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <div
            style={{
              padding: "12px",
              borderBottom: "1px solid #eaeaea",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 style={{ margin: 0 }}>Phòng: {roomName}</h2>
            <button
              onClick={handleLeave}
              style={{
                padding: "6px 12px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Rời phòng
            </button>
          </div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <VideoConference />
          </div>
        </LiveKitRoom>
      )}
    </div>
  );
}

export default App;
