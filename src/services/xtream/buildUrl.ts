export interface Parameters {
  [key: string]: string;
}

function parseTVUrl(url: string) {
  const chunks = url.split('://');
  const protocol = chunks[0];

  const parts = chunks[1].split('/');
  const host = parts[0];

  const xtreamUrl = protocol + '://' + host;

  const params = parts[1].split('?')[1].split('&');

  let username = '';
  let password = '';
  params.forEach(param => {
    const key = param.split('=')[0];
    const value = param.split('=')[1];

    if (key === 'username') {
      username = value;
    }

    if (key === 'password') {
      password = value;
    }
  });

  return { username, password, url: xtreamUrl };
}

function buildUrl(url: string, parameters: Parameters) {
  let qs = '';

  for (const key in parameters) {
    const value = parameters[key];
    qs += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
  }
  if (qs.length > 0) {
    qs = qs.substring(0, qs.length - 1); //chop off last "&"
    url = url + '?' + qs;
  }
  return url;
}

function buildLiveUrl(tvUrl: string, streamId: string | number) {
  const xtream = parseTVUrl(tvUrl);
  return `${xtream.url}/live/${xtream.username}/${xtream.password}/${streamId}.ts`;
}

export { buildLiveUrl, parseTVUrl };
export default buildUrl;
