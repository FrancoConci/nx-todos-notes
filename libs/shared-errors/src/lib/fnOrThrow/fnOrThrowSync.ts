export const fnOrThrowSync = <returnValue, error>(
  callback: () => returnValue,
  errorConstructor: new (err: any) => error
) => {
  try {
    return callback();
  } catch (err) {
    return new errorConstructor(err);
  }
};
