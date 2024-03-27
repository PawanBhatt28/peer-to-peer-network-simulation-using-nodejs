// 1 - located a random seed server
// 2 - now, registering the user with that found server

import { getCurrentURI } from "./getCurrentURI";

export function registerWithSeedServer(uri: String){ // uri - the random seed server

    fetch(`${uri}/register`, { // by default it does GET method.  && POST request at a random seed server
        method : "POST", 
        body : JSON.stringify({
            uri : getCurrentURI(), // registering user URI (IP)
            user : (process.env.USER_NAME || "").trim(),                // registering user Name
        }),
        headers : {
            "Content-Type" : "application/json",
        }
    })
    .then( (response) => {

        console.log("-----------------------------------------");
        console.log(`Registration Sent to : ${uri}`)
        console.log("-----------------------------------------");
        
        return response;
    });
}