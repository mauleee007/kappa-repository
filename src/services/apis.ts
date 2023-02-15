import axios, { AxiosResponse } from 'axios';
import { API_KEY, BASE_URL, BASE_URLL } from './utils';

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

function getGallery(): Promise<AxiosResponse> {
  const url = `${BASE_URL}/hotels/gallery`;
  return axios.get(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
}

function getKappa(): Promise<AxiosResponse> {
  const url = `${BASE_URL}/hotels/instants`;
  return axios.get(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
}

function getHotelProfile(
  id?: number,
  detailId?: number,
): Promise<AxiosResponse> {
  let url = '';
  if (id === 1) {
    url = `${BASE_URL}/hotels/profile`;
  } else if (id === 2) {
    url = `${BASE_URL}/hotels/instants`;
  } else if (id === 3) {
    url = `${BASE_URL}/hotels/philosophy`;
  } else {
    url = `${BASE_URL}/hotels/instants/${detailId}`;
  }
  return axios.get(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
}

function getSpa(id?: number): Promise<AxiosResponse> {
  let url = '';
  if (id === 1) {
    url = `${BASE_URL}/hotels/spa`;
  } else if (id === 4) {
    url = `${BASE_URL}/hotels/spa_workshop`;
  }
  return axios.get(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
}
function getSpaFacilities(): Promise<AxiosResponse> {
  const url = `${BASE_URL}/hotels/spa_facilities`;
  return axios.get(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
}
function getWellnessTreatment(): Promise<AxiosResponse> {
  const url = `${BASE_URL}/hotels/spa_treatment`;
  return axios.get(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
}

const ApiServices = {
  getDanu,
  getRestaurant,
  getFoodCategories,
  getFoods,
  getHotelProfile,
  getKappa,
  getGallery,
  getSpa,
  getSpaFacilities,
  getWellnessTreatment,
};

export default ApiServices;
