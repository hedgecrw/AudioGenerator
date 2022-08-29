start :
	cp demo/index.html . && python3 -m http.server --cgi 8080
	rm index.html
