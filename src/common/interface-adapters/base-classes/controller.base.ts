import { CommandBus } from '@nestjs/cqrs';

export abstract class BaseController {
  constructor(protected readonly commandBus: CommandBus) {}
}
