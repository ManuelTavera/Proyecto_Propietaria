export default function(obj1, obj2){
    let newObject = Object.seal(Object.assign({}, obj1))
    return Object.assign(newObject, obj2)
}