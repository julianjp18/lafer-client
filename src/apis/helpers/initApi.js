export default (id, src) => {
  const script = document.createElement('script');
  script.setAttribute('src', src);
  script.setAttribute('id', id);
  script.setAttribute('type', 'text/javascript');
  document.getElementsByTagName('script')[0].appendChild(script);
};
