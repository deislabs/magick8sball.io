REGISTRY ?= $(USER)
IMAGE ?= magick8sball
TAG ?= latest

build: jekyll-build
	docker build -t $(REGISTRY)/$(IMAGE):$(TAG) ./magick8sball
	docker build -t $(REGISTRY)/$(IMAGE).io:$(TAG) .

push: push-docker
	$(MAKE) REGISTRY=deislabs push-docker

push-docker: build
		docker push $(REGISTRY)/$(IMAGE):$(TAG)
		docker push $(REGISTRY)/$(IMAGE).io:$(TAG)

run:
	@echo "Go to http://localhost and shake the magick8sball"
	REGISTRY=$(REGISTRY) IMAGE=$(IMAGE) TAG=$(TAG) docker-compose up

jekyll-build:
	mkdir -p _site/
	mkdir -p vendor/bundle/
	docker run --rm \
		-p 4000:4000 \
		-v `pwd`:/srv/jekyll \
		-v `pwd`/vendor/bundle:/usr/local/bundle \
		jekyll/jekyll jekyll build

jekyll-watch:
	docker run -d \
		-p 4000:4000 \
		-v `pwd`:/srv/jekyll \
		-v `pwd`/vendor/bundle:/usr/local/bundle \
		jekyll/jekyll jekyll serve

deploy:
	az group deployment create -g magick8sball --template-file aci-hack.json
	az group deployment create -g magick8sball --template-file aci.json
