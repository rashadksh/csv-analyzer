## CSV Analyzer

An AI based csv analyzer

## Development

### Prerequisites

- [Docker compoose](https://docs.docker.com/compose/install/)
- [Task](https://taskfile.dev/installation/)

### Environment variables

| Variable         | Description           | Example  |
| ---------------- | --------------------- | -------- |
| MONGODB_USERNAME | Mongodb user name     | root     |
| MONGODB_PASSWORD | Mongodb user pass     | toor     |
| MONGODB_DATABASE | Mongodb database name | csvlyzer |

### Starting development server

After cloning the repository. Run `task dev` in the root directory.

If it's the first time, have a ☕ as it will take up to 15 mins to build the docker images.
