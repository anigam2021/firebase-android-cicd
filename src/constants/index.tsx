import { vw, vh } from './dimension';
import screens from './screens';
import colors from './colors';
import fonts from './fonts';
import images from './images';
import appConstants from "./app-constants";
import types from './types';
import endpoints from './end-point';
import apiConstants from './api-constants';
import { POST, PUT, GET, DELETE } from './service-axios';
import firebase from './firebase';

const activeOpacity = 0.8

export {
    vw,
    vh,
    POST,
    PUT,
    DELETE,
    GET,

    screens,
    colors,
    fonts,
    images,
    appConstants,
    types,
    endpoints,
    apiConstants,
    activeOpacity,
    firebase
}
