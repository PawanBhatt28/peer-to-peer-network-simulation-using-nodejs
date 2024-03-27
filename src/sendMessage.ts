import { request } from "http";


export function sendMessage(from: string, message: string, uri: string){
    console.log("inside sendMessage post request.");
    console.log(`from : "${from}", message : "${message}", uri : "${uri}"`);
    return fetch(`${uri}/message`, {
        method : "POST",
        body : JSON.stringify({
            from ,
            message,
        }),
        headers : {
            'content-type' : "application/json",
        }
    });
}