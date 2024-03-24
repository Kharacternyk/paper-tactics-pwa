.PHONY: dist

dist: dist/robots.txt dist/_headers
	pnpm build

dist/%: %
	install -DTm0644 $< $@
