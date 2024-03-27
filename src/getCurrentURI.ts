export function getCurrentURI(){
    const port = (process.env.PORT || "").trim();
    return `http://localhost:${port}`;
}