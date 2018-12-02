REGISTRY ?= $(USER)
IMAGE ?= magick8sball
TAG ?= latest

build:
	docker build -t $(REGISTRY)/$(IMAGE):$(TAG) ./magick8sball

push: build
	docker push $(REGISTRY)/$(IMAGE):$(TAG)

run:
	@echo "Use curl http://localhost:8080 to shake the magick8sball"
	docker run -it --rm -p 8080:80 $(REGISTRY)/$(IMAGE):$(TAG)

serve:
	docker run -v `pwd`:/srv/jekyll --rm -it -p 4000:4000 jekyll/jekyll jekyll serve

deploy:
	az container create -g magick8sball --name magick8sball --image $(REGISTRY)/$(IMAGE):$(TAG) --cpu 1 --memory 1 --dns-name-label magick8sball --ports 80
