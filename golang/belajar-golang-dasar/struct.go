package main

import "fmt"

type Customer struct {
	Name, Address string
	Age           int
}

// This method is only accessible from Customer struct
func (customer Customer) sayHelloToCustomer() {
	fmt.Println("Hello, Customer: ", customer.Name)
}

func main() {
	var new_customer_1 Customer

	new_customer_1.Name = "John Doe"
	new_customer_1.Address = "USA"
	new_customer_1.Age = 30

	fmt.Println("Customer 1", new_customer_1)

	new_customer_2 := Customer{
		Name:    "Jane Doe",
		Address: "Europe",
		Age:     35,
	}

	fmt.Println("Customer 2", new_customer_2)

	new_customer_1.sayHelloToCustomer()
}
