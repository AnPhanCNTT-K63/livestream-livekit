import { Injectable } from '@nestjs/common';
import { AccessToken } from 'livekit-server-sdk';

@Injectable()
export class LivekitService {
  private apiKey = process.env.LIVEKIT_API_KEY;
  private apiSecret = process.env.LIVEKIT_API_SECRET;

  generateToken(identity: string, roomName: string) {
    const at = new AccessToken(this.apiKey, this.apiSecret, {
      identity,
    });
    at.addGrant({ roomJoin: true, room: roomName });
    return at.toJwt();
  }
}
