const notFormatter = (args) => args;

export default ({
  type,
  formatter = notFormatter,
  callback = null,
  loader = true,
  ...args
}) => ({
  type,
  notifier: true,
  loader,
  callback,
  ...formatter({ ...args }),
});
