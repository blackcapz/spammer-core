const axios = require('axios')
const {
  SLACK_HOOK,
  SLACK_CHANNEL,
  SLACK_EMOJI,
  SLACK_USERNAME,
} = process.env

module.exports = async (context, message) => {
  try {
    const requestBody = {
      channel: SLACK_CHANNEL,
      text: message,
      icon_emoji: SLACK_EMOJI,
      username: SLACK_USERNAME,
      as_user: SLACK_USERNAME
    }
    return await axios.post(SLACK_HOOK, requestBody) 
  } catch (slackRequestError) {
    context.log('* Slack request error', slackRequestError)
  }
}