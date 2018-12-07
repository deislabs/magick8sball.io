package main

import (
	"encoding/json"
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
	w.Header().Set("Access-Control-Allow-Origin", "*")

	i := rand.Intn(len(Replies))
	reply := Replies[i]
	bytes, err := json.Marshal(reply)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(bytes)
}
