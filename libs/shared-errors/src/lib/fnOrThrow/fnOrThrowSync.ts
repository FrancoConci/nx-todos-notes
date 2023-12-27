export const fnOrThrowSync = <returnValue, error>(
  callback: () => returnValue,
  errorConstructor: new () => error
) => {
  try {
    console.log('callback()', callback());
    return callback();
  } catch (err) {
    return new errorConstructor();
  }
};
