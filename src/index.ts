require('dotenv').config()
require('es6-promise').polyfill();
require('isomorphic-fetch');
import URI from 'urijs';

const url = new URI("https://api.fast.co");

const APP_SECRET = process.env.APP_SECRET

interface LoginAuth {
  key : string;
  identifier : string;
}
interface Auth extends LoginAuth {
  
  challengeId : string;
  secret?: string;
  oth : string;
}
interface Data {
  status: number,
  success: Boolean,
  fast_id: unknown,
  challenge_ip: string,
  challenge_ts: string,
}
export async function authorize({
  key,
  identifier,
  challengeId,
  secret,
  oth
}: Auth
){
  secret = typeof secret === 'undefined' ? APP_SECRET :  secret
  const verify = url.directory("api/verify").query({ challengeId: challengeId, oth: oth, identifier: identifier, key: key, secret: secret});
  console.log(verify.valueOf());
  const response = await fetch(verify.valueOf());
  const data: Data =  await response.json(); // parses JSON response into native JavaScript objects
  console.log(data);
}
export async function login({identifier, key}: LoginAuth){
  // Endpoint: https://api.fast.co/api/invite
  const invite = url.directory("api/invite").query({ identifier: identifier, key: key});
  console.log(invite.query())
  console.log(invite.valueOf());
  const response = await fetch(invite.valueOf());
  const data: Data =  await response.json(); // parses JSON response into native JavaScript objects
  console.log(data);
}

interface AuthResult {
  identifier:string;
  oth:string;
  challengeId:string;
}
export function getParams(url_string: string): AuthResult | null {
  var url = new URL(url_string);
  var identifier = url.searchParams.get("identifier");
  var oth = url.searchParams.get("oth");
  var challengeId = url.searchParams.get("challengeId");
  if(identifier && oth && challengeId){
    return {
      identifier,
      oth,
      challengeId
    }
  } 
  return null
}