import { server } from "./server/Server";

server.listen(process.env.PORT || 3333, () => { 
    console.log(`App running in port ${process.env.PORT || 3333}`);
});