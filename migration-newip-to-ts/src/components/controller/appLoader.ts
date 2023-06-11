import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://news-proxy.spanb4.shop/', {
            apiKey: 'b77f31a98069421ca069c84ddd8af020', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
