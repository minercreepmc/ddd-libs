import { ValidationException } from './exception.base';

export enum StringExceptionCodes {
  tooShort = 'STRING.EXCEPTION.TOO_SHORT',
  tooLong = 'STRING.EXCEPTION.TOO_LONG',
  containsInvalidCharacters = 'STRING.EXCEPTION.CONTAINS_INVALID_CHARACTERS',
  doesNotMeetRequirements = 'STRING.EXCEPTION.DOES_NOT_MEET_REQUIREMENTS',
  containsWhitespace = 'STRING.EXCEPTION.CONTAINS_WHITESPACE',
  containsEmptyString = 'STRING.EXCEPTION.CONTAINS_EMPTY_STRING',
  containsNumber = 'STRING.EXCEPTION.CONTAINS_NUMBER',
  containsSymbol = 'STRING.EXCEPTION.CONTAINS_SYMBOL',
  containsUppercase = 'STRING.EXCEPTION.CONTAINS_UPPERCASE',
  containsLowercase = 'STRING.EXCEPTION.CONTAINS_LOWERCASE',
  doesNotMatchRegex = 'STRING.EXCEPTION.DOES_NOT_MATCH_REGEX',
  doesNotIncludeInAllowedValues = 'STRING.EXCEPTION.DOES_NOT_INCLUDE_IN_ALLOWED_VALUES',
}

export class ArgumentTooShortException extends ValidationException {
  constructor() {
    super('Argument too short', StringExceptionCodes.tooShort);
  }
}

export class ArgumentTooLongException extends ValidationException {
  constructor() {
    super('Argument too long', StringExceptionCodes.tooLong);
  }
}

export class ArgumentContainsInvalidCharactersException extends ValidationException {
  constructor() {
    super(
      'Argument contains invalid characters',
      StringExceptionCodes.containsInvalidCharacters
    );
  }
}

export class ArgumentDoesNotMeetRequirementsException extends ValidationException {
  constructor() {
    super(
      'Argument does not meet requirements',
      StringExceptionCodes.doesNotMeetRequirements
    );
  }
}

export class ArgumentContainsWhitespaceException extends ValidationException {
  constructor() {
    super(
      'Argument contains whitespace',
      StringExceptionCodes.containsWhitespace
    );
  }
}

export class ArgumentContainsEmptyStringException extends ValidationException {
  constructor() {
    super(
      'Argument contains empty string',
      StringExceptionCodes.containsEmptyString
    );
  }
}

export class ArgumentContainsNumberException extends ValidationException {
  constructor() {
    super('Argument contains number', StringExceptionCodes.containsNumber);
  }
}

export class ArgumentContainsSymbolException extends ValidationException {
  constructor() {
    super('Argument contains symbol', StringExceptionCodes.containsSymbol);
  }
}

export class ArgumentContainsUppercaseException extends ValidationException {
  constructor() {
    super(
      'Argument contains uppercase',
      StringExceptionCodes.containsUppercase
    );
  }
}

export class ArgumentContainsLowercaseException extends ValidationException {
  constructor() {
    super(
      'Argument contains lowercase',
      StringExceptionCodes.containsLowercase
    );
  }
}

export class ArgumentDoesNotMatchRegexException extends ValidationException {
  constructor() {
    super(
      'Argument does not match regex',
      StringExceptionCodes.doesNotMatchRegex
    );
  }
}

export class ArgumentDoestNotIncludeInAllowedValues extends ValidationException {
  constructor() {
    super(
      'Argument does not include in allowed values',
      StringExceptionCodes.doesNotIncludeInAllowedValues
    );
  }
}
