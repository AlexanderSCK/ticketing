import axios from 'axios';

export default ({ req }) => {
    // We are on the server

    return axios.create({
      baseURL:
        'http://www.ticketing-app-prod.lol/',
      headers: req.headers,
    });
 
};
