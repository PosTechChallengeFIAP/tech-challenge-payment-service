variable "db_username" {
  description = "The username for the database"
  type        = string
}

variable "db_password" {
  description = "The password for the database"
  type        = string
}

variable "tc_image_tag" {
  description = "Tag for the docker image"
  type        = string
}

variable "aws_access_key_id" {
  description = "AWS Access Key"
  type        = string
}

variable "aws_secret_access_key" {
  description = "AWS Secret Access Key"
  type        = string
}

variable "aws_session_token" {
  description = "AWS Session Token"
  type        = string
}

variable "aws_bucket_name" {
  description = "Bucket name for S3"
  type        = string
}