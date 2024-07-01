package main

import "fmt"

// Interface is a contract, not implementation
// The implementation of CustomerInterface is inside Customer struct
type CustomerInterface interface {
	GetName() string
}

type Customer struct {
	Name string
}

// This function is an implementation of CustomerInterface
// Which means, Customer struct is an implementation of CustomerInterface
func (customer Customer) GetName() string {
	return customer.Name
}

func SayHello(customerInterface CustomerInterface) {
	fmt.Println("Hello, ", customerInterface.GetName())
}

func main() {
	new_customer_1 := Customer{
		Name: "John Doe",
	}

	SayHello(new_customer_1)
}
