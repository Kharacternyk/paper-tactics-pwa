.PHONY: dist

dist: dist/robots.txt dist/_headers
	yarn run parcel build src/index.html --no-source-maps

dist/%: src/%
	install -DT $< $@
