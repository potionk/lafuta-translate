-- MySQL dump 10.13  Distrib 8.0.18, for macos10.14 (x86_64)
--
-- Host: localhost    Database: lafuta_translate
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `name` varchar(30) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone_num` varchar(13) DEFAULT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES ('miral','qwe','dydtkd113@gmail.com','010-8033-5216'),('potion','pt123','potionkr@gmail.com','010-7726-7313'),('pt','asdf','potionkr@gmail.com','010-7726-7313');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bbs`
--

DROP TABLE IF EXISTS `bbs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bbs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `contents` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `writer_id` varchar(30) NOT NULL,
  `write_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `class` varchar(10) NOT NULL DEFAULT 'free',
  `views` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `b_writer_id_idx` (`writer_id`),
  CONSTRAINT `f_b_writer_id` FOREIGN KEY (`writer_id`) REFERENCES `account` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bbs`
--

LOCK TABLES `bbs` WRITE;
/*!40000 ALTER TABLE `bbs` DISABLE KEYS */;
INSERT INTO `bbs` VALUES (1,'테스트제목','테스트내용','potion','2020-02-25 19:48:58','free',2),(2,'유용상','원숭이','potion','2020-02-25 19:53:02','free',0),(3,'테스트!','안녕','potion','2020-02-25 22:20:03','free',1),(4,'테스트!','안녕','potion','2020-02-25 22:20:23','free',0),(5,'테스트!','안녕asdsf','potion','2020-02-25 22:25:29','free',3),(6,'시간test','안녕asdsf','potion','2020-02-25 22:33:36','free',4),(7,'시간test','안녕asdsf','potion','2020-02-26 07:35:21','free',0),(8,'시간test','안녕asdsf','potion','2020-02-26 07:36:43','free',176),(9,'asdaqwf','asfqwf','miral','2020-03-02 09:29:26','free',61),(10,'aseg','agqr','miral','2020-03-03 06:38:30','free',0),(11,'asegqeg','asrgasrg','miral','2020-03-03 06:39:44','free',44),(12,'test','test','miral','2020-03-03 07:45:38','free',5),(20,'test','test','miral','2020-03-03 08:19:54','free',3),(26,'test','test','miral','2020-03-10 06:42:13','free',0),(27,'test','test','miral','2020-03-10 06:42:17','free',0),(28,'test','test','miral','2020-03-10 06:42:21','free',2);
/*!40000 ALTER TABLE `bbs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `writer_id` varchar(30) DEFAULT NULL,
  `body_id` int(11) DEFAULT NULL,
  `contents` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `write_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `writer_id_idx` (`writer_id`),
  KEY `f_body_id_idx` (`body_id`),
  CONSTRAINT `f_body_id` FOREIGN KEY (`body_id`) REFERENCES `bbs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `f_c_writer_id` FOREIGN KEY (`writer_id`) REFERENCES `account` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (2,'potion',5,'helloworld','2020-02-26 08:16:58');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-16 15:31:16
