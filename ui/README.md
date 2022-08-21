docker build -t temp . && docker run -it --rm -p 3000:3000 -p 8000:8000 -v $(pwd)/db:/db temp
