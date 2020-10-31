// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const { lastWeekActiveUsers } = require("./yo")
const axios = require("axios")
exports.handler = async (event, context) => {
  try {
    const subject = event.queryStringParameters.name || 'World'
    const data = await lastWeekActiveUsers()
    const string = "Last week: " + data.map(a => a.join()).join()
    console.log('string: ', string);
    axios.get(`https://api.telegram.org/bot1196576929:AAFCVPBTMcSUlrHAIFBO_Ni7e9em0Nje10U/sendMessage?chat_id=912275377&text=${string}`)

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${subject}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
