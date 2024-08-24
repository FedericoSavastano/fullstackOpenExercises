import axios from 'axios';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/';

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`);
    return request.then((response) => response.data);
};

const getCountry = () => {
    const request = axios.get(`${baseUrl}/${name}`);
    return request.then((response) => response.data);
};

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then((response) => response.data);
};

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then((response) => response.data);
};

const deleteItem = (id, newObject) => {
    const request = axios.delete(`${baseUrl}/${id}`, newObject);
    return request.then((response) => response.data);
};

export default {
    getAll,
    getCountry,
    create,
    update,
    deleteItem,
};
