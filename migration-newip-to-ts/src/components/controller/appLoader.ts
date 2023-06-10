import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'b77f31a98069421ca069c84ddd8af020', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
