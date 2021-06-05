import parseBody from '../../helpers/parse-body';
import {
    post,
    get,
} from './api.service';

export function authUserRequest(data) {
    const value = JSON.parse(JSON.stringify(data));

    return post('api/login', value);
}

export function createUserRequest(data) {
    const value = JSON.parse(JSON.stringify(data));

    return post('api/person/insertar', value);
}