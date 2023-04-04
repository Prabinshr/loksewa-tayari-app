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
  namespace: 'no-auth',
  cors: {
    origin: '*',
  },
})
export class NoAuthGateway
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
    server.serverSideEmit('hello', 'Hello from the server');
  }
  async handleConnection(client: Socket) {
    // notify frontend that user is connected
    client.emit('socket-status', { connected: true });
  }
  async handleDisconnect(client: Socket) {}

  @SubscribeMessage('no-auth-check-username')
  @AsyncApiPub({
    channel: 'no-auth-check-username',
    summary: 'Check of username is available',
    description:
      'Check if username is available. Please listen on "can-use-username"',
    message: {
      name: 'no-auth-check-username',
      payload: {
        type: CheckUsername,
      },
    },
  })
  async checkUsername(
    @ConnectedSocket() client: Socket,
    @MessageBody() input: CheckUsername,
  ) {
    // check if the username is at least 3 characters long
    if (input.username.length < 3) {
      // if not, send a false response to the client
      client.emit('can-use-username', false);
    }
    // check if there is already a user with this username
    const user = await this.userService.findByUsername(input.username);
    // if there is, send a false response to the client
    // if not, send a true response to the client
    client.emit('can-use-username', !user);
  }

  @SubscribeMessage('no-auth-check-email')
  @AsyncApiPub({
    channel: 'no-auth-check-email',
    summary: 'Check of email is available',
    description:
      'Check if email is available. Please listen on "can-use-email"',
    message: {
      name: 'no-auth-check-email',
      payload: {
        type: CheckEmail,
      },
    },
  })
  async checkEmail(
    @ConnectedSocket() client: Socket,
    @MessageBody() input: CheckEmail,
  ) {
    // check if there is already a user with this email
    const user = await this.userService.findByEmail(input.email);
    // if there is, send a false response to the client
    // if not, send a true response to the client
    client.emit('can-use-email', !user);
  }
}
