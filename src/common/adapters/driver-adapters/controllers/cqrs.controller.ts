export interface ICommandBus<ICommand> {
  execute(command: ICommand): Promise<any>;
}

export abstract class CqrsController<ICommand> {
  protected abstract readonly commandBus: ICommandBus<ICommand>;
}
