import parseBody from '../../helpers/parse-body';
import {
    post,
    get,
} from './api.service';

export function authUserRequest(data) {
    const formData = new FormData();
    console.log('Hola');
    parseBody(data, formData);

    return post('api/login', formData);
}