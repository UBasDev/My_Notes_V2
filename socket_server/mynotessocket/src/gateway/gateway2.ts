import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(
  //3009,
  {
    cors: {
      origin: ['http://localhost:3000', 'https://localhost:3000'], //['*'] yaparsak, bütün originlere izin verir
    },
  },
)
export class MyGateway2 implements OnModuleInit {
  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected MyGateway2!');
    });
  }
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('room_from_client')
  async room_from_client(
    @MessageBody() request_body: { room: string },
  ): Promise<void> {
    this.server.socketsJoin(request_body.room); //Burada gelen `room` valuesine özel bir adet room oluşturacaktır
  }

  @SubscribeMessage('message_from_client')
  async message_from_client(
    @MessageBody()
    request_body: {
      username: string;
      message: string;
      room: string;
      date: string;
    },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    client
      .to(request_body.room)
      .emit('message_return_from_server', request_body);
    console.log(request_body.message);
  }
}
