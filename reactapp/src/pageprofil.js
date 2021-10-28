

import {
    Button,
    Layout,
    Menu,
    Breadcrumb,
    Image,
    Card,
    Avatar,
    Divider,
    Row,
    Col,
    Tabs,
    List,
    Space,
    Tag,
    BackTop,
    Badge,
    Modal,
    Carousel,
  } from "antd";

  import EnTete from "./EnTete";
import SideBarDroite from "./SideBarDroite";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];



function PageProfil(props) {
    return (
        <Layout className="site-layout-background">
        <EnTete />
  
        <Row></Row>
  
        <Layout className="site-layout-background">
          <SideBarDroite />
          <Content
          style={{ padding: "0 24px", minHeight: 280, marginTop: "30px" }}>
            <Col span="16">
            <Button type="danger" style={{marginLeft:"30px"}}> Compléter Mon profil</Button>
            <h1
              style={{
                backgroundColor: "#214C74",
                color: "white",
                width: "100%",
                textAlign: "center",
                height: 50,
                justifyContent: "center",
                marginBottom: 50,
                marginLeft: 200,
              }}
            >
              Mon profil 
            </h1>
          </Col> <div className="card-container">
    <Tabs type="card">
      <TabPane tab="Mes publications sauvegardées" key="1">
      <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={<a href="https://ant.design">{item.title}</a>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
      </List.Item>
    )}
  />,
      </TabPane>
      <TabPane tab="Mes publications commentés" key="2">
      <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={<a href="https://ant.design">{item.title}</a>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
      </List.Item>
    )}
  />,
      </TabPane>
      <TabPane tab="Mes publications publiées" key="3">
      <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title="Quel avenir pour l'éducation"
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
      </List.Item>
    )}
  />,
      </TabPane>
    </Tabs>
  </div>,
  
  </Content>
          </Layout>
             <Footer> footer </Footer>
            </Layout>
        
    )}
  export default PageProfil;