# Transformers Stack

A full stack solution for deploying a language model from hugging face with a simple UI for prompting the model and tracking the results.

This project uses `docker compose` for orchestrating two containers, `model` which contains the model with a simple http interface, and `ui` which is a next.js application that provides access to the model in a UI.


## Setup


update the variable `MODEL_KEY` in `docker-compose.yml` to the name of the model you want, for example `bigscience/bloom-560m` or `EleutherAI/gpt-neo-1.3B`.

And then run `docker compose up --build`! thats all you need! The UI will be available on [http://localhost:9999](http://localhost:9999) (you can change the port also in  `docker-compose.yml` )

### Run on CPU
create a file called `docker-compose.override.yml` and put the following in it:
```yml
services:
  model:
    deploy: {}
```