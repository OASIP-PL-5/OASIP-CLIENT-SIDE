
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


CREATE SCHEMA IF NOT EXISTS `OASIP` DEFAULT CHARACTER SET utf8 COLLATE utf8_czech_ci ;
USE `OASIP` ;


CREATE TABLE IF NOT EXISTS `OASIP`.`EVENT_CATEGORY` (
  `eventCategoryId` INT(3) NOT NULL,
  `eventCategoryName` VARCHAR(100) NOT NULL,
  `eventCategoryDescription` VARCHAR(500) NULL,
  `eventDuration` INT(3) NOT NULL,
  PRIMARY KEY (`eventCategoryId`),
  UNIQUE INDEX `eventCategoryName_UNIQUE` (`eventCategoryName` ASC) VISIBLE)
ENGINE = InnoDB;



CREATE TABLE IF NOT EXISTS `OASIP`.`EVENT` (
  `bookingId` INT(11) NOT NULL AUTO_INCREMENT,
  `bookingName` VARCHAR(50) NOT NULL,
  `bookingEmail` VARCHAR(50) NOT NULL,
  `eventCategoryId` INT(3) NOT NULL,
  `eventCategory` VARCHAR(100) NOT NULL,
  `eventStartTime` DATETIME NOT NULL,
  `eventDuration` INT(3) NOT NULL,
  `eventNotes` VARCHAR(500) NULL,
  PRIMARY KEY (`bookingId`),
  UNIQUE INDEX `bookingName_UNIQUE` (`bookingName` ASC) VISIBLE,
  UNIQUE INDEX `eventStartTime_UNIQUE` (`eventStartTime` ASC) VISIBLE,
  INDEX `fk_EVENT_EVENT_CATEGORY_idx` (`eventCategoryId` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


insert into event_category 
values(221,'Project Management Clinic',
'ตารางนัดหมายนี้ใชสำหรับนัดหมาย project management clinic ในวิชา INT221 integrated project I ให้นักศึกษาเตรียมเอกสารที่เกี่ยวข้องเพื่อแสดงระหว่างขอคำปรึกษา',30);

insert into event_category 
values(209,'DevOps/Infra Clinic','Use this event category for DevOps/Infra clinic.',20);

insert into event_category 
values(206,'Database Clinic','ตารางนัดหมายนี้ใช้สำหรับนัดหมาย database clinic ในวิชา INT221 integrated project I',15);

insert into event_category 
values(203,'Client-side Clinic','ตารางนัดหมายนี้ใช้สำหรับนัดหมาย client-side clinic ในวิชา INT221 integrated project I',30);

insert into event_category 
values(204,'Server-side Clinic',null,30);



insert into event (bookingName,bookingEmail,eventStartTime,eventDuration,eventNotes,eventCategoryId,eventCategory)
values('Somchai Jaidee(OR-7)','somchai.jai@mail.kmutt.ac.th','2022-05-23 13.30',30,null,209,'DevOps/Infra Clinic');

insert into event (bookingName,bookingEmail,eventStartTime,eventDuration,eventNotes,eventCategoryId,eventCategory)
values('Somsri Rakdee(SJ-3)','somsri.rak@mail.kmutt.ac.th','2022-04-27 09.30',30,'ชอปรึกษาปัญหาเพื่อนไม่ช่วยงาน','221','Project Management Clinic');

insert into event (bookingName,bookingEmail,eventStartTime,eventDuration,eventNotes,eventCategoryId,eventCategory)
values('สมเกียรติ ขยันเรียน กลุ่ม TT-4','somkiat.kay@kmutt.ac.th','2022-05-23 16.30',15,null,'206','Database Clinic');

insert into event (bookingName,bookingEmail,eventStartTime,eventDuration,eventNotes,eventCategoryId,eventCategory)
values('สมปอง ขยันนอน กลุ่ม TT-5','sompong.kay@kmutt.ac.th','2022-05-23 17.30',15,'อยากคุยเล่นกับอาจารย์เฉยๆครับ','203','Client-side Clinic');

insert into event (bookingName,bookingEmail,eventStartTime,eventDuration,eventNotes,eventCategoryId,eventCategory)
values('วิว วาริดชัย','sompong.kay@kmutt.ac.th','2022-04-27 10.00',15,'อยากคุยเล่นกับอาจารย์เฉยๆครับ','204','Server-side Clinic');