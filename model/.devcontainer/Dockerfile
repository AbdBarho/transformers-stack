# syntax=docker/dockerfile:1
FROM pytorch/pytorch:1.12.1-cuda11.3-cudnn8-runtime
RUN pip3 --disable-pip-version-check --no-cache-dir install transformers jupyterlab ipywidgets black pylint

ENV MODEL_PORT=8000 TRANSFORMERS_CACHE="./.cache/"
# CMD python server.py ${MODEL_PORT}