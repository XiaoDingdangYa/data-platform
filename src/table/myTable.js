import React, { Component } from 'react';
import {Table} from "antd";


class myTable extends Component {
    
    onRowClick(item,index){
        let  selectedRowKeys = this.props.selecekeys;
        let  selectedRows = this.props.that.state.selectedRows;
        if(this.props.rowSelection==="checkbox"){
                if(this.props.selecekeys.indexOf(index+1)===-1){
                    selectedRowKeys.push(index+1);
                    selectedRows.push(item);
                    this.props.that.setState({selectedRowKeys,selectedRows});
                }else{
                   const index_=this.props.selecekeys.indexOf(index+1);
                    selectedRowKeys.splice(index_,1);
                    selectedRows.splice(index_,1);
                    this.props.that.setState({selectedRowKeys,selectedRows});
                }
        }else if(this.props.rowSelection==="radio"||this.props.rowSelection===""){
            this.props.that.setState({selectedRowKeys:index,selectedRows:item});
        }
    }

    updateSelectedItem(selectedRowKeys,selectedItem){
        this.setState({
            selectedRowKeys,
            selectedItem
        })
    }

    tableIntit(){
        // console.log(this.props)
  
         let rowSelection ={
            type: this.props.rowSelection==="checkbox"?"checkbox":"radio",
            selectedRowKeys:this.props.selecekeys,
            onChange:this.updateSelectedItem.bind(this.props.that)
        };
     return   <Table
  
         columns={this.props.columns}
         dataSource={this.props.dataSource}
         bordered
         pagination={this.props.pagination}
         rowSelection={this.props.rowSelection===false?null:rowSelection}
  
         onRow={(item,index)=>{
             return { onClick: () => {
                               this.onRowClick(item,index);
  
                 },       // 点击行
             }
         }}
     />
    }

    render(){
        return(
            <div>
                {this.tableIntit()}
            </div>
        )
    }
}
export default myTable;