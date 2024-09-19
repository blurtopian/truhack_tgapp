import Client from '../helpers/client'

const url = import.meta.env.REACT_APP_TRUHACK_API || 'https://blurtopian.com/truhack_tgapp';
const truhackAPI = new Client(url);

export default truhackAPI;