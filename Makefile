.PHONY: dist

dist: dist/robots.txt dist/_headers
	yarn run parcel build src/index.html

dist/%: src/%
	install -DTm0644 $< $@
