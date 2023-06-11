import { Options, HandleApiData, Params, Endpoint, Status, Method } from '../../types/types';

class Loader {
    constructor(private baseLink: string, private options: Partial<Options>) {}

    public getResp<T>(
        { endpoint, options = {} }: Params,
        callback: HandleApiData<T> = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>(Method.Get, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === Status.Unauthorized || res.status === Status.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Partial<Options>, endpoint: Endpoint): string {
        const urlOptions: Partial<Options> = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: keyof Options): void => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(
        method: Method,
        endpoint: Endpoint,
        callback: HandleApiData<T>,
        options: Partial<Options> = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response): Promise<T> => res.json())
            .then((data: T): void => callback(data))
            .catch((err: Error): void => console.error(err));
    }
}

export default Loader;
