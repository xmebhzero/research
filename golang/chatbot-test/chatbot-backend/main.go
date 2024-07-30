package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

var clients = make(map[*websocket.Conn]bool)
var broadcast = make(chan Message)

type Message struct {
	Username string `json:"username"`
	Content  string `json:"content"`
	IsLoading bool `json:"is_loading"`
}

type AIResponse struct {
	Message string `json:"message"`
}

func handleConnections(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
	defer ws.Close()

	clients[ws] = true

	for {
		var msg Message
		
		err := ws.ReadJSON(&msg)
		if err != nil {
			log.Printf("error: %v", err)
			delete(clients, ws)
			break
		}
		// broadcast <- msg

		fmt.Println("=== Received message: ", msg)

		// Write sent message back to the sender
		ws.WriteJSON(msg)

		// Tell the sender to render loading indicator
		ws.WriteJSON(Message{IsLoading: true})

		// Get AI Response and send it to the sender
		relayMessageToAIService(ws, msg)
	}
}

func getMessageFromAIService(msg string) AIResponse {
	// TODO: Connect to AI Service
	response := AIResponse{
		Message: "TODO: Connect to AI Service",
	}
	
	return response
}

func relayMessageToAIService(wsConnection *websocket.Conn, msg Message) {
	time.AfterFunc(5*time.Second, func() {
		aiResponse := getMessageFromAIService(msg.Content)

		// Tell the sender to stop loading indicator
		wsConnection.WriteJSON(Message{IsLoading: true})

		// Send the response from AI Service
		aiMessage := Message{Username: "Chatbot", Content: aiResponse.Message}
		wsConnection.WriteJSON(aiMessage)
	})
}

func broadcastMessagesToAllClients() {
	for {
		msg := <-broadcast

		for client := range clients {
			err := client.WriteJSON(msg)
			if err != nil {
				log.Printf("error: %v", err)
				client.Close()
				delete(clients, client)
			}
			fmt.Println("=== Message broadcasted to a Client",)
		}
	}
}

func main() {
	fs := http.FileServer(http.Dir("./public"))
	http.Handle("/", fs)

	http.HandleFunc("/ws", handleConnections)

	// go broadcastMessagesToAllClients()

	log.Println("http server started on :8000")
	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}