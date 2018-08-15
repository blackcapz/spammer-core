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

## Objective
Crawler project to post messages in social networks' personal feeds or groups.

### Environment variables
* SPAMMER_USER: Author's username;
* SPAMMER_PASS: Author's password;

### Usage

Run `npm start` locally, the request body varies according to the strategy, only `strategy`, `text`, `user` and `pass` are required in all requests.

**`POST /spam`**

```json
{
	"strategy": "Facebook",
	"groups": [
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
  + groups  :: Array< string >: Social network group ID;

### Execution environments

- [x] Localhost
- [ ] AWS Lambda
- [ ] Microsoft Azure Functions: