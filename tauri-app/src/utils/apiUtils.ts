import axios from "axios";

const baseUrl = "http://127.0.0.1:3000";

export async function getData(url : string) {
    try {
        const resp = await axios.get(baseUrl + url);
        return resp.data;
    }
    catch(error){
        alert("요청 처리에 실패하였습니다.");
        console.error(error);
    }
}
export async function postData(url : string ,params:any) {
    try {
        const resp = await axios.post(baseUrl + url, params);
        console.log(baseUrl + url);
        return resp.data;
    }
    catch(error){
        alert("요청 처리에 실패하였습니다.다시 시도해주세요.");
        console.error(error);
    }
}