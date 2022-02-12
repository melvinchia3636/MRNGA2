import axios from 'axios';

export default async function scrapeData() {
  const response = await axios('https://open.er-api.com/v6/latest/USD');
  const { data } = response;
  return data;
}
