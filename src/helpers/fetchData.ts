import { API_HEADERS } from "../constants/apiEndpoints";

export const fetchData = async (apiUrl: string, apiMethod: string, reqBody: unknown) => {
    const apiResponse = await fetch(apiUrl, {
        method: apiMethod,
        body: reqBody ? JSON.stringify(reqBody) : undefined,
        headers: API_HEADERS,
    });

    if (apiResponse?.ok && apiResponse?.status === 200) {
        const finalRes = await apiResponse.json();
        console.log('finalRes---->', finalRes)
        return finalRes;
    }
    else {
        alert('Error-------->' + apiResponse.status);
    }
}