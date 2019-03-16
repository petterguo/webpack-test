import React from 'react';
import Select from 'react-select';
import { List, InputItem, NavBar, ImagePicker, WingBlank, Button, Icon, Radio, WhiteSpace, Toast } from 'antd-mobile';
// import { Select } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import style from './css/common.css';

const RadioItem = Radio.RadioItem;

// const Option = Select.Option;

class UploadDevice extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            num: '',
            selectvalue: '',
            content: '',
            files: [],
            
        }
    }

    changeTitle = (val) => {
        this.setState({
            title: val,
        })
    }

    changeNum = (val) => {
        console.log(val)
        this.setState({
            num: val,
        })
    }

    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    }

    changeContent = (e) => {
        this.setState({
            content: e.target.value,
        })
    }

    handleClick = () => {
        let res = this.checkNull();
        if(!res) {
            return;
        }
        axios.post('/goodsadd', this.state).then(mes=>{
            Toast.success('上传成功', 1.5);
            console.log(mes.data);
        }).catch( e => {
            Toast.fail('上传失败', 1.5);
        })
    }

    checkNull = () => {
        for(let key in this.state) {
            switch (key) {
                case 'title':
                    if(this.state[key] === '') {
                        Toast.fail('请添加设备名称',1);
                        return false;
                    }
                    break;
                
                case 'num':
                    if (this.state[key] === '') {
                        Toast.fail('请添加设备型号', 1);
                        return false;
                    }
                    break;

                case 'selectvalue':
                    if (this.state[key] === '') {
                        Toast.fail('请选择设备类型', 1);
                        return false;
                    }
                    break;


                case 'content':
                    if (this.state[key] === '') {
                        Toast.fail('请添加设备描述', 1);
                        return false;
                    }
                    break;

                case 'files':
                    if (this.state[key].length === 0) {
                        Toast.fail('请添加设备图片', 1);
                        return false;
                    }
                    break;
                default:
                    break;
            }
        }
        return true;
    }

    onChangeRadio = (value) => {
        this.setState({
            selectvalue: value,
        })
    }

    render() {
        let files = this.state.files;
        let value = this.state.value;
        const data1 = [
            { value: 0, label: '示波器' },
            { value: 1, label: '实验箱' },
            { value: 2, label: '开发板' },
            { value: 3, label: '其它' },
        ];
        return (
            <div className={style.mainBox}>
                <div className={style.top}>
                    <NavBar mode="dark" leftContent={<Link to='/app/me'><Icon style={{ color: '#fff' }} type="left" /></Link>}>上传设备</NavBar>
                </div>
                <div className={style.middle}>
                    <div className={style.inputBox}>
                        <InputItem value={this.state.title} onChange={this.changeTitle} type="text" placeholder="请输入设备名称">设备名称:</InputItem>
                    </div>
                    <div className={style.inputBox}>
                        <InputItem value={this.state.num} onChange={this.changeNum} type="text" placeholder="请输入设备型号">设备型号:</InputItem>
                    </div>
                    <div className={style.inputBox}>
                        <Select
                            className={style.back}
                            value={this.state.selectvalue}
                            isSearchable={false}
                            placeholder="请选择设备类型"
                            onChange={this.onChangeRadio}
                            options={data1}
                        />
                    </div>
                    <div className={style.inputBox}>
                        <div className={style.title}>请输入设备描述</div>
                        <textarea className={style.listContent} name="" cols="30" rows="10" onChange={this.changeContent} value={this.state.content}></textarea>                    
                    </div>
                    <div className={style.inputBox}>
                        <div className={style.title}>请添加设备图片</div>
                        <ImagePicker
                            style={{padding: '9px'}}
                            files={files}
                            onChange={this.onChange}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={files.length < 5}
                            multiple={false}
                        />           
                    </div>                                       
                    <Button type="primary" onClick={this.handleClick}>上传</Button>
                </div>
            </div>
        )
    }
}

export default UploadDevice;