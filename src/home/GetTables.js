import {API} from "../config";

const getData =()=> {
    // console.log(API.baseUri+API.getallTables)
    fetch(API.baseUri+API.getallTables)
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } else console.log("Get data error ");
        }).then((json) =>{
        console.log(json)
        return json;
    }).catch((error) => {
        console.log('error on .catch', error);
    });
}

export { getData };
