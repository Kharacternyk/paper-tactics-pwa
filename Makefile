build:
	yarn run parcel build src/index.html
	cp src/headers.txt dist/_headers
	cp src/robots.txt dist/
