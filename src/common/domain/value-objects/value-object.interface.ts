export interface IValueObject<Details> {
  equals(vo: IValueObject<Details>): boolean;
  unpack(): Details;
}
