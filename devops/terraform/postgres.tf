resource "aws_db_instance" "postgres" {
  identifier               = "tech-challenge-payment-service-pg"
  engine                   = "postgres"
  engine_version           = "16.4"
  instance_class           = "db.t3.micro"
  allocated_storage        = 20
  db_name                  = "TechChallengePayment"
  username                 = var.db_username
  password                 = var.db_password
  db_subnet_group_name     = data.terraform_remote_state.network.outputs.postgres_subnet_group_name
  vpc_security_group_ids   = [data.terraform_remote_state.network.outputs.postgres_sg_id]
  skip_final_snapshot      = true
  backup_retention_period  = 0
  delete_automated_backups = true
  multi_az                 = false
  auto_minor_version_upgrade = false
  monitoring_interval      = 0

  tags = {
    Name = "tech-challenge-payment-service-pg"
  }
}