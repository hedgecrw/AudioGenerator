.PHONY : all clean pianodemo scoredemo instrument

all :
	$(info Valid targets: 'pianodemo', 'scoredemo', 'instrument')

clean :
	rm -f *.html

pianodemo : clean
	cp -f demos/piano/pianodemo.html . && python3 -m http.server --cgi 8080

scoredemo : clean
	cp -f demos/score/scoredemo.html . && python3 -m http.server --cgi 8080

instrument : clean
	cp -f tools/instrument/instrument-creator.html . && python3 -m http.server --cgi 8080
