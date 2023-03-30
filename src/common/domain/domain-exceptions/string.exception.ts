import { ValidationExceptionBase } from './exception.base';

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

export class ArgumentTooShortException extends ValidationExceptionBase {
  readonly code = StringExceptionCodes.tooShort;
  readonly message = 'Argument too short';
}

export class ArgumentTooLongException extends ValidationExceptionBase {
  readonly code = StringExceptionCodes.tooLong;
  readonly message = 'Argument too long';
}

export class ArgumentContainsInvalidCharactersException extends ValidationExceptionBase {
  readonly code = StringExceptionCodes.containsInvalidCharacters;
  readonly message = 'Argument contains invalid characters';
}

export class ArgumentDoesNotMeetRequirementsException extends ValidationExceptionBase {
  readonly code = StringExceptionCodes.doesNotMeetRequirements;
  readonly message = 'Argument does not meet requirements';
}

export class ArgumentContainsWhitespaceException extends ValidationExceptionBase {
  readonly code = StringExceptionCodes.containsWhitespace;
  readonly message = 'Argument contains whitespace';
}

export class ArgumentContainsEmptyStringException extends ValidationExceptionBase {
  readonly code = StringExceptionCodes.containsEmptyString;
  readonly message = 'Argument contains empty string';
}

export class ArgumentContainsNumberException extends ValidationExceptionBase {
  readonly code = StringExceptionCodes.containsNumber;
  readonly message = 'Argument contains number';
}

export class ArgumentContainsSymbolException extends ValidationExceptionBase {
  readonly code = StringExceptionCodes.containsSymbol;
  readonly message = 'Argument contains symbol';
}

export class ArgumentContainsUppercaseException extends ValidationExceptionBase {
  readonly code = StringExceptionCodes.containsUppercase;
  readonly message = 'Argument contains uppercase';
}

export class ArgumentContainsLowercaseException extends ValidationExceptionBase {
  readonly code = StringExceptionCodes.containsLowercase;
  readonly message = 'Argument contains lowercase';
}

export class ArgumentDoesNotMatchRegexException extends ValidationExceptionBase {
  readonly code = StringExceptionCodes.doesNotMatchRegex;
  readonly message = 'Argument does not match regex';
}

export class ArgumentDoestNotIncludeInAllowedValues extends ValidationExceptionBase {
  readonly code = StringExceptionCodes.doesNotIncludeInAllowedValues;
  readonly message = 'Argument does not include in allowed values';
}
