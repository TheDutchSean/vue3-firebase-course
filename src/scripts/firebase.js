
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
  
        const data = []

        for(let index in response.docs){
            data[index] = response.docs[index].data();
        }
  
        return data;
    }
// end getData
}

export default {
    getData
}