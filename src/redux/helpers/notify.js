const noFormatter = (args) => args;

export default ({
  type,
  formatter = noFormatter,
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
