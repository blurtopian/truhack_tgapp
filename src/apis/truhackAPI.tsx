import Client from '../helpers/client'

const url = import.meta.env.VITE_TRUHACK_API || 'https://truhackapi.blurtopian.com';
const truhackAPI = new Client(url);

export default truhackAPI;