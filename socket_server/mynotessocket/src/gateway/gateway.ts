import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

class Message {
  name: string;
  text: string;
}

class Create_Message_DTO extends Message {}

@WebSocketGateway(
  //3009,
  {
    cors: {
      origin: ['http://localhost:3000', 'https://localhost:3000'], //['*'] yaparsak, bütün originlere izin verir
    },
  },
)
export class MyGateway implements OnModuleInit {
  messages: Array<Message> = [{ name: 'Ali', text: 'Hello there' }];
  client_to_user = {};

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected MyGateway!');
    });
  }

  @SubscribeMessage('create_new_message_from_client')
  async create_new_message(
    @MessageBody() request_body: Create_Message_DTO,
    @ConnectedSocket() client: Socket,
  ): Promise<Message> {
    // console.log('BODY', request_body);
    // this.server.emit('on_message1', {
    //   message: 'New_Message',
    //   content: `${request_body.test1} ${new Date().toLocaleString()}`,
    // });
    const new_message = {
      name: this.client_to_user[client.id],
      text: request_body.text,
    };
    this.messages.push(new_message);
    this.server.emit('new_message_from_socket_server', new_message);
    return new_message;
  }

  @SubscribeMessage('get_all_messages_from_socket_server')
  async get_all_messages(): Promise<Array<Message>> {
    return this.messages;
  }

  @SubscribeMessage('join_room_from_client')
  async join_room(
    @MessageBody('username') username: string,
    @ConnectedSocket() client: Socket,
  ) {
    const current_client_id = client.id;
    this.client_to_user[current_client_id] = username;
    return Object.values(this.client_to_user);
  }

  @SubscribeMessage('user_typing_from_client')
  async someone_typing(
    @MessageBody('is_typing') is_typing: boolean,
    @ConnectedSocket() client: Socket,
  ) {
    const current_client_name = this.get_client_name(client.id);
    client.broadcast.emit('user_typing_from_server', {
      current_client_name,
      is_typing,
    }); //Yani kendim[mevcut client] haricindeki hepsinde bu eventi emit eder
  }

  private get_client_name(client_id: string) {
    return this.client_to_user[client_id];
  }
}
