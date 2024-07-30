package main

import (
	"fmt"
	"log"
	"net/http"
	"sync"
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
var mutex = &sync.Mutex{}

type Message struct {
	Username string `json:"username"`
	Content  string `json:"content"`
	IsLoading bool `json:"is_loading"`
}

// Data structures for SSE clients
type SSEClient struct {
	events chan string
}
var sseClients = make(map[*SSEClient]bool)
var sseMutex = &sync.Mutex{}

type AIResponse struct {
	Message string `json:"message"`
}

// Middleware to set CORS headers
func setCORSHeaders(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

// WebSocket Handler
func handleWebSocketConnections(w http.ResponseWriter, r *http.Request) {
	setCORSHeaders(w)

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
	defer ws.Close()

	mutex.Lock()
	clients[ws] = true
	mutex.Unlock()

	for {
		var msg Message
		
		err := ws.ReadJSON(&msg)
		if err != nil {
			log.Printf("error: %v", err)
			mutex.Lock()
			delete(clients, ws)
			mutex.Unlock()
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

// SSE Handler
func handleSSEConnections(w http.ResponseWriter, r *http.Request) {
	setCORSHeaders(w)
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "Streaming Unsupported!", http.StatusInternalServerError)
		return
	}

	client := &SSEClient{
		events: make(chan string),
	}

	sseMutex.Lock()
	sseClients[client] = true
	sseMutex.Unlock()

	defer func() {
		sseMutex.Lock()
		delete(sseClients, client)
		sseMutex.Unlock()
	}()

	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")

	dummyData := []string{
		"Dummy Data 1",
		"Dummy Data 2",
		"Dummy Data 3",
	}

	for _, data := range dummyData {
		fmt.Fprintf(w, "data: %s\n\n", data)
		flusher.Flush()
		time.Sleep(2 * time.Second)
	}

	// Keep the connection opn for further messages if needed
	for msg := range client.events {
		fmt.Fprintf(w, "data: %s\n\n", msg)
		flusher.Flush()
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
		wsConnection.WriteJSON(Message{IsLoading: false})

		// Send the response from AI Service
		aiMessage := Message{Username: "Chatbot", Content: aiResponse.Message, IsLoading: false}
		wsConnection.WriteJSON(aiMessage)
	})
}

func broadcastMessagesToAllClients() {
	for {
		msg := <-broadcast

		mutex.Lock()

		for client := range clients {
			err := client.WriteJSON(msg)
			if err != nil {
				log.Printf("error: %v", err)
				client.Close()
				delete(clients, client)
			}
			
			fmt.Println("=== Message broadcasted to a Client",)
		}

		mutex.Unlock()
	}
}

func main() {
	fs := http.FileServer(http.Dir("./public"))
	http.Handle("/", fs)

	http.HandleFunc("/ws", handleWebSocketConnections)
	http.HandleFunc("/sse", handleSSEConnections)

	// go broadcastMessagesToAllClients()

	log.Println("http server started on :8000")
	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}