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

## Setup
### Environment variables
* SPAMMER_USER: Author's username;
* SPAMMER_USER: Author's password;

### Function arguments
* groups  :: Array<string>: Social network group ID;
* text :: string: Message to be posted;

## Execution environments

- [ ] Microsoft Azure Functions:
- [x] * Localhost: ⚠ requires the following steps:
  1. add environment variables in code `process.env.FB_USER = 'user@email.com'` and `process.env.FB_PASS = 'password'` or in your system;
  1. make function call `main({ ...console, body: { groups: ['id1', 'id2'], message: 'something' } })`;