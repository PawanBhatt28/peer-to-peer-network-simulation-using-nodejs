import type {Request, Response} from "express";
import { getNodeByUser } from "../servers";
import {allNodes} from "../servers";
import {lookupUser} from "../lookupUser";
import {v4 as uuidv4} from "uuid";

const seedIDs = new Set();

export async function lookup(req: Request, res: Response){
    console.log(`Lookup request for ${req.query.user}`);

    const requestID = req.get("x-request-id") ?? uuidv4();

    if(seedIDs.has(requestID)){
        console.log(`visited again and not in ${requestID} server.`);
        return res.status(404).send("User not found again");    
    }
    
    seedIDs.add(requestID);

    const {user} = req.query as {user : string};

    const serverByUser = getNodeByUser(user); // find Nemo in current server

    if(!serverByUser){
        let foundUser;
        console.log("-----------------------------------------");
        console.log(`Now finding in connected nodes.`);
        for(let server of allNodes()){
            try{
                foundUser =  await lookupUser(user, server.uri, requestID);
            }catch(err){}
        }
        console.log("-----------------------------------------");

        if(foundUser){   
            return res.json(foundUser);
        }else{
            console.log(`${user} not found`);
            return res.status(404).send("User not found no where.");
        }
    }
    
    console.log(`Server by users : ${serverByUser?.user}`);
    return res.json(serverByUser);
    
}