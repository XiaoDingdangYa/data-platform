import React, { Component } from 'react';
import { Tabs,Card,Divider,Breadcrumb,DatePicker,Select  } from 'antd';
import {DraggableArea} from 'react-draggable-tags';
// import axios from 'axios';
import "./userTags.less";
import MyTable from './../table/myTable';
//柱状图导入
import ReactEcharts from 'echarts-for-react';
import ajax from './../axios';




const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const { Option } = Select;


const initialTags = [
    {id: 1, content: 'apple'}, 
    {id: 2, content: 'undraggable'}, 
    {id: 3, content: 'banana'},
    {id: 4, content: 'lemon'}, 
    {id: 5, content: 'orange'}, 
    {id: 6, content: 'grape'},
    {id: 7, content: 'strawberry'}, 
    {id: 8, content: 'cherry'}, 
    {id: 9, content: 'peach'}
];
// const source = [
//     {product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7},
//     {product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1},
//     {product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5},
//     {product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}
// ];
// const dimensions = [
//     'product', '2015', '2016', '2017'
// ]
// const title = '测试图表'
// const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       render: text => <a href="javascript:;">{text}</a>,
//     },
//     {
//       title: 'Age',
//       dataIndex: 'age',
//     },
//     {
//       title: 'Address',
//       dataIndex: 'address',
//     },
//   ];
//   const data = [
//     {
//       key: '1',
//       name: 'John Brown',
//       age: 32,
//       address: 'New York No. 1 Lake Park',
//     },
//     {
//       key: '2',
//       name: 'Jim Green',
//       age: 42,
//       address: 'London No. 1 Lake Park',
//     },
//     {
//       key: '3',
//       name: 'Joe Black',
//       age: 32,
//       address: 'Sidney No. 1 Lake Park',
//     },
//     {
//       key: '4',
//       name: 'Disabled User',
//       age: 99,
//       address: 'Sidney No. 1 Lake Park',
//     },
//   ];
  const children = [];
    for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }


class userTags extends Component {

        state = {
            legend: [],
            xAxis:[],
            series:[],
            columns:[],
            dataSource:[],
            value:[]
        };

      componentDidMount() {
        this.getData();
        // this.getTableData();
        
      }
    
    handleClick(){
        console.log(123)
    }

    getOption = () =>{
        let option = {
            title: {
                text: '车辆品牌',
                subtext: '2333人'
            },
            legend: {
                data: this.state.legend,
                top:'bottom',
            },
            tooltip : {
                
            },
            xAxis : [
                {
                    type : 'category',
                    data : this.state.xAxis
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : this.state.series
        };
        return option;
    }

    getData =() =>{
        let that = this
        // axios.get('https://easy-mock.com/mock/5d08a8c2e143b931f98e254d/echarts/create')
        //     .then(function (res) {
        //         if(res.status == 200 && res.data.code == 0){               
        //             var tablename = [];
                    
        //             res.data.result.list.map(function(item){
        //                 tablename.push(item.name)
        //             })
        //             //console.log(tablename)
        //             that.setState({
        //                 xAxis:res.data.result.xAxis,
        //                 series:res.data.result.list,
        //                 legend:tablename
        //             })
        //         console.log(res.data);
        //     }else{
        //         console.log(res.msg)
        //     }
        //     })
        //     .catch(function (error) {
        //         // handle error
        //         console.log(error);
        //     })
        //     .finally(function () {
        //         // always executed
        //     });

            ajax({
                method: "GET",
                url: "/create",
                data:{
                    isShowLoading: true
                }
              }).then(function (res) {
                  //console.log(res)
                  var tablename = [];           
                res.result.list.map(function(item){
                    tablename.push(item.name)
                })
                that.setState({
                    xAxis:res.result.xAxis,
                    series:res.result.list,
                    legend:tablename
                })
              })
    }

    getTableData = () =>{
        let that = this
        ajax({
            method: "GET",
            url: "/tabledata",
          }).then(function (res) {
              //console.log(res)
              that.setState({
                columns:res.columns,
                dataSource:res.data,
            })
          })
        // axios.get('https://easy-mock.com/mock/5d08a8c2e143b931f98e254d/echarts/tabledata')
        //     .then(function (res) {
        //         if(res.status == 200 && res.data.code == 0){               
        //             that.setState({
        //                 columns:res.data.columns,
        //                 dataSource:res.data.data,
        //             })
        //         console.log(res.data);
        //     }else{
        //         console.log(res.msg)
        //     }
        //     })
        //     .catch(function (error) {
        //         // handle error
        //         console.log(error);
        //     })
        //     .finally(function () {
        //         // always executed
        //     });
    }

    handleChange = (value) => {
        // console.log(value);
        if(value.length>7){
            value = value.slice(0,7)
        }
        this.setState({
            value:value
        })
    }

    render(){
      
        return(
            <div className='customSelect'>
                 <Breadcrumb separator=">">
                    <Breadcrumb.Item>用户洞察</Breadcrumb.Item>
                    <Breadcrumb.Item>用户标签</Breadcrumb.Item>
                </Breadcrumb>
                <Card className='card1'>
                    <dl>
                        <dt>基本属性</dt>
                        <dd>
                            <Tabs defaultActiveKey="1-1" tabPosition="top">
                                <TabPane tab='人口属性' key='1-1'style={{borderColor: 'transparent'}}> 
                                    <div className='numtabs'>          
                                        <DraggableArea
                                            tags={initialTags}
                                            render={({tag, index}) => (
                                            <div className={`tag`} id={tag.id}>
                                            {tag.content}
                                            </div>
                                            )}
                                        />
                                    </div>        
                                </TabPane>
                                <TabPane tab='社会属性' key='1-2'>
                                Content of tab 2
                                </TabPane>
                            </Tabs>
                        </dd>
                    </dl>
                    <dl>
                        <dt>资产信息</dt>
                        <dd>
                            <Tabs defaultActiveKey="2-1" tabPosition="top">
                                <TabPane tab='车辆' key='2-1'style={{borderColor: 'transparent'}}> 
                                    <div className='numtabs'>          
                                        <DraggableArea
                                            tags={initialTags}
                                            render={({tag, index}) => (
                                            <div className={`tag`}>
                                            {tag.content}
                                            </div>
                                            )}
                                        />
                                    </div>        
                                </TabPane>
                            </Tabs>
                        </dd>
                    </dl>
                </Card>
                <Card className='card2'>
                <div className='filter'>
                    <Select
                        mode="multiple"
                        maxTagCount={1}
                        style={{ width: 200,marginRight:10 }}
                        placeholder="筛选显示"
                        onChange={this.handleChange}
                        value = {this.state.value}
                    >
                        {children}
                    </Select>
                    <Select
                        mode="multiple"
                        maxTagCount={1}
                        style={{ width: 200,marginRight:10 }}
                        placeholder="选择小区"
                    >
                        {children}
                    </Select>
                    <RangePicker />
                </div>
                <ReactEcharts option={this.getOption()} theme={"theme_name"} />
                <Divider />
                <MyTable that={this} rowSelection={false} columns={this.state.columns} dataSource={this.state.dataSource}/>
                </Card>
            </div>
        )
    }
}

export default userTags;