import {
    post,
    get,
    del,
    put,
} from './api.service';

export function answerClaimComplaintRequest(data){
    const value = JSON.parse(JSON.stringify(data))

    return post('api/answer/insertar', value)
}