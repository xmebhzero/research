/*
*

	Type is an alias for an existing variable type

*
*/
package main

import "fmt"

func main() {
	type FirstNameType string

	var namaUser1 FirstNameType = "User 1"
	fmt.Println(namaUser1)

	var namaUser2 FirstNameType = "User 2"
	fmt.Println(namaUser2)
}
