/*
Navicat MySQL Data Transfer

Source Server         : simple-account-book
Source Server Version : 80021
Source Host           : localhost:3306
Source Database       : simple_account_book

Target Server Type    : MYSQL
Target Server Version : 80021
File Encoding         : 65001

Date: 2021-07-05 23:35:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(32) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '用户创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '本条数据修改时间',
  `avatar` varchar(255) DEFAULT NULL,
  `expenditure_list` varchar(255) NOT NULL,
  `income_list` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
