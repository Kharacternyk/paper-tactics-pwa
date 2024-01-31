.PHONY: dist

dist: dist/robots.txt dist/_headers
	yarn run parcel build index.html

dist/%: %
	install -DTm0644 $< $@
