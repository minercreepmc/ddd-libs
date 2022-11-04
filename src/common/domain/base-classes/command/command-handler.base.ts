import { Command } from './command.base';

export abstract class CommandHandlerBase<
  ICommand extends Command,
  ResponseDTO
> {
  abstract execute(command: ICommand): Promise<ResponseDTO>;
}
