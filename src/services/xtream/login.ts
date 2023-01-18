import buildUrl from './buildUrl';

async function Login(url: string, username: string, password: string) {
  try {
    const response = await fetch(
      buildUrl(url + '/player_api.php', { username, password }),
      {
        method: 'GET',
      },
    );
    if (!response.ok) {
      throw new Error(`Response status ${response.status}`);
    }
    const contentType = response.headers.get('content-type');
    if (!contentType || contentType.indexOf('application/json') === -1) {
      throw new Error('Response is not json');
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error);
  }
}

export default Login;
