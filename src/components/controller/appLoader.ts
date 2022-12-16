import Loader from './loader';

enum apiConfig {
    apiKey = '24ac565ecd4340ea945f1300c2b9e5e9',
    url = 'https://newsapi.org/v2/',
}

interface apiConfigInfo {
    apiKey: string;
    url: string;
}

class AppLoader extends Loader {
    constructor() {
        super(apiConfig, {
            apiKey: apiConfig.apiKey,
        });
    }
}

export default AppLoader;
export { apiConfig, apiConfigInfo };
