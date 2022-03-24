import React, { Component } from 'react'
import './index.css'
import PubSub from 'pubsub-js'
import { Input } from 'antd';
import {
    HomeOutlined,
    MenuUnfoldOutlined,
    SearchOutlined,
    PlusOutlined,
    BellOutlined
    
  } from '@ant-design/icons';

export default class index extends Component {
  render() {
    return (
        <>
            <div className='headerFlexBox'>
                <div className='leftBox'>
                <MenuUnfoldOutlined  style={{color:'#fff',fontSize:"20px",marginRight:'15px'}} />
                <HomeOutlined  style={{color:'#fff',fontSize:"20px",marginRight:'15px'}}/>
                <Input allowClear placeholder="搜索" style={{width:'260px'}} onPressEnter={this.onPressEnter} />
                </div>
                <div className='rightBox'>
                    <PlusOutlined  style={{color:'#fff',fontSize:"20px",marginRight:'15px'}}/>
                    <BellOutlined  style={{color:'#fff',fontSize:"20px",marginRight:'15px'}}/>
                </div>
            </div>
        </>
    )
  }
  onPressEnter = e =>{
    let keyWord = e.target.value
    let todoList = sessionStorage.getItem('todo')? JSON.parse(sessionStorage.getItem('todo')):[]
    let res = todoList.filter(item=>{
      return   item.todoTitl.indexOf(keyWord)!= -1 || item.todoContent.indexOf(keyWord)!= -1 || item.time.indexOf(keyWord)!= -1
    })
    console.log(res);
    PubSub.publish('dataListMsg', res) //发布消息
  }
}
