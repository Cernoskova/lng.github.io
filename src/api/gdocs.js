import axios from 'axios';

export default class GdocsAPI {
  getGdocsAPI = () => {
    const path = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQWQGbChO2Zf6Kznbrb7mHMG-rOawV1gJ1OJBDz6xmbGlQO0EZj0hQM6CGxhEDWK7mrRP1eBTP3LiEW/pub?gid=0&single=true&output=csv';
    return axios.create({
      baseURL: path,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }
}
