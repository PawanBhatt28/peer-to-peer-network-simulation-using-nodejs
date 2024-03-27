
import type {Request, Response} from "express";
import { lookupUser } from "../lookupUser";
import {v4 as uuidv4} from "uuid";
import { sendMessage } from "../sendMessage";
import {getCurrentURI} from "../getCurrentURI";

export async function send(req: Request, res: Response){

    console.log(`send message request received.`);

    const {to, message} = req.body;
    const from = (process.env.USER_NAME || "").trim();

    console.log(`from : "${from}", sending user : "${getCurrentURI()}", message : ${message}, to : "${to}"`);

    try{
        const foundUser = await lookupUser(to, getCurrentURI(),  uuidv4());
        console.log(`found user "${foundUser.uri}", sending user : "${getCurrentURI()}", message : "${message}"`);
        await sendMessage(from, message, foundUser.uri); // why we did '!'.
        
        return res.json({message : "user found found but but "});

    }catch(error){
        console.log("error during send");

        console.log(error);
        res.status(404).send("user not found while sending");
    }

}