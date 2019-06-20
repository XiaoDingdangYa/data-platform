import React,{Component} from 'react';
import {Select,Card,DatePicker,Breadcrumb,Form, Row,Col, Popover,Button,Icon} from 'antd';
import { withRouter } from "react-router-dom";
import './index.less';
import ReactEcharts from 'echarts-for-react';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

import ajax from './../../axios';
import moment from 'moment'


const { Option } = Select;
const { RangePicker } = DatePicker

const content = (
    <div>
      <p>新增用户:新注册用户</p>
      <p>新增用户占比:某时段内新增用户占该时段活跃用户的比例</p>
    </div>
  );
  const dateFormat = 'YYYY/MM/DD';
  const defaultSelectDate = {
    startDate: moment().startOf('day'),
    endDate: moment().endOf('day').add(7,'days').calendar
  }
  const limitSelectDate = {
    min: moment().startOf('day'),
    max: moment().endOf('day').add(365,'days').calendar
  }

class addUser extends Component {
    state = {
        legend: [],
        xAxis:[],
        series:[],
    };
    componentDidMount() {
        this.getData();
      }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (err) {
            return;
          }
        })
        console.log(e)
    }

    getOption = () =>{
        let option = {
            // title: {
            //     text: '新增用户分析',
            // },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: this.state.legend,
                top:'bottom',
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
            ajax({
                method: "GET",
                url: "/adduser",
                data:{
                    isShowLoading: true
                }
              }).then(function (res) {
                  console.log(res)
                  let tablename = [];           
                res.list.map(function(item){
                    tablename.push(item.name)
                })
                that.setState({
                    xAxis:res.xAxis,
                    series:res.list,
                    legend:tablename
                })
              })
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div className="container">
                <div className='header'>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>彩之云数据统计平台</Breadcrumb.Item>
                        <Breadcrumb.Item>用户分析</Breadcrumb.Item>
                        <Breadcrumb.Item>活跃用户</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Card>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <Row>
                            <Col span={7}>
                                <Form.Item label="日期">
                                    {getFieldDecorator('data', {
                                        initialValue: [defaultSelectDate.startDate, defaultSelectDate.endDate],
                                        rules: [{ required: true, message: '请选择日期!' }],
                                    })(
                                        <RangePicker format={dateFormat}/>,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item label="渠道">
                                    {getFieldDecorator('way', {
                                        initialValue: '全部渠道' ,
                                        rules: [{ required: true, message: '请选择渠道!' }],
                                    })(
                                        <Select
                                            maxTagCount={1}
                                            style={{ width: 200,marginRight:10 }}
                                            onChange={this.handleChange}
                                            style = {{width:350}}
                                        >
                                            <Option value="all">全部渠道</Option>
                                            <Option value="way1">渠道1</Option>
                                            <Option value="way2">渠道2</Option>
                                        </Select>,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item label="版本">
                                    {getFieldDecorator('version', {
                                        initialValue: '全部版本' ,
                                        rules: [{ required: true, message: '请选择版本!' }],
                                    })(
                                        <Select
                                            maxTagCount={1}
                                            style={{ width: 200,marginRight:10 }}
                                            onChange={this.handleChange}
                                            style = {{width:350}}
                                        >
                                            <Option value="allver">全部版本</Option>
                                            <Option value="ver1">版本1</Option>
                                            <Option value="ver2">版本2</Option>
                                        </Select>,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{marginLeft:'60%'}}>
                                        提交
                                </Button>
                            </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
                <Card>
                    <div>
                        <div>
                            <h4 style={{fontWeight:'bold',display:'inline'}}>新增用户分析</h4>
                            <div style={{display:'inline'}}>
                                <Popover content={content}>
                                    <Icon type="question-circle" />
                                </Popover>
                            </div>      
                        </div>
                        <ReactEcharts option={this.getOption()} theme={"theme_name"} />
                    </div>
                </Card>
            </div>
        )
    }
}
const adduser = Form.create({ name: 'normal_adduser' })(addUser);
export default withRouter(adduser);