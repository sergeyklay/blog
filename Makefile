.PHONY: clean
clean:
	rm -rf public

.PHONY: build
build:
	hugo --verbose

.PHONY: serve
serve:
	HUGO_PREVIEW=true HUGO_ENV=development \
		hugo server \
		--verbose \
		--buildDrafts \
		--buildFuture \
		--ignoreCache \
		--disableFastRender

.PHONY: netlify-production-build
netlify-production-build:
	hugo --minify

.PHONY: netlify-split1-build
netlify-split1-build:
	hugo --minify --enableGitInfo

.PHONY: netlify-deploy-preview
netlify-deploy-preview:
	HUGO_PREVIEW=true hugo \
		--minify \
		--buildDrafts \
		--buildFuture \
		--baseURL $(DEPLOY_PRIME_URL)

.PHONY: netlify-branch-deploy
netlify-branch-deploy:
	hugo \
		--minify \
		--buildDrafts \
		--buildFuture \
		--baseURL $(DEPLOY_PRIME_URL)
