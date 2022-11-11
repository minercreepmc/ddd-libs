import { CommandBus } from '@nestjs/cqrs';

export abstract class CqrsController {
  protected abstract readonly commandBus: CommandBus;
}
