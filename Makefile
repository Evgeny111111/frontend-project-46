install:
	npm ci

lint: 
	npx eslint .

publish:
	npm publish --dry-run

gendiff:
	node bin/gendiff.js

test-coverage:
	npm test -- --coverage --coverageProvider=v8

run:
	npm run test
