import buildUrl from './buildUrl';

export interface Channel {
  num: number;
  name: string;
  stream_type: string;
  stream_id: number;
  stream_icon: string;
  epg_channel_id: string;
  added: string;
  category_id: string;
  custom_sid: string;
  tv_archive: number;
  direct_source: string;
  tv_archive_duration: number;
}

async function getChannels(
  url: string,
  username: string,
  password: string,
  category_id: string,
) {
  try {
    const response = await fetch(
      buildUrl(url + '/player_api.php', {
        username,
        password,
        action: 'get_live_streams',
        category_id,
      }),
      { method: 'GET' },
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

export default getChannels;
