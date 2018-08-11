import React from 'react';
import { List, InputItem, NavBar, ImagePicker, WingBlank, Button, Icon, Radio, WhiteSpace } from 'antd-mobile';
import { Link } from 'react-router-dom';
import style from './css/common.css';

const RadioItem = Radio.RadioItem;

const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
}, {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
}];

class UploadDevice extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            content: '',
            num: '',
            files: data,
            value: '',
        }
    }

    changeTitle = (val) => {
        this.setState({
            title: val,
        })
    }

    changeNum = (val) => {
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
        console.log('hello');
    }

    onChangeRadio = (value) => {
        this.setState({
            value: value,
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
                    <NavBar mode="dark" leftContent={<Link to='/me'><Icon style={{ color: '#fff' }} type="left" /></Link>}>上传设备</NavBar>
                </div>
                <div className={style.middle}>
                    <InputItem value={this.state.title} onChange={this.changeTitle} type="text" placeholder="请输入设备名称">设备名称:</InputItem>
                    <InputItem value={this.state.num} onChange={this.changeNum} type="text" placeholder="请输入设备型号">设备型号:</InputItem>
                    <WhiteSpace size="lg" />
                    <List renderHeader={() => '选择设备类型'}>
                        {data1.map(i => (
                            <RadioItem key={i.value} checked={value === i.value} onChange={() => this.onChangeRadio(i.value)}>
                                {i.label}
                            </RadioItem>
                        ))}
                    </List>
                    <WhiteSpace size="lg" />
                    <div className={style.title}>请输入设备描述</div>
                    <textarea className={style.listContent} name="" cols="30" rows="10" onChange={this.changeContent} value={this.state.content}></textarea>
                    <WingBlank>
                        <ImagePicker
                            files={files}
                            onChange={this.onChange}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={files.length < 5}
                            multiple={false}
                        />
                    </WingBlank>
                    <Button type="primary" onClick={this.handleClick}>上传</Button>
                </div>
            </div>
        )
    }
}

export default UploadDevice;