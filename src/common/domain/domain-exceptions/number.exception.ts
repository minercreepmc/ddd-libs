import { ValidationException } from './exception.base';

export class ArgumentContainsFloatException extends ValidationException {}

export class ArgumentContainsIntegerException extends ValidationException {}

export class ArgumentOutofBoundsException extends ValidationException {}

export class ArgumentContainsPositiveException extends ValidationException {}

export class ArgumentContainsNegativeException extends ValidationException {}

export class ArgumentContainsZeroException extends ValidationException {}
