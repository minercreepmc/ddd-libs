export type NumericValueObjectOptions = Partial<{
  maxValue: number;
  minValue: number;
  containsNegative: boolean;
  containsPositive: boolean;
  containsZero: boolean;
  containsInteger: boolean;
  containsFloat: boolean;
}>;

// ##METHOD##
export interface IsAllowPositiveOptions {
  containsPositive: boolean;
}

export interface IsAllowNegativeOptions {
  containsNegative: boolean;
}

export interface IsAllowedZeroOptions {
  containsZero: boolean;
}
