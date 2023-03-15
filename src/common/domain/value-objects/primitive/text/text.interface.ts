export interface TextValueObjectOptions {
  minLength?: number;
  maxLength?: number;
  allowSymbols?: boolean;
  allowWhitespace?: boolean;
  allowUppercase?: boolean;
  allowLowercase?: boolean;
  allowNumber?: boolean;
  allowEmpty?: boolean;
}

// METHODS
export interface IsAllowLengthOptions {
  minLength: number;
  maxLength: number;
}

export interface IsLowerEqualThanMaxLengthOptions {
  maxLength: number;
}

export interface IsHigherEqualThanMinLengthOptions {
  minLength: number;
}

export interface IsAllowedToBeEmptyOptions {
  allowEmpty: boolean;
}

export interface IsAllowedToContainsUppercaseOptions {
  allowUppercase: boolean;
}

export interface IsAllowedToContainsLowercaseOptions {
  allowLowercase: boolean;
}

export interface IsAllowedToContainsNumbersOptions {
  allowNumber: boolean;
}

export interface IsAllowedToContainsSymbolsOptions {
  allowSymbols: boolean;
}

export interface IsAllowdToContainsWhitespaceOptions {
  allowWhitespace: boolean;
}
