import { authorize, login, getParams } from '../src'
const test_identifier = process.env.TEST_IDENTIFIER
const test_oth = process.env.TEST_OTH
const test_challengeid = process.env.TEST_CHALLENGEID
const app_key = process.env.APP_KEY

async function test_login() {
  if(app_key && test_identifier){ 
    await login({
      key: app_key,
      identifier: test_identifier,
    })
  }
}

async function test_authorize() {
  if(app_key && test_identifier && test_challengeid && test_oth){ 
    await authorize({
      key: app_key,
      identifier: test_identifier,
      challengeId: test_challengeid,
      oth: test_oth
    })
  }
}
function test_get_params(){
  const test = "https://api.fast.co/api/invite?identifier=test%40test.com&oth=66Tge3&challengeId=61677"
  const params = getParams(test)
  if(params && params.identifier ==="test@test.com" && params.oth === "66Tge3" && params.challengeId === '61677'){
    console.log(`TEST: getParams - PASSED`);
  } else {
    console.error(`TEST: getParams - FAILED`);
  }
}
//test_login()
//test_authorize()
test_get_params()