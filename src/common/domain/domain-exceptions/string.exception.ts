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
  readonly name = ArgumentTooShortException.name;
  code = StringExceptionCodes.tooShort;
  message = 'Argument too short';
}

export class ArgumentTooLongException extends ValidationExceptionBase {
  readonly name = ArgumentTooLongException.name;
  code = StringExceptionCodes.tooLong;
  message = 'Argument too long';
}

export class ArgumentContainsInvalidCharactersException extends ValidationExceptionBase {
  readonly name = ArgumentContainsInvalidCharactersException.name;
  code = StringExceptionCodes.containsInvalidCharacters;
  message = 'Argument contains invalid characters';
}

export class ArgumentDoesNotMeetRequirementsException extends ValidationExceptionBase {
  readonly name = ArgumentDoesNotMeetRequirementsException.name;
  code = StringExceptionCodes.doesNotMeetRequirements;
  message = 'Argument does not meet requirements';
}

export class ArgumentContainsWhitespaceException extends ValidationExceptionBase {
  readonly name = ArgumentContainsWhitespaceException.name;
  code = StringExceptionCodes.containsWhitespace;
  message = 'Argument contains whitespace';
}

export class ArgumentContainsEmptyStringException extends ValidationExceptionBase {
  readonly name = ArgumentContainsEmptyStringException.name;
  code = StringExceptionCodes.containsEmptyString;
  message = 'Argument contains empty string';
}

export class ArgumentContainsNumberException extends ValidationExceptionBase {
  readonly name = ArgumentContainsNumberException.name;
  code = StringExceptionCodes.containsNumber;
  message = 'Argument contains number';
}

export class ArgumentContainsSymbolException extends ValidationExceptionBase {
  readonly name = ArgumentContainsSymbolException.name;
  code = StringExceptionCodes.containsSymbol;
  message = 'Argument contains symbol';
}

export class ArgumentContainsUppercaseException extends ValidationExceptionBase {
  readonly name = ArgumentContainsUppercaseException.name;
  code = StringExceptionCodes.containsUppercase;
  message = 'Argument contains uppercase';
}

export class ArgumentContainsLowercaseException extends ValidationExceptionBase {
  readonly name = ArgumentContainsLowercaseException.name;
  code = StringExceptionCodes.containsLowercase;
  message = 'Argument contains lowercase';
}

export class ArgumentDoesNotMatchRegexException extends ValidationExceptionBase {
  readonly name = ArgumentDoesNotMatchRegexException.name;
  code = StringExceptionCodes.doesNotMatchRegex;
  message = 'Argument does not match regex';
}

export class ArgumentDoestNotIncludeInAllowedValues extends ValidationExceptionBase {
  readonly name = ArgumentDoestNotIncludeInAllowedValues.name;
  code = StringExceptionCodes.doesNotIncludeInAllowedValues;
  message = 'Argument does not include in allowed values';
}
