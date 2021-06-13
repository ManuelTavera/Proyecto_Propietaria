import parseBody from '../../helpers/parse-body';
import {
    post,
    get,
} from './api.service';

export function getComplainsRequest(){
    console.log('Desde el request')
    return get('api/complain/mostrar')
}