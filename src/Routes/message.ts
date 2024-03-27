import type {Request, Response} from "express";

export function message(req: Request, res: Response){
    console.log("geeting message");
    const {from, message} = req.body;

    console.log(`Message Received --> ${from} - ${message}`);
    res.json({message : "Successfully message received."});
}