data "terraform_remote_state" "network" {
  backend = "s3"
  config = {
    bucket = "tech-challenge-tf-state-bucket-m7ppr"
    key    = "network/terraform.tfstate"
    region = "us-west-2"
  }
}

data "aws_iam_role" "lab_role" {
  name = "LabRole"
}