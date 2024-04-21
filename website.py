from http.server import HTTPServer, BaseHTTPRequestHandler
import json
from recommend import recommend

return_event = ""

class hello(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/get_best_event':
            self.send_response(200)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(return_event.encode())
            return
        
        elif self.path == '/':
            self.path = '/index.html'
        try:
            file_path = '.' + self.path
            with open(file_path, 'rb') as file:
                self.send_response(200)
                if file_path.endswith('.html'):
                    self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write(file.read())
        except FileNotFoundError:
            self.send_error(404, 'File Not Found: %s' % self.path)

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))

        # print('Data received from client:', data)

        activity = data[0]
        data = data[1:]

        if activity == -1: activity = 0
        elif activity == -2: activity = 1

        day = "21.4.2024"
        best_event = recommend(data, activity, day)
        print(best_event)

        global return_event
        return_event = best_event

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({'message': 'Data received successfully'}).encode())

def main():
    PORT = 8080
    server = HTTPServer(('',PORT) , hello)
    print("Server running on port %s" % PORT)
    server.serve_forever()

if __name__ == "__main__":
    main()
