
import React,{Component} from 'react';

import HeaderContent from '../../components/HeaderContent'
import Menus from '../../components/Menus'
import List from '../../components/List'

import { Layout } from 'antd';

import './index.css'

const { Header, Footer, Sider, Content } = Layout;

export default class index extends Component {
  render() {
      return(
        <>
            <Layout>
              <Header className='headerContainer'>
                <HeaderContent/>
              </Header>
              <Layout>
                <Sider>
                   <Menus/>
                </Sider>
                <Content>
                   <List/>
                </Content>
              </Layout>
            </Layout>
        </>
      )
       
  }
}
