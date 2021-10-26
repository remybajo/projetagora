import React from 'react';
import { Layout, Menu, Button, Image, Empty, Cascader, Input} from 'antd';
import './nouvelArticle.css'
const { Header, Footer, Sider, Content } = Layout;





function nouvelArticle() {

    const options = [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
        },
      ];
      
      function onChange(value) {
        console.log(value);
      }
   
    return (
        <div style={{justifyContent: "center"}}>

            <Layout>
                <Header className="header">header</Header>
                <Image width={50} src="./image/AGORA.png" />
            </Layout>
            <div className="montimer">
            <span className="timer">publier</span>
            </div>

            <Empty className="imageVide"></Empty>
            <div className="maflex">
            <Cascader className="cascade" options={options} onChange={onChange} placeholder="Please select" />
            <Input className="motclé" placeholder="Basic usage" />
            </div>
            <Input className="description" placeholder="Basic usage" />
            <div className="monbouton">
            <Button className="bouton">publier</Button>
            </div>

        </div>
      
      
    )
  }
  
export default nouvelArticle;