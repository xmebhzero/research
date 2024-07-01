package main

import "fmt"

func main() {
	days := [...]string{"Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Minggu"}

	// Declaring slice
	weekends := days[5:]
	weekends[0] = "Sabtu (Baru)"
	weekends[1] = "Minggu (Baru)"

	// Notice that the value of 'days' are also changed
	fmt.Println("days:", days)

	// Adding new value "Libur Tambahan" into existing array
	// This will create new array
	weekends2 := append(weekends, "Libur Tambahan")
	fmt.Println("weekends2:", weekends2)

	// Create new array with length=2 and capacity=5
	newSlice := make([]string, 2, 5)
	newSlice[0] = "satu"
	newSlice[1] = "dua"
	fmt.Println("newSlice:", newSlice)

	// We're not creating new array, instead we're just adding more value to the existing newSlice array
	// This happens because newSlice has 5 capacity
	appended_newSlice := append(newSlice, "tiga")
	fmt.Println(appended_newSlice)

	// Copying Slice
	copied_newSlice := make([]string, len(appended_newSlice), cap(appended_newSlice))
	copy(copied_newSlice, appended_newSlice)
	fmt.Println(copied_newSlice)

	iniArray1 := [...]int{1, 2, 3, 4, 5}
	iniArrayJuga := [5]int{1, 2, 3, 4, 5}
	iniSlice := []int{1, 2, 3, 4, 5}
}
