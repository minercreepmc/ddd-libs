export const spreadObject = <
  ObjectToSpread,
  Target extends keyof ObjectToSpread
>(
  objectToSpread: ObjectToSpread,
  target: Pick<ObjectToSpread, Target>
): ObjectToSpread => Object.assign({}, objectToSpread, target);
