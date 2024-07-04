

import { access } from "fs";
import { IUser } from "../../database/models";
import { createDpopHeader, generateDpopKeyPair } from '@inrupt/solid-client-authn-core';
import { buildAuthenticatedFetch } from '@inrupt/solid-client-authn-core';
import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from "./Validation";

type Token = {
    id: string,
    secret: string,
    resource: string
}

const bodyValidation: yup.ObjectSchema<IUser> = yup.object().shape({
    userid: yup.string().required(),
    local_webid: yup.string().required(),
    webid: yup.string().required(),
    idp: yup.string().required(),
    username: yup.string().required(),
    password: yup.string().required(),
    podname: yup.string().required()
})

export const loginBodyValidation = validation('body', bodyValidation);


export const login = async (req: Request<{}, {}, IUser> | IUser, res: Response) => {
    // console.log(req.body);

    const user: IUser = 'body' in req ? req.body : req;

    const token = await getAuthorization(user);

    const authFetch = await getAuthFetch(token, user);
    // console.log ("AuthFetch\n" + authFetch);

    // return res.send(authFetch);
    return authFetch;
}

export const loginExternal = async (req: Request<{}, {}, IUser> | IUser, res: Response) => {
    // console.log(req.body);

    const user: IUser = 'body' in req ? req.body : req;

    console.log(user);
    const token = await getAuthorization(user);

    // const accessToken = await getAccessToken(token, user);

    return res.send( await getAccessToken(token, user));

}

export const getAuthorization = async (user: IUser) => {

    // First we request the account API controls to find out where we can log in

    const indexResponse = await fetch(user.idp + '.account/');
    // const indexResponse = await fetch(process.env.SOLID_IDP + '.account/');
    // console.log(indexResponse);

    const { controls } = await indexResponse.json();

    // And then we log in to the account API
    const response = await fetch(controls.password.login, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: user.username, password: user.password }),
    });
    // console.log(response);

    // This authorization value will be used to authenticate in the next step
    const { authorization } = await response.json();
    // console.log(authorization);

    let token = await generateToken(authorization, user);

    return token;
    // return getAuthFetch(token, user);
}


async function generateToken(authorization: any, user: IUser) {
    // Now that we are logged in, we need to request the updated controls from the server.
    // These will now have more values than in the previous example.
    const indexResponse = await fetch(user.idp + '.account/', {
        headers: { authorization: `CSS-Account-Token ${authorization}` }
    });
    const { controls } = await indexResponse.json();

    // Here we request the server to generate a token on our account
    const response = await fetch(controls.account.clientCredentials, {
        method: 'POST',
        headers: { authorization: `CSS-Account-Token ${authorization}`, 'content-type': 'application/json' },
        // The name field will be used when generating the ID of your token.
        // The WebID field determines which WebID you will identify as when using the token.
        // Only WebIDs linked to your account can be used.
        body: JSON.stringify({ name: 'my-token', webId: user.webid }),
    });

    // These are the identifier and secret of your token.
    // Store the secret somewhere safe as there is no way to request it again from the server!
    // The `resource` value can be used to delete the token at a later point in time.
    const { id, secret, resource } = await response.json();

    let token: Token = {
        id: id,
        secret: secret,
        resource: resource
    };

    return token;
}

export const getAuthFetch = async (token: Token, user: IUser) => {


    // A key pair is needed for encryption.
    // This function from `solid-client-authn` generates such a pair for you.
    const dpopKey = await generateDpopKeyPair();

    // These are the ID and secret generated in the previous step.
    // Both the ID and the secret need to be form-encoded.
    const authString = `${encodeURIComponent(token.id)}:${encodeURIComponent(token.secret)}`;
    // This URL can be found by looking at the "token_endpoint" field at
    // http://localhost:3000/.well-known/openid-configuration
    // if your server is hosted at http://localhost:3000/.
    const tokenUrl = user.idp + '.oidc/token';

    const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
            // The header needs to be in base64 encoding.
            authorization: `Basic ${Buffer.from(authString).toString('base64')}`,
            'content-type': 'application/x-www-form-urlencoded',
            dpop: await createDpopHeader(tokenUrl, 'POST', dpopKey),
        },
        body: 'grant_type=client_credentials&scope=webid',
    });

    // This is the Access token that will be used to do an authenticated request to the server.
    // The JSON also contains an "expires_in" field in seconds,
    // which you can use to know when you need request a new Access token.
    const { access_token: accessToken } = await response.json();

    const authFetch = await buildAuthenticatedFetch(accessToken, { dpopKey });

    return authFetch;
}

export const getAccessToken = async (token: Token, user: IUser) => {


    // A key pair is needed for encryption.
    // This function from `solid-client-authn` generates such a pair for you.
    const dpopKey = await generateDpopKeyPair();

    // These are the ID and secret generated in the previous step.
    // Both the ID and the secret need to be form-encoded.
    const authString = `${encodeURIComponent(token.id)}:${encodeURIComponent(token.secret)}`;
    // This URL can be found by looking at the "token_endpoint" field at
    // http://localhost:3000/.well-known/openid-configuration
    // if your server is hosted at http://localhost:3000/.
    const tokenUrl = user.idp + '.oidc/token';

    const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
            // The header needs to be in base64 encoding.
            authorization: `Basic ${Buffer.from(authString).toString('base64')}`,
            'content-type': 'application/x-www-form-urlencoded',
            dpop: await createDpopHeader(tokenUrl, 'POST', dpopKey),
        },
        body: 'grant_type=client_credentials&scope=webid',
    });

    // This is the Access token that will be used to do an authenticated request to the server.
    // The JSON also contains an "expires_in" field in seconds,
    // which you can use to know when you need request a new Access token.
    const { access_token: accessToken } = await response.json();

    return { accessToken, dpopKey };
}
