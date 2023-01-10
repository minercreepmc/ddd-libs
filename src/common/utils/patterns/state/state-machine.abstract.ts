import { AbstractAggregateRoot } from '@domain/aggregates';

export interface IState<T extends AbstractAggregateRoot<any>> {
  aggregate: T;
}

export interface IStateMachine<T extends IState<any>> {
  state: any;
  changeState(newState: T): void;
}
