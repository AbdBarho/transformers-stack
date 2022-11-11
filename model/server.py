from http.server import BaseHTTPRequestHandler, HTTPServer
import os
import sys
import json
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

MODEL_KEY = os.environ["MODEL_KEY"]
has_cuda = torch.cuda.is_available()
print("Model Key:", MODEL_KEY)
print("Cuda available:", has_cuda, flush=True)

tokenizer = AutoTokenizer.from_pretrained(MODEL_KEY)
model = AutoModelForCausalLM.from_pretrained(MODEL_KEY)
if has_cuda:
    model = model.half().cuda()

print("Model loaded", flush=True)

kwargs = {
    "max_length": int,
    "max_new_tokens": int,
    "min_length": int,
    "do_sample": bool,
    "num_beams": int,
    "num_beam_groups": int,
    "early_stopping": bool,
    "temperature": float,
    "top_k": int,
    "top_p": float,
    "typical_p": float,
    "repetition_penalty": float,
    "length_penalty": float,
}


def predict(input, **args):
    args = {"max_new_tokens":100, **args}
    for key, typeMapper in kwargs.items():
        if key in args:
            args[key] = typeMapper(args[key])

    tokens = tokenizer(input, return_tensors="pt").to(0)
    outputs = model.generate(**tokens, **args)
    string = tokenizer.decode(outputs[0])
    if has_cuda:
        torch.cuda.empty_cache()
    return string


class MyServer(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers["Content-Length"])
        post_data = self.rfile.read(content_length)

        error = False
        try:
            data = json.loads(post_data)
            output = predict(**data)
        except Exception as err:
            output = str(err)
            error = True

        output = output.encode("utf-8")
        self.send_response(400 if error else 200)
        self.send_header("Content-type", "text/plain; charset=UTF-8")
        self.send_header("Content-Length", len(output))
        self.end_headers()
        self.wfile.write(output)


if __name__ == "__main__":
    port = int(sys.argv[1])
    webServer = HTTPServer(("", port), MyServer)
    print(f"Server started on {port}")

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")
