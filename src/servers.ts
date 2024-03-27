export type Node = {
    uri : string,
    user : string,  
};

const server: Node[] = []

export function allNodes(){
    return [...server];
}

export function addNode(node: Node){
    const isAlreadyAvailable = server.find(existingNode => existingNode.user === node.user);

    if(isAlreadyAvailable) return;

    console.log("-----------------------------------------");
    console.log(`"${node.user}" registered at uri of ${node.uri}`);
    server.push(node);

    console.log("added a node, now my servers are : ");
    for(let ser of allNodes()){
        console.log(`${ser.uri} : ${ser.user}`);
    }
    console.log("-----------------------------------------");

}


export function getNodeByUser(user: String){
    console.log(`Finding user : ${user} inside ${process.env.PORT} servers.`);
    return server.find(server => server.user == user);
}