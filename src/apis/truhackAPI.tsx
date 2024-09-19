import Client from '../helpers/client'

const url = import.meta.env.VITE_TRUHACK_API || 'https://truhack-api-c3b4ef73d73b.herokuapp.com';
const truhackAPI = new Client(url);

export default truhackAPI;