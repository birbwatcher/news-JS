
import { apiConfig } from "./appLoader";

interface Options {
    sources?: string;
}

interface Response {
    endpoint?: string;
    options?: Options;
}

interface ApiOptions {
    apiKey: string
}

class Loader {
    baseLink: apiConfig;
    options: ApiOptions;
    constructor(baseLink: apiConfig, options: ApiOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }
    getResp(
        { endpoint, options = {} }: Response,
        callback = () => {
            console.error('No callback for GET response');
        }
    ): void {
        
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Options, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: (data: string) => void, options: Options) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
