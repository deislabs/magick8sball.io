package main

import (
	"log"
	"math/rand"
	"net/http"
	"time"
)

func main() {
	rand.Seed(time.Now().UnixNano())
	log.Println("Magic K8s Ball is ready for your questions 🎩✨")
	log.Fatal(http.ListenAndServe("0.0.0.0:8080", http.HandlerFunc(shakeThat)))
}

func shakeThat(w http.ResponseWriter, r *http.Request) {
	i := rand.Intn(len(Replies))
	reply := Replies[i]

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(reply))
}
