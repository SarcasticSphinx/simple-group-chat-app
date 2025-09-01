import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  private messages: Message[] = [{ name: 'Toha', text: 'Hey there!' }];
  private clientToUser: Record<string, string> = {};

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;
    return Object.values(this.clientToUser);
  }

  getClientByName(clientId: string): string {
    return this.clientToUser[clientId] || 'Anonymous';
  }

  create(createMessageDto: CreateMessageDto, clientId: string) {
    const name = this.getClientByName(clientId);
    const message = { ...createMessageDto, name };
    this.messages.push(message);
    return message;
  }

  findAll() {
    return this.messages;
  }
}
