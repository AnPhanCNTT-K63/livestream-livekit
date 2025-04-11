import { useEffect } from "react";
import { Room, connect } from "livekit-client";

const LiveStream = ({ token, url }) => {
  useEffect(() => {
    const room = new Room();

    connect(url, token, {
      room,
      autoSubscribe: true,
    }).then(() => {
      room.localParticipant.setCameraEnabled(true);
      room.localParticipant.setMicrophoneEnabled(true);
    });

    return () => room.disconnect();
  }, [token, url]);

  return <div id="video-container" />;
};
