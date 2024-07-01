package main

import "fmt"

func main() {
	/*
		Notes:
			1. Array in golang cannot be deleted, if it has 3 index, then it is 3 index
			2. If you need to modify the array, use data type Slice
	*/
	var array_string [3]string

	array_string[0] = "Satu"
	array_string[1] = "Dua"
	array_string[2] = "Tiga"

	fmt.Println(array_string)

	var array_number = [3]int8{
		1,
		2,
		// 3rd index will be default value for number, which is 0
	}

	fmt.Println(array_number)
	fmt.Println(len(array_number))

	// Array without defined length needs to be declared first! You can't set the value by array[index] = value
	var unknown_length = [...]int{
		11,
		12,
		13,
		14,
	}
	fmt.Println(unknown_length)
	fmt.Println(len(unknown_length))
}
