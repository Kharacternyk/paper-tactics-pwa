.PHONY: dist

dist: dist/robots.txt dist/_headers
	pnpm exec parcel build index.html

dist/%: %
	install -DTm0644 $< $@
