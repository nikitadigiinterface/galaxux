

import axios from 'axios';

export default function TokenGenerate(username, password) {
    const requestData = {
        Username: username,
        Password: password,
        ParameterType: 1,
        TokenValues: null,
        MemberID: 0,
        mRequestAPI: null,
        RequestID: 0,
        mMemberAPI: null
    };
    
    return axios.post('http://crnmobileapp.com/api/CRN/CRNRequestAPI', requestData)
        .then(response => {
            const responseMessage = JSON.parse(response.data).ResponseMessage;
            const isSuccess = JSON.parse(response.data).IsSuccess;

            return { isValid: isSuccess, generatedToken: responseMessage };

        })
        .catch(error => {
            console.error("Error generating token:", error);
            throw error;
        });
}

export function TokenValidate(username, password, token) {
    const requestData = {
        Username: username,
        Password: password,
        ParameterType: 2,
        TokenValues: token,
        MemberID: 0,
        mRequestAPI: null,
        RequestID: 0,
        mMemberAPI: null
    };
    
    return axios.post('http://crnmobileapp.com/api/CRN/CRNRequestAPI', requestData)
        .then(response => {

            const responseMessage = JSON.parse(response.data).ResponseMessage;
            const isSuccess = JSON.parse(response.data).IsSuccess;

            return isSuccess;
            return responseMessage;

        })
        .catch(error => {
            console.error("Error validating token:", error);
            throw error;
        });
}
