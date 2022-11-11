import { CommandBus } from '@nestjs/cqrs';

export class CqrsController {
  protected readonly commandBus: CommandBus;
}
