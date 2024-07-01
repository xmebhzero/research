/*
*

	defer = Execute that function whatever happened

*
*/
package main

import (
	"errors"
	"fmt"
)

func logging() {
	fmt.Println("Log saved")
}

func runApp() error {
	return errors.New("Something went wrong")
}

func main() {
	defer logging()

	err := runApp()

	fmt.Println("Error: ", err.Error())
}
