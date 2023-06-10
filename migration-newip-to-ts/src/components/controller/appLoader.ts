import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '6e8f582f14fd4b4995103ef9270575e1', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
