import { ajax } from 'rxjs/observable/dom/ajax';
import { API_URL } from '../../constants/api.constant';

export function post(url, body, auth = false){
    return ajax.post(
        `${API_URL}/${url}`,
        body,
        { 'Content-Type': 'application/json' }
    );
}

export function del(url, body, auth = false) {
    return ajax.delete(
        `${API_URL}/${url}`
    );
}

export function get(url, body, auth = false){
    return ajax.get(
        `${API_URL}/${url}`
    );
}

export function put(url, body){
    return ajax.put(
        `${API_URL}/${url}`,
        body,
        { 'Content-Type': 'application/json' }
    );
}