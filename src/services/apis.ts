import axios, { AxiosResponse } from 'axios';
import { API_KEY, BASE_URL } from './utils';

function getDanu(hotelsId?: number, facility?: number): Promise<AxiosResponse> {
  const url = `${BASE_URL}/hotels/${hotelsId}/rooms/${facility}/facilities`;
  return axios.get(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
}

function getRestaurant(hotelsId?: number): Promise<AxiosResponse> {
  const url = `${BASE_URL}/hotels/${hotelsId}/restaurants`;
  return axios.get(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
}

function getFoodCategories(
  hotelsId?: number,
  categoryId?: number,
): Promise<AxiosResponse> {
  const url = `${BASE_URL}/hotels/${hotelsId}/restaurants/${categoryId}/food_categories`;
  return axios.get(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
}

function getFoods(
  hotelsId?: number,
  categoryId?: number,
): Promise<AxiosResponse> {
  const url = `${BASE_URL}/hotels/${hotelsId}/restaurants/${categoryId}/foods`;
  return axios.get(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
}

const ApiServices = {
  getDanu,
  getRestaurant,
  getFoodCategories,
  getFoods,
};

export default ApiServices;
