package util

import (
	"github.com/joho/godotenv"
	"log"
	"os"
)

func EnvInit() {
	mode := os.Getenv("FOO_ENV")
	if "production" == mode {
		mode = "prod"
	} else {
		mode = "dev"
	}
	//load common env
	LoadEnvFile(".env")
	//load environment env
	LoadEnvFile(mode + ".env")
}

// LoadEnvFile please put env file in /envs directory before using this func
func LoadEnvFile(fileName string) {
	envFile, err := os.Open("envs/" + fileName)
	if err != nil {
		log.Fatal(err)
	}
	envMap, err := godotenv.Parse(envFile)
	if err != nil {
		log.Fatal(err)
	}
	for k, v := range envMap {
		err := os.Setenv(k, v)
		if err != nil {
			log.Fatal(err)
		}
	}
}
