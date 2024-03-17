create database labour_crud;

CREATE TABLE `labour_crud`.`labour_details` (
  `labour_id` VARCHAR(50),
  `name` VARCHAR(100) NULL,
  `age` INT NULL,
  `phone_number` VARCHAR(45) NULL,
  `bank_account_number` VARCHAR(60) NULL,
  `role` VARCHAR(100) NULL,
  PRIMARY KEY (`labour_id`)
);