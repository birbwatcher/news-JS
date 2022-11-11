import Loader from './loader';

enum apiConfig {
    apiKey = '24ac565ecd4340ea945f1300c2b9e5e9',
    url = 'https://newsapi.org/v2/',
}

class AppLoader extends Loader {
    constructor() {
        super(apiConfig.url, {
            apiKey: apiConfig.apiKey, // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
