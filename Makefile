REGISTRY ?= $(USER)
IMAGE ?= magick8sball
TAG ?= latest

build:
	docker build -t $(REGISTRY)/$(IMAGE):$(TAG) ./magick8sball

push: build
	docker push $(REGISTRY)/$(IMAGE):$(TAG)

run:
	@echo "Use curl http://localhost to shake the magick8sball"
	docker run -it --rm -p 8080:8080 $(REGISTRY)/$(IMAGE):$(TAG)

caddy:
	docker run --rm -it --name caddy \
	  -p 80:80 \
	  -v `pwd`/magick8sball/Caddyfile:/etc/Caddyfile \
	  -v `pwd`/.caddy:/root/.caddy \
	  abiosoft/caddy

serve:
	docker run --rm -it --name jekyll \
		-p 4000:4000 \
		-v `pwd`:/srv/jekyll \
		-v `pwd`/vendor/bundle:/usr/local/bundle \
		jekyll/jekyll jekyll serve --config _config.yml,_config.dev.yml

deploy:
	az container create -g magick8sball --name magick8sball --image $(REGISTRY)/$(IMAGE):$(TAG) --cpu 1 --memory 1 --dns-name-label magick8sball --ports 80
