import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'a25812e6abf64d4a9094088a982d5c30', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
