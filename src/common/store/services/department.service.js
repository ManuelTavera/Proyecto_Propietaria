import parseBody from '../../helpers/parse-body';
import {
    post,
    get,
    del,
} from './api.service';

export function getDepartmentsRequest(){
    return get('api/departments/mostrar');
} 