import Local from './local';
import Prod from './prod';



let config = {};

switch (true) {
    case window.location.host.indexOf('localhost') !== -1:
        config = Local;
        break;

    default:
        config = Prod;
        break;
}

export default config;