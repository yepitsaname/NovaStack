/* JWT shenanigans
  Format: xxxxx.yyyyy.zzzzz
    • x: token type
    • y: signing algorithm
    • z: payload
  HMAC SHA256 - HS256

  Encryption thought process?

  User creates an account, the password is then encrypted with bcrypt and the hash is stored in the database
  When a user attempts to log in, both their username and password are sent to the API.
  Then a database look up is performed on the username and if it is found it will return their associated hash.
  Their password and the hash are compared and if they pass the hash a JWT is generated and sent back to the user.
  This JWT will then be used to gaurentee authentication while it is active.

  Account Creation
  1. Password is hashed and stored after 14 salt rounds

  Account Login
  1. User sends login request with username and password hash
  2. Server verifies the account exists in the database
  3. Server requests the account's password hash from the database
  4. Server performs a hash comparison
  5. Server generates a JWT using HS256.
    • The username and timestamp are provided as a payload
    • The account's hash is used as the secred
  6. The JWT is served to the user to access protected routes

  *EXAMPLE*
  password: password
  hash: $2y$10$hEuSzZLDYstLyp0HaeUqTeuk327lXJZ13uP9l0YsgOwcvkgfGOIwy

  There are definitely issues as the token doesnt expire nore is there a new secret key being generated at every log on. (Should probably do that?)
  Should also make the tokens actually expire and validate based off of expiry
*/

import bcrypt from 'bcrypt';
import * as jose from 'jose';
const salt = 14;

export async function hash(password){
  const hash = await bcrypt.hash(password, salt);
  const jwkSecret = await jose.generateSecret('A128CBC-HS256');
  const encoded = jose.base64url.encode(jwkSecret);
  return [hash, encoded];
}

export async function compareHash(password,hash){
  return await bcrypt.compare(password,hash);
}

export async function genJWT(username,jwkSecret){
  const decoded = jose.base64url.decode(jwkSecret);
  return await new jose.EncryptJWT({"username":username})
  .setIssuedAt()
  .setExpirationTime("24h")
  .setProtectedHeader({"alg": "dir", "enc": "A128CBC-HS256"})
  .encrypt(decoded);
}

export async function decodeJWT(jwt, jwkSecret){
  const decoded = jose.base64url.decode(jwkSecret);
  try{
    return (await jose.jwtDecrypt(jwt, decoded)).payload
  }
  catch(err){
    return null;
  }
}