import Client from '../helpers/client'

const url = import.meta.env.REACT_APP_TRUHACK_API || 'http://localhost:3002';
const truhackAPI = new Client(url);

export default truhackAPI;