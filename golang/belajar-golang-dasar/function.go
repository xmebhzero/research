package main

import "fmt"

func sayHello(name string) {
	fmt.Println("Hello ", name)
}

// Returning multiple values
func getFullName() (string, string) {
	return "Mochamad Ekabudi", "Harjanto"
}

// Variadic function
func sumAll(numbers ...int) int {
	total := 0

	for _, number := range numbers {
		total += number
	}

	return total
}

// Function as parameter
func sayHelloWithFilter(name string, filterFunc func(string) string) {
	filteredName := filterFunc(name)

	fmt.Println("Hello,", filteredName)
}

func spamFilter(name string) string {
	if name == "Anjing" {
		return "..."
	} else {
		return name
	}
}

func main() {
	sayHello("Eka")

	// You can ignore the returned value by using _
	// For example
	// firstName, _ := getFullName()
	firstName, lastName := getFullName()
	fmt.Println(firstName)
	fmt.Println(lastName)

	total := sumAll(9, 8, 7, 6, 5, 4)
	fmt.Println(total)

	sayHelloAsVariable := sayHello
	sayHelloAsVariable("Ekabudi")

	sayHelloWithFilter("Anjing", spamFilter)
}
