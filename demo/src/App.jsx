import React from 'react';
import { HashRouter as Router } from 'react-router-dom'
import { Layout, Row, Col, BackTop, Icon, Avatar} from 'antd';
import './App.css'
import ZLMenu from './component/menu/menu';
import menuConfig from './config/menu';
import ZLBreadcrumb from './component/breadcrumb/Breadcrumb';
import LZRoute from './router/route';

const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = React.useState(false)
  return (
    <div className="App">
      <Router>
        <Layout style={{height:'100%'}}>
          <Sider
            trigger={null}
            collapsible
            className="sider_style"
            collapsed={collapsed}>
            <Row className="logo_container">
              <a href="/">
                <span className="logo_title">Logger</span>
              </a>
            </Row>
            <Row>
              <ZLMenu menuList={menuConfig}></ZLMenu>
            </Row>
          </Sider>
          <Layout>
            <Header style={{ backgroundColor: '#fff' }}>
              <Row align='middle' type='flex'>
                <Col span={1}>
                  <Icon
                    className="trigger"
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={() => setCollapsed(!collapsed)}
                  />
                </Col>
                <Col span={22}>
                  <ZLBreadcrumb />
                </Col>
                <Col span={1}>
                  <Avatar size="large">管理员</Avatar>
                </Col>
              </Row>
            </Header>
            <Content
              style={{
                padding: 24,
                flex: 1,
                background: '#fff',
              }}
            >
              <LZRoute></LZRoute>
            </Content>
          </Layout>
        </Layout>
      </Router>
      <BackTop visibilityHeight="200" />
    </div>
  );
}

export default App;
