import axios from 'axios';

const instance = axios.create({
    baseURL: '/api'
});

class ApiService {
    cache = {};

    getCached(key, callback){
        if(this.cache.hasOwnProperty(key)) return this.cache[key];
        return this.cache[key] = callback();
    }

    get(url) {
        return new Promise((resolve, reject) => {
            instance.get(url)
                .then(response => {
                    resolve(response.data);
                }).catch(err => {
                    console.error(err);
                    reject(err.response.data);
                });
        });
    }

    post(url, params, config = {}) {
        return new Promise((resolve, reject) => {
            instance.post(url, params, config)
                .then(response => {
                    resolve(response.data);
                }).catch(err => {
                    console.error(err);
                    reject(err.response.data);
                });
        });
    }

    getTest(){
        const uri = '/test';
        return this.getCached(uri, () => {
            return this.get('/test');
        })
    }

    registerUser(data){
        const uri = '/user/register';
        return this.post(uri, data);
    }
}

export default new ApiService();
