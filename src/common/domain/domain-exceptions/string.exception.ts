import { ValidationException } from './exception.base';

export class ArgumentTooShortException extends ValidationException {}

export class ArgumentTooLongException extends ValidationException {}

export class ArgumentContainsInvalidCharactersException extends ValidationException {}

export class ArgumentDoesNotMeetRequirementsException extends ValidationException {}

export class ArgumentContainsWhitespaceException extends ValidationException {}

export class ArgumentContainsEmptyStringException extends ValidationException {}

export class ArgumentContainsNumberException extends ValidationException {}

export class ArgumentContainsSymbolException extends ValidationException {}

export class ArgumentContainsUppercaseException extends ValidationException {}

export class ArgumentContainsLowercaseException extends ValidationException {}
