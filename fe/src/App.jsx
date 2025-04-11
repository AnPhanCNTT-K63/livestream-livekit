import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles"; // Required styles
import { useEffect, useState } from "react";

const LIVEKIT_URL = "wss://dating-app-ue8mqe8m.livekit.cloud"; // Cloud or self-hosted
const BACKEND_URL = "http://localhost:3000/livestream";

function App() {
  const [token, setToken] = useState(null);
  const [roomName, setRoomName] = useState("demo-room");
  const [username, setUsername] = useState(
    `user_${Math.floor(Math.random() * 1000)}`
  );
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
    <div style={{ height: "100vh", fontFamily: "Arial, sans-serif" }}>
      {!hasJoined ? (
        <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
          <h1 style={{ textAlign: "center" }}>Join LiveKit Stream</h1>
          <form
            onSubmit={handleJoin}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div>
              <label
                htmlFor="username"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                Username:
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

            <div>
              <label
                htmlFor="roomName"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                Room Name:
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

            <div style={{ display: "flex", gap: "20px" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <input
                  type="checkbox"
                  id="enableVideo"
                  checked={enableVideo}
                  onChange={(e) => setEnableVideo(e.target.checked)}
                />
                <label htmlFor="enableVideo">Enable Camera</label>
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
                <label htmlFor="enableAudio">Enable Microphone</label>
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
              }}
            >
              {isLoading ? "Connecting..." : "Join Room"}
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
          style={{ height: "100vh" }}
        >
          <div style={{ padding: "16px", borderBottom: "1px solid #eaeaea" }}>
            <h1 style={{ textAlign: "center", margin: "0 0 16px" }}>
              LiveKit Room: {roomName}
            </h1>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={handleLeave}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Leave Room
              </button>
            </div>
          </div>
          <VideoConference />
        </LiveKitRoom>
      )}
    </div>
  );
}

export default App;
