
// function that checks a password
/*
    password = string that has to be tested
    parameters = {
        minSize : int, // minimum password size - default is 4
        maxSize : int, // maximum password size - default is 12
        mustHaveCap: bool, // test if password contains capital leters - default is true
        mustHaveLeter: bool, // test if password contains leters - default is true
        mustHaveNumber:  bool, // test if password contains numbers - default is true
        mustHaveSymbol: bool, // test if password contains symbol - default is true
    }
    message = {
        minSize : string, // minimum size fail message
        maxSize : string, // maximum size fail message
        noCap : string, // capital leters fail message
        noLeter : string, // leter fail message
        noNumber : string, // number fail message
        noSymbol : string, // symbol fail message
        succes : string, // passed test message
    }

*/

// TO DO - check for input para meers data types

function pwCheck(password, parameters = {}, message = {}){

    // result
    const result = {
        message: "",
        status: false,
        checks: { }
    }

    // default parameters
    const minSize = 4;
    const maxSize = 12;
    const checkCap = true;
    const checkLeter = true;
    const checkNum = true;
    const checkSymbol = true;
    const symbol = "/[`!@#$%^&*()_+-=]{};'"+':"|,.<>?~' + "\\";

    // default messages
    const msgMinSize = `password size must be at least`;
    const msgMaxSize = `password size must be smaller`;
    const msgNoCap = `password must contain a capital leter.`;
    const msgNoLeter = `password must contain a leter.`;
    const msgNoNum = `password must contain a number.`;
    const msgNoSymbol = `password must contain a symbol.`;
    const msgSucces = "password passed.";

    // check input parameters
    if(parameters.minSize === undefined){
        parameters.minSize = minSize
    }

    if(parameters.maxSize === undefined){
        parameters.maxSize = maxSize
    }

    if(parameters.mustHaveCap === undefined){
        parameters.mustHaveCap = checkCap;
    }

    if(parameters.mustHaveLeter === undefined){
        parameters.mustHaveLeter = checkLeter;
    }

    if(parameters.mustHaveNumber === undefined){
        parameters.mustHaveNumber = checkNum;
    }

    if(parameters.mustHaveSymbol === undefined){
        parameters.mustHaveSymbol = checkSymbol;
    }

    if(parameters.symbols === undefined){
        parameters.symbols = symbol;
    }

    // check input message
    if(message.minSize === undefined){
        message.minSize = msgMinSize;
    }

    if(message.maxSize === undefined){
        message.maxSize = msgMaxSize;
    }

    if(message.noCap === undefined){
        message.noCap = msgNoCap;
    }

    if(message.noLeter === undefined){
        message.noLeter = msgNoLeter;
    }

    if(message.noNumber === undefined){
        message.noNumber = msgNoNum;
    }

    if(message.noSymbol === undefined){
        message.noSymbol = msgNoSymbol;
    }

    if(message.succes === undefined){
        message.succes = msgSucces;
    }
 
    // function error messages
    if(parameters.minSize > parameters.maxSize){
        const msg = `error: function pwCheck parameters.minSize is larger as parameters.maxSize.`;
        console.warn(msg);
        result.message = msg;
        return result
    }

    if(parameters.minSize < 4){
        parameters.minSize = 4;
    }

    // set parameter messages
    message.minSize = `${message.minSize} ${parameters.minSize}.`;
    message.maxSize = `${message.maxSize} ${parameters.maxSize}.`;
    message.noSymbol = `${message.noSymbol} ${parameters.symbols}.`;

    // check password
    if(parameters.mustHaveLeter && typeof(password) !== "string"){
        const msg = `error: function pwCheck expected a string but has ${typeof(password)}.`;
        console.warn(msg);
        result.message = msg;
        return result
    }
    else if(!parameters.mustHaveLeter && !parameters.mustHaveSymbol && typeof(password) !== "number"){
        const msg = `error: function pwCheck expected a number but has ${typeof(password)}.`;
        console.warn(msg);
        result.message = msg;
        return result
    }

    
    // check password size
    if(password.length < parameters.minSize){
        return result.message = message.minSize;
    }
    else if(password.length > parameters.maxSize){
        return result.message = message.maxSize;
    }

    // function logic
    // check password on leters, numers and symbols
    let hasCap = false;
    let hasNumber = false;
    let hasLeter = false;
    let hasSymbol = false;


    // regexp for checks
    const leters = /[a-z]/g;
    const capLeters = /[A-Z]/g;
    const numbers = /[0-9]/g;


    // check for capital leters
    if(!parameters.mustHaveCap){
        hasCap = true;
    }
    else{
        const match = password.match(capLeters)
        result.checks.hasCap = false;
        if(match !== null){
            hasCap = true;
            result.checks.hasCap = true;
        }
    }


    //check for leters
    if(!parameters.mustHaveLeter){
        hasLeter = true;
    }
    else{
         const match = password.match(leters)
        result.checks.hasLeter = false;
        if(match !== null){
            hasLeter = true;
            result.checks.hasLeter = true;
        }
    }

    // check for numbers
    if(!parameters.mustHaveNumber){
        hasNumber = true;
    }
    else{
        const match = password.match(numbers)
        result.checks.hasNumber = false;
        if(match !== null){
            hasNumber = true;
            result.checks.hasNumber = true;
        }
    }
 

    // check for symbool
    if(!parameters.mustHaveSymbol){
        hasSymbol = true;
    }
    else{
        result.checks.hasSymbol = false;
        for(let index in parameters.symbols){
            if(password.indexOf(parameters.symbols[index]) > -1){
                hasSymbol = true;
                result.checks.hasSymbol = true;
                break;
            }
        }
    }


    // set fault message
    if(parameters.mustHaveCap && !hasCap){
        result.message = message.noCap;
    }

    if(parameters.mustHaveLeter && !hasLeter){
        result.message = message.noLeter;
    }

    if(parameters.mustHaveNumber && !hasNumber){
        result.message = message.noNumber;
    }

    if(parameters.mustHaveSymbol && !hasSymbol){
        result.message = message.noSymbol;
    }

    // return succes status
    if(hasCap && hasNumber && hasLeter && hasSymbol){
        
        result.message = message.succes;
        result.status = true;
        
    }  

    return result; 

    // end pwCheck functon
}

// exports 
export default {
    pwCheck
}