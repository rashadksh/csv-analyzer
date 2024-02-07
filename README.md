## CSV Analyzer

An AI based csv analyzer

## System overview

![System pipeline](./system.png)

## Demo

Watch system demo [here](https://www.loom.com/share/840f089e67de42ad93e6bc14704d0a62).

## Development

### Prerequisites

- [Docker compoose](https://docs.docker.com/compose/install/)
- [Task](https://taskfile.dev/installation/)

### API Environment variables

| Variable         | Description               | Example                                                           |
| ---------------- | ------------------------- | ----------------------------------------------------------------- |
| MONGODB_USERNAME | Mongodb user name         | root                                                              |
| MONGODB_PASSWORD | Mongodb user pass         | toor                                                              |
| MONGODB_DATABASE | Mongodb database name     | csvlyzer                                                          |
| MONGODB_URL      | Mongodb connection string | `mongodb://root:toor@mongodb:27017/csv-analyzer?authSource=admin` |
| REDIS_HOST       | Redis host                | `localhost`                                                       |
| REDIS_PORT       | Redis port                | 6379                                                              |
| OPEN_AI_KEY      | open ai api key           | `sk-xxxxxxx`                                                      |

### Frontend Environment variables

| Variable       | Description  | Example                     |
| -------------- | ------------ | --------------------------- |
| NX_APP_API_URL | Api base url | `http://localhost:3000/api` |

### Starting development server

After cloning the repository. Run `task dev` in the root directory.

If it's the first time, have a ☕ as it will take up to 15 mins to build the docker images.

### Running tests

Tests are ran outside docker as a proof that they can literally run anywhere. Make sure to run `yarn install` in the root directory. Then run `task test`.
