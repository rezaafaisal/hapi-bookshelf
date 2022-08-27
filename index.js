import hapi from "@hapi/hapi"
import route from "./routes.js"

const init = async ()=>{
    const server = hapi.Server({
        host: "localhost",
        port: 3000
    })

    server.route(route)
    
    server.start()
    console.log("Server started at ", server.info.uri)
}

init()