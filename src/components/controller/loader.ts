import { DrawData } from '../view/appView';
import { apiConfig } from './appLoader';

interface Options {
    readonly sources?: string;
}

interface IResponse {
    readonly endpoint?: string;
    readonly options?: Options;
}

type ApiOptions = {
    readonly apiKey: string;
};

type urlOptionsKeys = 'sources' | 'apiKey';

export type CallbackType = (data: DrawData) => void;

class Loader {
    readonly baseLink: apiConfig;
    readonly options: ApiOptions;
    constructor(baseLink: apiConfig, options: ApiOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }
    public getResp({ endpoint, options = {} }: IResponse, callback: CallbackType): void {
        const fallback = () => {
            console.error('No callback for GET response');
        };
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

    private makeUrl(options: Options, endpoint?: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        const keysArr = Object.keys(urlOptions) as urlOptionsKeys[];

        keysArr.forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    public load(method: string, endpoint: string | undefined, callback: CallbackType, options: Options) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: DrawData) => {
                return callback(data);
            })
            .catch((err: string) => console.error(err));
    }
}

export default Loader;
