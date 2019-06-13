import React, { Component } from 'react';
import { Tabs } from 'antd';
import { DragDropContextProvider, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import  styles from './userTags.less'
const { TabPane } = Tabs;



class userTags extends Component {
    render(){
        return(
            <div >
                <Tabs defaultActiveKey="1" tabPosition="left" style={{ height: 220 }}>
                    <TabPane tab='基本属性' key='1'>
                        <Tabs defaultActiveKey="1-1" tabPosition="top" style={{ height: 100 }} className={styles.customSelect}>
                            <TabPane tab='人口属性' key='1-1'style={{borderColor: 'transparent'}}>
                                <Tabs tabPosition="top" style={{ height: 40 }}>
                                
                                    <TabPane tab='性别' key='1-1-1' style={{fontSize:5}}></TabPane>
                                    <TabPane tab='年龄' key='1-1-2'></TabPane>
                                    <TabPane tab='城市' key='1-1-3'></TabPane>
                                
                                </Tabs>
                            </TabPane>
                            <TabPane tab='社会属性' key='1-2'>
                            Content of tab 2
                            </TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab='资产信息' key='2'>
                    Content of tab 2
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default userTags;