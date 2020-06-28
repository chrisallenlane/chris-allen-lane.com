makefile := $(realpath $(lastword $(MAKEFILE_LIST)))

# executables
HUGO           := hugo

# paths
dir_cache      := ./resources
dir_dist       := ./dist
dir_img_asset  := ./assets/images
dir_img_static := ./static/images

## all: build the production distribution
.PHONY: all
all: build-images
	$(HUGO) --minify

## build-images: resize and convert images
.PHONY: build-images
build-images: $(dir_img_static)
	cp -r $(dir_img_asset)/* $(dir_img_static)/ && \
	go run scripts/convert-images.go

$(dir_img_static):
	mkdir -p $(dir_img_static)

## clean: remove build artifacts
.PHONY: clean
clean:
	rm -rf           \
		$(dir_cache) \
		$(dir_dist)  \
		$(dir_img_static)

## serve: start the development server
.PHONY: serve
serve:
	$(HUGO) server -D

## deploy-staging: deploy to staging
.PHONY: deploy-staging
deploy-staging:
	$(HUGO) deploy --target=staging --invalidateCDN

## deploy-production: deploy to production
.PHONY: deploy-production
deploy-production:
	$(HUGO) deploy --target=production --invalidateCDN

.PHONY: check
check: check-404
	node aws/edge-test.js
	@#echo "TODO: find unused css"
	@#echo "TODO: lint javascript"
	@#echo "TODO: validate html"

.PHONY: check-404
check-404:
	@wget                             \
		--spider                      \
		-r                            \
		--no-directories              \
		--no-verbose                  \
		http://localhost:1313/ 2>&1 | \
		grep 404                      \
		|| true

## help: display this help text
.PHONY: help
help:
	@cat $(makefile) | \
	sort             | \
	grep "^##"       | \
	sed 's/## //g'   | \
	column -t -s ':'
