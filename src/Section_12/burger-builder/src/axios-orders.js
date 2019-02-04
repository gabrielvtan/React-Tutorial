import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-a39e5.firebaseio.com/'
})

export default instance; 