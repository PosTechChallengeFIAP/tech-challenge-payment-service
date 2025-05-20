provider "aws" {
  region = "us-west-2"
}

terraform {
  backend "s3" {
    bucket = "tech-challenge-tf-state-bucket-m7ppr"
    key    = "payment-service/terraform.tfstate"
    region = "us-west-2"
    encrypt = true
  }
}