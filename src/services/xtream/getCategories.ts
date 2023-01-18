import buildUrl from './buildUrl';

export interface Category {
  category_id: string;
  category_name: string;
  parent_id: number;
}

async function getCategories(
  url: string,
  username: string,
  password: string,
): Promise<Category[]> {
  const action = 'get_live_categories';

  try {
    const response = await fetch(
      buildUrl(url + '/player_api.php', { username, password, action }),
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

export default getCategories;
