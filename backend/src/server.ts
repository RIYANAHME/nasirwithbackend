import express from "express";
import cors from "cors";
import { sample_foods, sample_tags, sample_users } from "./data";
import jwt from "jsonwebtoken";
import foodRouter from "./router/food.router";

const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4280"]
}));

app.use("/api/foods", foodRouter);

app.post("/api/users/login", (req,res) => {
    const {email, password} = req.body;
    const user = sample_users.find(user => user.email === email && 
        user.password === password);

        if(user){
            res.send(generateTokenResponse(user));
        }else{
            res.status(400).send("User name or password is not valid");
        }
})

const generateTokenResponse = (user:any) =>{
    const token = jwt.sign({
        email:user.email, isAdmin:user.isAdmin
    },"SomeRandomText", {
        expiresIn: "30d"
    });

    user.token = token;
    return user;
}

const port = 4040; 
app.listen(port, () => {
    console.log("Webside served on http://localhost:" + port);
})