/*
Navicat MySQL Data Transfer

Source Server         : simple-account-book
Source Server Version : 80021
Source Host           : localhost:3306
Source Database       : simple_account_book

Target Server Type    : MYSQL
Target Server Version : 80021
File Encoding         : 65001

Date: 2021-08-05 23:39:07
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
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8 COMMENT='记账类别';

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', '1', '服饰', 'fushi', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:36');
INSERT INTO `category` VALUES ('2', '1', '餐饮', 'canyin', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:36');
INSERT INTO `category` VALUES ('3', '1', '水果', 'shuiguo', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:36');
INSERT INTO `category` VALUES ('4', '1', '蔬菜', 'shucai', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:36');
INSERT INTO `category` VALUES ('5', '1', '零食', 'lingshi', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:36');
INSERT INTO `category` VALUES ('6', '1', '茶', 'cha', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:36');
INSERT INTO `category` VALUES ('7', '1', '烟酒', 'yanjiu', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:36');
INSERT INTO `category` VALUES ('8', '1', '住房', 'zhufang', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:36');
INSERT INTO `category` VALUES ('9', '1', '水费', 'shuifei', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:36');
INSERT INTO `category` VALUES ('10', '1', '电费', 'dianfei', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:36');
INSERT INTO `category` VALUES ('11', '1', '网费', 'wangluo', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:36');
INSERT INTO `category` VALUES ('12', '1', '缴费', 'jiaofei', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:36');
INSERT INTO `category` VALUES ('13', '1', '共享单车', 'zixingche', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:36');
INSERT INTO `category` VALUES ('14', '1', '打车', 'chuzuche', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:36');
INSERT INTO `category` VALUES ('15', '1', '公交', 'gongjiao', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:36');
INSERT INTO `category` VALUES ('16', '1', '地铁', 'ditie', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:36');
INSERT INTO `category` VALUES ('17', '1', '火车', 'huoche', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:36');
INSERT INTO `category` VALUES ('18', '1', '飞机', 'jipiao', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:36');
INSERT INTO `category` VALUES ('19', '1', '旅行', 'lvxing', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:36');
INSERT INTO `category` VALUES ('20', '1', '淘宝', 'taobao', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:36');
INSERT INTO `category` VALUES ('21', '1', '购物', 'gouwu', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:36');
INSERT INTO `category` VALUES ('22', '1', '京东', 'jingdong', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:36');
INSERT INTO `category` VALUES ('23', '1', '数码', 'shuma', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:36');
INSERT INTO `category` VALUES ('24', '1', '游戏', 'game', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:36');
INSERT INTO `category` VALUES ('25', '1', 'steam', 'steam', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:36');
INSERT INTO `category` VALUES ('26', '1', 'uplay', 'uplay', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('27', '1', 'wegame', 'wegame', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('28', '1', 'gog', 'gog', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('29', '1', 'epic', 'epic', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('30', '1', 'origin', 'origin', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('31', '1', '超市', 'chaoshi', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('32', '1', '日用品', 'riyongpin', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('33', '1', '话费', 'huafei', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('34', '1', '居家', 'jujia', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('35', '1', '汽车', 'qiche', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('36', '1', '维修', 'weixiu', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('37', '1', '运动', 'yundong', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('38', '1', '美容', 'meirong', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('39', '1', '书籍', 'shuji', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('40', '1', '学习', 'xuexi', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('41', '1', '医疗', 'yiliao', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('42', '1', '其它', 'qita', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('43', '1', '孩子', 'haizi', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('44', '1', '长辈', 'zhangbei', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('45', '1', '宠物', 'chongwu', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('46', '1', '亲友', 'qinyou', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('47', '1', '社交', 'shejiao', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('48', '1', '礼金', 'lijin', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('49', '1', '礼物', 'liwu', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('50', '1', '捐赠', 'juanzeng', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('51', '1', '转账', 'zhuanzhang', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('52', '1', '办公', 'bangong', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('53', '1', '彩票', 'caipiao', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('54', '1', '快递', 'truck', '1', null, '2021-02-02 15:25:32', '2021-02-02 13:42:37');
INSERT INTO `category` VALUES ('55', '0', '工资', 'gongzi', '1', null, '2021-02-02 15:25:32', '2021-02-02 14:13:39');
INSERT INTO `category` VALUES ('56', '0', '闲鱼', 'xianyu', '1', null, '2021-02-02 15:25:32', '2021-02-02 14:13:39');
INSERT INTO `category` VALUES ('57', '0', '理财', 'licai', '1', null, '2021-02-02 15:25:32', '2021-02-02 14:13:39');
INSERT INTO `category` VALUES ('58', '0', '红包', 'lijin', '1', null, '2021-02-02 15:25:32', '2021-02-02 14:13:39');
INSERT INTO `category` VALUES ('59', '0', '兼职', 'jianzhi', '1', null, '2021-02-02 15:25:32', '2021-02-02 14:13:39');
INSERT INTO `category` VALUES ('60', '0', '其它', 'qita', '1', null, '2021-02-02 15:25:32', '2021-02-02 14:13:39');

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

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', '3ca99a99b0e17b484e9f7ed4f918c8b7', '2020-10-26 15:39:29', '2021-02-06 22:33:50', 'https://gss0.baidu.com/7Ls0a8Sm2Q5IlBGlnYG/sys/portraith/item/tb.1.5a912336.uIKsk7ffUp6g52GYtgHywA?t=1490862224', '4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57', '58,59,60,61,62,63');
