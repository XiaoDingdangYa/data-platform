import React, { Component } from 'react';
import {Button} from 'antd';
import MyForm, { defaultLabelColSpan } from './../form/MyForm';
import formItems from './../form/formItems';
import moment from 'moment';

const requestDetail = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          Input: 'Input',
          password: 'password',
          Select: 'option2',
          RadioGroup: 'radio2',
          RadioButtonGroup: 'radio2',
          CheckboxGroup: ['checkbox2'],
          DatePicker: '2018-05-15T13:36:27.132Z',
          RangePicker: ['2018-04-15T13:36:27.132Z', '2018-05-15T13:36:27.132Z'],
          Switch: true,
        })
      }, 1500)
    })
  }
class button1 extends Component{
    constructor(props) {
        super(props)
        this.formRef = React.createRef()
      }

    getDetail = () => {
    requestDetail().then(res => {
        // 如果字段的值是日期，要先转成moment格式
        res.DatePicker = moment(res.DatePicker)
        res.RangePicker = res.RangePicker.map(d => moment(d))
        this.formRef.current.setFieldsValue(res)
    })
    }

    onClickSubmit = () => {
        this.formRef.current.validateFieldsAndScroll((err, values) => {
            console.log(values)
            if (err) {
            return
            }
            console.log('校验通过')
        })
        }
    render() {
        return (
            <div>
                <Button style={{ margin: 24 }} type="primary" onClick={this.getDetail}>
                模拟请求数据然后设置表单值
                </Button>

                <MyForm ref={this.formRef} items={formItems} />

                <Button
                style={{ marginLeft: `${defaultLabelColSpan / 24 * 100}%` }}
                type="primary"
                onClick={this.onClickSubmit}
                >
                提交
                </Button>
          </div>
            
        )
    }
}
export default button1;