export function getRequestOptions(body)
{
    return {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: body
    }
};

export function getFormBody(dto){

    let formBody = [];
    for (let property in dto) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(dto[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return formBody;
}

