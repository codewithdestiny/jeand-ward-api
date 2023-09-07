import { app } from "./app";

import { REDIS_URL, client } from "../config/dbConnect";

require("dotenv").config();

const PORT = process.env.PORT || 3500;


export const dbConnect = async () => {

    if(!client.isOpen){
        await client.connect();
        console.log(`Redis Server is connected on port ${REDIS_URL.split(':')[2]}`)
    }
}


app.listen(PORT , () => {

    dbConnect();

    client.on("error", (err) => console.log(`Redis Error ${err}`));

    console.log(`Server is running on port ${PORT}`);

})