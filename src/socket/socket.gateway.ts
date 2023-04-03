import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketServer,
  WsException,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TOKENS } from 'config';
import { CheckUsername } from './dto/check-username';
import { UserService } from 'src/user/user.service';
import { OnlineStatus, User } from '@prisma/client';
import { AsyncApiPub, AsyncApiService } from 'nestjs-asyncapi';
import { CheckEmail } from './dto/check-email';

@AsyncApiService()
@WebSocketGateway({
  namespace: 'socket',
  cors: {
    origin: '*',
  },
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly socketService: SocketService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  @WebSocketServer()
  public server: Server;
  afterInit(server: Server) {
    new Logger('SocketGateway').log('Init');
  }
  async handleConnection(client: Socket, ...args: any[]) {
    try {
      const token = client.handshake.headers.authorization.split(' ')[1];
      const decoded: Partial<User> = await this.jwtService.verify(token, {
        secret: TOKENS.JWT_SECRET,
      });
      // set user's active status to true
      await this.userService.updateOnlineStatus(
        decoded.id,
        OnlineStatus.ONLINE,
      );

      // set user_id to socket data
      client.data.userId = decoded.id;

      // notify frontend that user is connected
      client.emit('socket-status', { connected: true });

      // join user to a room with his id
      client.join(decoded.id);
      setTimeout(() => {
        client.broadcast.in(decoded.id).emit('fuck', { id: decoded.id });
      }, 5000);
      new Logger('JwtWsMiddleware').log(`User connected: ${decoded.id}`);
    } catch (error) {
      throw new WsException('Invalid Token');
    }
  }
  async handleDisconnect(client: Socket) {
    try {
      if (client.data.userId) {
        client.join(client.data.userId);
        client.emit('socket-status', { connected: false });
        await this.userService.updateOnlineStatus(
          client.data.userId,
          OnlineStatus.OFFLINE,
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  @SubscribeMessage('createSocket')
  async create(@MessageBody() createSocketDto: any) {
    console.log(createSocketDto);
  }
}
