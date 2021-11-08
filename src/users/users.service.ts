import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientKafka } from '@nestjs/microservices';
import { UserIdRequestParamsDto } from './dto/user-id-request-params.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('HERO_SERVICE') private client: ClientKafka) {
  }

  async onModuleInit() {
    ['findAllUsers','findOneUsers','createUsers'].forEach((key) => this.client.subscribeToResponseOf(`${key}`));
    await this.client.connect();
  }

  async create(createUserDto: CreateUserDto) {
    return this.client.send('createUsers', createUserDto);
  }

  async findAll() {
    return this.client.send('findAllUsers', {});
  }

  async findOne(id: string) {
    return this.client.send('findOneUsers', {id : id});
  }

  async update(id: string, updateUsers: UpdateUserDto) {
    updateUsers.id = id;
    return this.client.emit('findOneUsers', updateUsers);
  }

  async remove(id: string) {
    return this.client.emit('removeUsers', {id: id});
  }
}
