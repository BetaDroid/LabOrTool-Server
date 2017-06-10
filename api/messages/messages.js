/**
 * Created by Daniel on 10/06/2017.
 */

exports.inputError =  {
    Error: true,
    StatusCode: 400,
    Message: 'Wrong syntax! Please correct the input and make a new request.'
};

exports.inputAccepted =  {
    Error: false,
    StatusCode: 202,
    Message: 'Input accepted! The request will be processed soon.'
};
