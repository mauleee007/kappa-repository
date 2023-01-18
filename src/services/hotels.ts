import axios, { AxiosResponse } from 'axios';
import { API_KEY, BASE_URL, BASE_URL2 } from './utils';

function getHotelInfo(): Promise<AxiosResponse> {
  const url = `${BASE_URL}/hotels`;
  return axios.get(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
}

function getHotelProfile(): Promise<AxiosResponse> {
  const url = `${BASE_URL}/hotels/profile`;
  return axios.get(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
}

function getRooms(hotelsId?: number): Promise<AxiosResponse> {
  const url = `${BASE_URL}/hotels/${hotelsId}/rooms`;
  return axios.get(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
}

function getFacilities(): Promise<AxiosResponse> {
  const url = `${BASE_URL}/hotels//facilities`;
  return axios.get(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
}

function getFoodCategories(): Promise<AxiosResponse> {
  const url = `${BASE_URL}/hotels/food_categories`;
  return axios.get(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
}

function getFoods(): Promise<AxiosResponse> {
  const url = `${BASE_URL}/hotels/foods`;
  return axios.get(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
}

function getTvUrl(): Promise<AxiosResponse> {
  const url = `${BASE_URL}/hotels/tv/url`;
  return axios.get(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
}

function getInfo(no: string): Promise<AxiosResponse> {
  const url = `${BASE_URL}/hotels/infos/room/${no}`;
  return axios.get(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
}

function getPromos(): Promise<AxiosResponse> {
  const url = `${BASE_URL}/hotels/promos`;
  return axios.get(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
}

function getPolicies(): Promise<AxiosResponse> {
  const url = `${BASE_URL}/hotels/policies`;
  return axios.get(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
}

function getEvents(): Promise<AxiosResponse> {
  const url = `${BASE_URL}/hotels/events`;
  return axios.get(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
}

function getArounds(): Promise<AxiosResponse> {
  const url = `${BASE_URL}/hotels/arounds`;
  return axios.get(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
}

const HotelService = {
  getArounds,
  getHotelInfo,
  getHotelProfile,
  getRooms,
  getFacilities,
  getFoods,
  getFoodCategories,
  getTvUrl,
  getInfo,
  getPromos,
  getPolicies,
  getEvents,
};

export default HotelService;
