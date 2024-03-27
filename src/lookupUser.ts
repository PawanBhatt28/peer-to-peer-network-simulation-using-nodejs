import {allNodes} from "./servers";
import { lookup } from "./Routes/lookup";
import { Node } from "./servers";


export function lookupUser(user: string, uri: string, requestID: string){
    console.log("inside lookup user");

    return fetch(`${uri}/lookup?user=${user}`, {
        headers : {
            "x-request-id" : requestID,
        }
    })
    .then((response) => {
        if(response.ok){
            return response.json() as Promise<Node>;
        }
        throw new Error("userrr not found");
    });
    // .catch(err => {
    //     console.log("error during lookupuser");
    // });
}