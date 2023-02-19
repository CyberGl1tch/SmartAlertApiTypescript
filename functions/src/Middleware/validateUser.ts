
const admin = require('firebase-admin');


export async function validateUserMiddle(request: any, response: any, next: Function) {
    if (request.headers.authorization) {
        admin.auth().verifyIdToken(request.headers.authorization.split("Bearer")[1].trim())
            .then((user: any) => {
                request.user = user
                next()
            }).catch((e:any) => {
                console.log(e)
            response.status(403).send({status: 403,message: "Unauthorized"})
        });
    } else {
        response.status(403).send({status: 403,message: "Unauthorized"})
    }
}