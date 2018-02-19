import { environment } from '../environments/environment'; 
//const isDev = process.env.NODE_ENV === 'development';
//const isLocal = process.env.SERVER_LOCATION === 'local'; // set via .env file
//const apiEndpoints = {
//    dev: '/api',
//    prodLocal: 'http://localhost:8000',
//    prodOnline: 'http://localhost:8000'
//};

//const prodEndpoint = isLocal ? apiEndpoints.prodLocal : apiEndpoints.prodOnline;

export const config = {
    //api: isDev ? apiEndpoints.dev : prodEndpoint
    api:environment.api
};