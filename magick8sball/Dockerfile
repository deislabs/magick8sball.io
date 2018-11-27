FROM golang:1.11-alpine

EXPOSE 80
ENV GO111MODULE=on
WORKDIR /go/src/magick8sball
COPY . .

RUN CGO_ENABLED=0 go install -a -tags netgo .

CMD ["magick8sball"]
