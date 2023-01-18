import axios from 'axios';
import parser from 'iptv-playlist-parser';

export async function getChannelHls(url: string) {
  const res = await axios.get(url);
  const result = parser.parse(res.data);

  return result.items;
}
