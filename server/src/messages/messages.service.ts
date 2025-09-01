import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class MessagesService {
  private clientToUser: Record<string, string> = {};

  constructor(private readonly databaseService: DatabaseService) {}

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;
    return Object.values(this.clientToUser);
  }

  getClientByName(clientId: string): string {
    return this.clientToUser[clientId] || 'Anonymous';
  }

  async create(
    createMessageDto: CreateMessageDto,
    clientId: string,
  ): Promise<Message> {
    const name = this.getClientByName(clientId);

    const message = await this.databaseService.message.create({
      data: {
        name,
        text: createMessageDto.text,
      },
    });

    return message;
  }

  async findAll(): Promise<Message[]> {
    return await this.databaseService.message.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
