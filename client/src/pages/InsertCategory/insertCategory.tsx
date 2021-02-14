import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";

import useForm from 'rc-form-hooks';
/** components */
import {
  List,
  InputItem,
  Button,
  Toast
} from "antd-mobile";
import NavBar from '../../components/NavBar'

/** style */
import './style.scss';

interface ILocalState {
  type?: '支出' | '收入';
}

const iconList = [
  {
    title: '娱乐',
    list: [
      'shuma',
      'game',
      'steam',
      'uplay',
      'wegame',
      'gog',
      'epic',
      'origin'
    ]
  },
  {
    title: '饮食',
    list: [
      'canyin',
      'shuiguo',
      'shucai',
      'lingshi',
      'cha',
      'yanjiu'
    ]
  },
  {
    title: '医疗',
    list: [
      'yiliao'
    ]
  },
  {
    title: '学习',
    list: [
      'shuji',
      'xuexi'
    ]
  },
  {
    title: '交通',
    list: [
      'zixingche',
      'chuzuche',
      'gongjiao',
      'ditie',
      'huoche',
      'jipiao',
      'qiche',
      'truck'
    ]
  },
  {
    title: '购物',
    list: [
      'fushi',
      'gouwu',
      'taobao',
      'jingdong',
      'xianyu',
      'chaoshi',
      'riyongpin',
      'liwu'
    ]
  },
  {
    title: '生活',
    list: [
      'shuifei',
      'dianfei',
      'wangluo',
      'huafei',
      'meirong',
      'lvxing'
    ]
  },
  {
    title: '家居',
    list: [
      'zhufang',
      'jujia',
      'weixiu'
    ]
  },
  {
    title: '家庭',
    list: [
      'haizi',
      'zhangbei',
      'chongwu',
      'qinyou'
    ]
  },
  {
    title: '健身',
    list: [
      'yundong'
    ]
  },
  {
    title: '办公',
    list: [
      'bangong'
    ]
  },
  {
    title: '其它',
    list: [
      'jiaofei',
      'qita',
      'shejiao',
      'lijin',
      'juanzeng',
      'zhuanzhang',
      'caipiao',
      'gongzi',
      'licai',
      'jianzhi'
    ]
  }
]

const InsertCategory = () => {
  const history = useHistory();
  const location = useLocation<ILocalState>();

  const state = location.state;

  useEffect(() => {
    if (!state || !state.type) {
      history.replace('/');
    }
  })

  const [currentIcon, setCurrentIcon] = useState(iconList[0].list[0]);

  const [categoryType] = useState<0 | 1>(state.type === '收入' ? 0 : 1);

  const {
    getFieldDecorator,
    getFieldError,
    validateFields
  } = useForm<{
    title: string;
  }>();

  async function handlerSave(e: React.FormEvent) {
    e.preventDefault();
    try {
      const result = await validateFields();
      const { title } = result;

      const params = {
        title,
        categoryType,
        icon: currentIcon
      }

      console.log('params: ', params);

    } catch (err) {
      Toast.fail(err.message);
    }
  }

  return (
    <div className="insert-category">
      <NavBar style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 5 }}>新增类别</NavBar>
      <List style={{ position: 'fixed', top: 45, left: 0, width: '100%', zIndex: 5 }}>
        {
          getFieldDecorator('title', {
            initialValue: '',
            rules: [
              {required: true, message: '必须输入类别名称'},
              {type: 'string', min: 1, max: 4, message: '类别名称不要超过四个汉字'}
            ]
          })(
            <InputItem
              clear
              placeholder="类别名称(不超过四个汉字)"
              error={getFieldError('title').length > 0}
            >类别名称</InputItem>
          )
        }
      </List>

      <ul className="icon-list-wrapper">
        {iconList.map(i => (
          <li key={i.title} className="icon-list-item">
            <h3 className="icon-title">{i.title}</h3>
            <ul className="icon-list">
              {
                i.list.map(icon => (
                  <li
                    key={icon}
                    className={`icon-item ${currentIcon === icon ? 'active' : ''}`}
                    onClick={() => { setCurrentIcon(icon) }}
                  >
                    <span className={`icon iconfont icon-${icon}`}></span>
                  </li>
                ))
              }
            </ul>
          </li>
        ))}
      </ul>

      <div className="save-btn-wrapper">
        <Button 
          type="primary" 
          style={{ borderRadius: 0 }}
          onClick={handlerSave}
        >保存</Button>
      </div>
    </div>
  )
}

export default InsertCategory;
