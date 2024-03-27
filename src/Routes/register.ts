
import {Request, Response} from "express";
import {addNode} from "../servers";
import {Node} from "../servers";

export function register(req: Request, res: Response){
    const {user, uri} = req.body;
    addNode({user, uri});

    res.send({message : "success from register.ts"});
}