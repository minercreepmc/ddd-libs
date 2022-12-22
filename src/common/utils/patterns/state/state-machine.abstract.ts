export interface IState {
  process(...args: any): void;
}

export interface IStateMachine<State> {
  changeState(newState: State): void;
}
