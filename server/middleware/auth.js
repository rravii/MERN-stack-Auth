import jwt from 'jsonwebtoken';
import ENV from '../config.js';

// auth middleware
export default async function Auth(req, res, next){

    try {

        // access authorize header to validate request

        // A bearer token is a type of access token that is issued by an authorization 
        // server and presented by a client to a resource server in order to access protected 
        // resources. The token represents the authorization of a specific application or user 
        // to access specific parts of a system. Bearer tokens are typically sent in the 
        // Authorization header of an HTTP request 

        const token = req.headers.authorization.split(" ")[1]; // login -> get user token -> pass inside the bearer token
       
        // retrive the user details of the logged in user
        const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);

        req.user = decodedToken;

        // res.json(decodedToken);
        next()

    } catch (error) {
        res.status(401).json({ error : "Authentication Failed!" })
    }

}

export function localVariables(req, res, next){
    req.app.locals = {
        OTP: null,
        resetSession: false
    }
    next()
}