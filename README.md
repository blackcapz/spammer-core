<p align="center">
  <h3 align="center">Spammer</h3>
  <p align="center">Strategy-oriented social network spammer.</p>

  <p align="center">
    <a href="http://standardjs.com/">
      <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg">
    </a>
  </p>
</p>

---

### Objective

Crawler project to post messages in social networks' personal feeds or groups.

### Environment variables

* `SPAMMER_USER`: Author's username (optional if you pass on context)
* `SPAMMER_PASS`: Author's password (optional if you pass on context)
* `SLACK_HOOK`: Slack URL Hook
* `SLACK_CHANNEL`: Slack channel
* `SLACK_EMOJI`: Slack icon emoji
* `SLACK_USERNAME`: Slack username

### Usage

> **You can use the [Spammer Runner](https://github.com/blackcapz/spammer-runner) project(basically is an docker environment) to use the [UI](https://github.com/blackcapz/spammer-ui) and [Core](https://github.com/blackcapz/spammer-core) instead of using REST access.**

Run `npm start` locally, the request body varies according to the strategy, only `strategy`, `text`, `user` and `pass` are required in all requests.

**`POST /spam`**

```json
{
  "strategy": "Facebook",
  "ids": [
    "123",
    "321"
  ],
  "user": "user@domain.com.br",
  "pass": "123@change",
  "text": "Testing message"
}
```

_Response if successfully_
```json
{
  "status": 200,
  "body": "All messages have been posted"
}
```

### Strategies payload

- Facebook
  + `ids`: Array< string >: Social network feed/page/group IDs;

### Execution environments

- [x] Localhost
- [ ] AWS Lambda
- [x] Microsoft Azure Functions: