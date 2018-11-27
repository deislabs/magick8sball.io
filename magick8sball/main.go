package main

import (
	"log"
	"math/rand"
	"net/http"
	"time"
)

func main() {
	rand.Seed(time.Now().UnixNano())
	log.Fatal(http.ListenAndServe("127.0.0.1:8080", http.HandlerFunc(shakeThat)))
}

func shakeThat(w http.ResponseWriter, r *http.Request) {
	i := rand.Intn(len(Replies))
	reply := Replies[i]

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(reply))
}
