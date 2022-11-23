export interface IValueObject<PropsType> {
  equals(vo: IValueObject<PropsType>): boolean;
  unpack(): PropsType;
}
