import { Options, Callback, Params, Endpoint, Status } from "../../types/types";

class Loader {
    constructor(
      private baseLink: string,
      private options: Partial<Options>) {
    }

    public getResp<T>(
        { endpoint, options = {} }: Params,
        callback: Callback<T> = () => {
          console.log()
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
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

    private load<T>(method: string, endpoint: Endpoint, callback: Callback<T>, options: Partial<Options> = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: T) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
