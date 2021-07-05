/*
Navicat MySQL Data Transfer

Source Server         : simple-account-book
Source Server Version : 80021
Source Host           : localhost:3306
Source Database       : simple_account_book

Target Server Type    : MYSQL
Target Server Version : 80021
File Encoding         : 65001

Date: 2021-07-05 23:35:31
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for bill
-- ----------------------------
DROP TABLE IF EXISTS `bill`;
CREATE TABLE `bill` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `u_id` int unsigned NOT NULL COMMENT '用户id',
  `category_id` int unsigned NOT NULL COMMENT '类别id，对应category表',
  `category_type` smallint unsigned NOT NULL COMMENT '收入：0，支出1',
  `price` float unsigned NOT NULL COMMENT '价格',
  `bill_time` date NOT NULL COMMENT '记账时间',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `remark` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '' COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='明细表';
