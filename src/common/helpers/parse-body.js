export default function parseBody(model, form, namespace = '') {
    let formData = form || new FormData();
    let formKey;

    for (let propertyName in model) {
        if (!model.hasOwnProperty(propertyName) || !model[propertyName]) continue;
        let formKey = namespace ? `${namespace}[${propertyName}]` : propertyName;
        if (model[propertyName] instanceof Date)
            formData.append(formKey, model[propertyName].toISOString());
        else if (model[propertyName] instanceof Array) {
            model[propertyName].forEach((element, index) => {
                const tempFormKey = `${formKey}[${index}]`;
                parseBody(element, formData, tempFormKey);
            });
        }
        else if (typeof model[propertyName] === 'object' && !(model[propertyName] instanceof File))
        parseBody(model[propertyName], formData, formKey);
        else
            formData.append(formKey, model[propertyName].toString());
    }
    return formData;
}