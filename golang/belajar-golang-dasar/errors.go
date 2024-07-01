package main

import (
	"errors"
	"fmt"
)

var (
	ValidationError = errors.New("Validation Error")
	NotFoundError   = errors.New("Not Found")
)

func GetById(id string) error {
	if id == "" {
		return ValidationError
	}

	if id != "eka" {
		return NotFoundError
	}

	return nil
}

func FormatTheError(err error) {
	if errors.Is(err, ValidationError) {
		fmt.Println("Terjadi kesalahan validasi")
	} else if errors.Is(err, NotFoundError) {
		fmt.Println("ID tidak ditemukan")
	} else {
		fmt.Println("Error tidak diketahui")
	}
}

func main() {
	err := GetById("ganteng")
	if err != nil {
		FormatTheError(err)
	}

	err = GetById("")
	if err != nil {
		FormatTheError(err)
	}

	err = GetById("eka")
	if err != nil {
		FormatTheError(err)
	}

	fmt.Println("GetById success!")
}
