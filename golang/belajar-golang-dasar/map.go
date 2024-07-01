package main

import "fmt"

func main() {
	// map[keyType]valueType
	book := make(map[string]string)
	book["title"] = "Buku Ganteng"
	book["author"] = "Mochamad Ekabudi Harjanto"
	book["publishDate"] = "2000-01-01"

	fmt.Println("book:", book)

	// Deleting key
	book["wrongData"] = "Ups"
	delete(book, "wrongData")
}
