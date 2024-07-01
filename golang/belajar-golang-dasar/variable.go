package main

import "fmt"

func main() {
	var full_name string = "Mochamad Ekabudi Harjanto"
	fmt.Println(full_name)

	var full_name_2 = "Mochamad Ekabudi Harjanto"
	fmt.Println(full_name_2)

	full_name_3 := "Mochamad Ekabudi Harjanto"
	fmt.Println(full_name_3)

	var (
		multi_1 = "value 1"
		multi_2 = "value 2"
	)
	fmt.Println(multi_1)
	fmt.Println(multi_2)

	const const_1 = "You can't change me"
	fmt.Println(const_1)

	var nilai_32 int32 = 32768

	var nilai_64 int64 = int64(nilai_32)
	fmt.Println(nilai_64)

	var nilai_16 int16 = int16(nilai_32) // Will rollback to min value, because of overflow
	fmt.Println(nilai_16)

}
