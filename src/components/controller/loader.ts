
import { DrawData } from "../view/appView";
import { apiConfig } from "./appLoader";

interface Options {
    sources?: string;
}

interface IResponse {
    endpoint?: string;
    options?: Options;
}


type ApiOptions = {
    apiKey: string
}

export type CallbackType = (data: DrawData) => void;

class Loader {
    baseLink: apiConfig;
    options: ApiOptions;
    constructor(baseLink: apiConfig, options: ApiOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }
    getResp(
        { endpoint, options = {} }: IResponse,
        callback: CallbackType
    ): void {
        const fallback = () => {
            console.error('No callback for GET response');
        }
        const newCallback = callback || fallback;
        this.load('GET', endpoint, newCallback, options);
    }

    errorHandler(res: Response) {
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

    load(method: string, endpoint: string, callback: CallbackType, options: Options) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: DrawData) => {console.log(data);return callback(data)})
            .catch((err: string) => console.error(err));
    }
}

export default Loader;
