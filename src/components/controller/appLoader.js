import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '24ac565ecd4340ea945f1300c2b9e5e9', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
