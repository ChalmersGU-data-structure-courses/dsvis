
.PHONY: help website deploy

help:
	@echo "make website:"
	@echo "  - Compiles all files into the folder 'public'"
	@echo "  - After this you can browse to 'public/index.html' to test on your computer"
	@echo "make deploy:"
	@echo "  - Copies the files in 'publis' into 'docs'"
	@echo "  - After pushing to github, this will be the official website"

website:
	npx webpack --config webpack.config.js

deploy: website
	rm -rf docs
	cp -R public docs
