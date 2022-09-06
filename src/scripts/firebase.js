
import { collection, getDocs } from "firebase/firestore";

async function getData(fireBaseDb = undefined, dbCollection = undefined){   
    
    if(fireBaseDb === undefined){
        return "function getData fault: parameter 1 fireBaseDb undefined."
    }
    else if(dbCollection === undefined){
        return "function getData fault: parameter 2 dbCollection undefined."
    }
    else{
        const response = await getDocs(collection(fireBaseDb, dbCollection));
        return response;
    }
// end getData
}

export default {
    getData
}