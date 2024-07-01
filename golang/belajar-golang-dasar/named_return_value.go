package main

import "fmt"

/*
*

	firstName, middleName and lastName is already declared as return value
	Notice we don't have to specify the variable when returning

*
*/
func getCompleteName() (firstName, middleName, lastName string) {
	firstName = "Mochamad"
	middleName = "Ekabudi"
	lastName = "Hardjanto"

	return
}

func main() {
	// We don't have to follow the same variable names as the one in named return values
	firstName, middleName, lastName := getCompleteName()

	fmt.Println(firstName)
	fmt.Println(middleName)
	fmt.Println(lastName)
}
