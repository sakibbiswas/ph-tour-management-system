/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
// import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

let server: Server;


const startServer = async () => {
    try {
        await mongoose.connect(envVars.DB_URL)

        console.log("Connected to DB!!");

        server = app.listen(envVars.PORT, () => {
            console.log(`Server is listening to port ${envVars.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

(async () => {
    await startServer()
    // await seedSuperAdmin()
})()

process.on("SIGTERM", () => {
    console.log("SIGTERM signal recieved... Server shutting down..");

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }

    process.exit(1)
})

process.on("SIGINT", () => {
    console.log("SIGINT signal recieved... Server shutting down..");

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }

    process.exit(1)
})


process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejecttion detected... Server shutting down..", err);

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }

    process.exit(1)
})

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception detected... Server shutting down..", err);

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }

    process.exit(1)
})






// Unhandler rejection error
// Promise.reject(new Error("I forgot to catch this promise"))

// Uncaught Exception Error
// throw new Error("I forgot to handle this local erro")


/**
 * unhandled rejection error
 * uncaught rejection error
 * signal termination sigterm
 */






// import { Server } from 'http';
// import mongoose from 'mongoose';
// // import app from './app';
// // 
// let server: Server;

// const PORT = 5000;

// async function main() {
//     try {
//         await mongoose.connect("mongodb+srv://sazzadur:sakib9988@cluster0.uxaxmsb.mongodb.net/tour-mmanagement-backend?retryWrites=true&w=majority&appName=Cluster0");
//         console.log("Connected to MongoDB Using Mongoose!!");
//         server = app.listen(PORT, () => {
//             console.log(`App is listening on port ${PORT}`);
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }

// main()


