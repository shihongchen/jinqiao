import React, { Component } from 'react'
import { Menu } from 'antd';
import {
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
  } from '@ant-design/icons';
export default class index extends Component {
  render() {
    return (
     <>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          style={{ width: 200 }}
        >
          <Menu.Item  key="1" icon={<PieChartOutlined />}>收件箱</Menu.Item>
          <Menu.Item  key="2" icon={<DesktopOutlined />}>今天</Menu.Item>
          <Menu.Item  key="3" icon={<ContainerOutlined />}>预览</Menu.Item>
          <Menu.Item  key="4" icon={<ContainerOutlined />}>过滤器&标签</Menu.Item>
          </Menu>
     </>
    )
  }
}
