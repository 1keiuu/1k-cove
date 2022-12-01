app-up:
	yarn workspace @1k-cove/app dev
app-build:
	yarn workspace @1k-cove/app build
app-deploy:
	yarn workspace @1k-cove/app deploy

blog-up:
	yarn workspace @1k-cove/blog dev
blog-build:
	yarn workspace @1k-cove/blog build
	yarn workspace @1k-cove/blog export
blog-deploy:
	make blog-build
	yarn workspace @1k-cove/blog deploy

admin-up:
	yarn workspace @1k-cove/admin dev

functions-deploy:
	yarn workspace @1k-cove/functions deploy
