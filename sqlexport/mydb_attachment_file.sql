-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `attachment_file`
--

DROP TABLE IF EXISTS `attachment_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attachment_file` (
  `id` int NOT NULL AUTO_INCREMENT,
  `photoId` int NOT NULL,
  `fileName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` timestamp(1) NULL DEFAULT NULL,
  `updatedAt` timestamp(1) NULL DEFAULT NULL,
  `isDelete` tinyint DEFAULT NULL,
  `path` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attachment_file`
--

LOCK TABLES `attachment_file` WRITE;
/*!40000 ALTER TABLE `attachment_file` DISABLE KEYS */;
INSERT INTO `attachment_file` VALUES (3,4,'a1d5c728f38d8a04888084cf2c874c3a','2022-07-14 03:58:41.0',NULL,NULL,''),(4,5,'58d96b6c20f4acdeeb1e2bdea3f7922c','2022-07-14 08:47:44.4',NULL,NULL,''),(5,6,'shop detail.png-2998','2022-07-14 09:19:31.8',NULL,NULL,''),(6,7,'8cb8-shop detail.png','2022-07-14 09:20:52.1',NULL,NULL,''),(7,9,'4824-shop detail.png','2022-07-14 09:31:00.2',NULL,NULL,'upload\\imgPhoto\\4824-shop detail.png');
/*!40000 ALTER TABLE `attachment_file` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-14 16:32:06
