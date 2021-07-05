/*
Navicat MySQL Data Transfer

Source Server         : simple-account-book
Source Server Version : 80021
Source Host           : localhost:3306
Source Database       : simple_account_book

Target Server Type    : MYSQL
Target Server Version : 80021
File Encoding         : 65001

Date: 2021-07-05 23:35:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `category_type` tinyint unsigned NOT NULL COMMENT '收入0\n支出 1',
  `title` varchar(20) NOT NULL COMMENT '类别名称',
  `icon` varchar(60) NOT NULL COMMENT 'icon名称',
  `is_default` tinyint unsigned NOT NULL DEFAULT '0' COMMENT '是否为默认类别\n否 0\n是 1',
  `pid` int unsigned DEFAULT NULL COMMENT '创建者',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '上次更新时间',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='记账类别';
