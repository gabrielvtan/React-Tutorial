// Here we will be using an axios feature called instances to set different base URLs
import axios from 'axios';

const instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
});

// then we can also attach the base URL to a specific Authorization
instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;