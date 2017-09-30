import React, { Component } from 'react';
import { Col, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

import axios from 'axios';
import history from '../../../history'
import EasyForm, { Field, FieldGroup } from 'react-easyform';
import TextInput from '../../../components/General/Forms/TextInput';
import { news_Enum } from '../../../helpers/enum/GeneralEnum';
import classnames from 'classnames';
import { Get_Sys_Language } from '../Sys_Language/Sys_Language_General.js';
import {
    GetData,
} from './Product_General';


//刪除與檢視共用
class Product_Delete extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_Delete: this.props.match.params.delete.toLocaleLowerCase() === "true" ? true : false,

            viewModel: {
                lanList: [],
                imageList: [],
            },
            Sys_Language_List: [],
            activeTab: '0',
        };

        this.GetData = GetData.bind(this);
        this.Button_Submit = this.Button_Submit.bind(this);

        //
        this.toggle = this.toggle.bind(this);
        this.Get_Sys_Language = Get_Sys_Language.bind(this);
        this.Title = this.Title.bind(this);
        this.Button_Text = this.Button_Text.bind(this);
        this.Button_Click = this.Button_Click.bind(this);
        this.Component_Nav = this.Component_Nav.bind(this);
    }


    componentDidMount() {
        this.GetData();
    }


    Title() {
        return this.state.is_Delete ?
            "刪除產品" :
            "檢視產品";
    }


    //觸發事件
    Button_Text() {
        return this.state.is_Delete ?
            "確認刪除" :
            "返回";
    }

    //��觸發事件
    Button_Click(event) {
        if (this.state.is_Delete) {
            this.Button_Submit(event);
        }
        else {
            this.Button_BackUp(event);
        }
        event.preventDefault();
        return false;
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }


    Button_Submit(event) {
        axios.post(`/api/Product/Delete/${this.state.viewModel.id}`, {
        }).then((result) => {
            if (result.data.success) {
                history.push('/Product');
            }
        }).catch((error) => {
            console.log(error)
        });


        event.preventDefault();
        return false;
    }

    Button_BackUp(event) {
        history.push('/Product');
    }


    //語系元件
    Component_Nav() {

        return (
            <td colSpan="2">
                <Nav tabs>
                    {
                        this.state.Sys_Language_List.map((sys, index) => {
                            return (
                                <NavItem>

                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === `${index}` })}
                                        onClick={() => { this.toggle(`${index}`); }}>
                                        <i className="icon-calculator"></i> {sys.name}
                                    </NavLink>
                                </NavItem>

                            );
                        })
                    }
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    {
                        this.state.Sys_Language_List.map((sys, index) => {



                            return (
                                <TabPane tabId={`${index}`}>


                                    <TextInput name="languageId"
                                        labelName="內容"
                                        className=""
                                        data-index={index}
                                        display={this.props.display_content}
                                        required={this.props.required_content}
                                        validMessage={{ required: '內容 is reduired.' }}
                                        value={this.state.viewModel.lanList[`${index}`].languageId}
                                        readOnly={true}
                                        placeholder="languageId" />


                                    <TextInput name="title"
                                        labelName="標題"
                                        className=""
                                        data-index={index}
                                        display={this.props.display_title}
                                        required={this.props.required_title}
                                        validMessage={{ required: '標題 is reduired.' }}
                                        value={this.state.viewModel.lanList[`${index}`].title}
                                        readOnly={true}
                                        placeholder="title" />


                                    <TextInput name="subTitle"
                                        labelName="副標題"
                                        className=""
                                        data-index={index}
                                        display={this.props.display_subTitle}
                                        required={this.props.required_subTitle}
                                        validMessage={{ required: '副標題 is reduired.' }}
                                        value={this.state.viewModel.lanList[`${index}`].subTitle}
                                        readOnly={true}
                                        placeholder="subTitle" />




                                    <TextInput name="name"
                                        labelName="名稱"
                                        className=""
                                        data-index={index}
                                        display={this.props.display_name}
                                        required={this.props.required_name}
                                        validMessage={{ required: '名稱 is reduired.' }}
                                        value={this.state.viewModel.lanList[`${index}`].name}
                                        readOnly={true}
                                        placeholder="name" />


                                    <TextInput name="content"
                                        labelName="內容"
                                        className=""
                                        data-index={index}
                                        display={this.props.display_content}
                                        required={this.props.required_content}
                                        validMessage={{ required: '內容 is reduired.' }}
                                        value={this.state.viewModel.lanList[`${index}`].content}
                                        readOnly={true}
                                        placeholder="content" />







                                </TabPane>
                            )
                        })
                    }
                </TabContent>
            </td>
        );


    }


    render() {
        return (
            <div className="animated fadeIn row justify-content-center">
                <div className="col-xl-10">
                    <div className="card">
                        <div className="card-header">
                            {this.Title()}
                        </div>
                        <div className="card-block">
                            <form action="" method="post">

                                <table className="table table-striped table-bordered">
                                    <tbody>


                                        <TextInput name="id"
                                            labelName="系統流水號"
                                            display={this.props.display_id}
                                            required={this.props.required_id}
                                            validMessage={{ required: '系統流水號 is reduired.' }}
                                            readOnly={true}
                                            value={this.state.viewModel.id}
                                        />


                                        <TextInput name="listImage"
                                            labelName="列表圖片"
                                            display={this.props.display_listImage}
                                            required={this.props.required_listImage}
                                            validMessage={{ required: '列表圖片 is reduired.' }}
                                            value={this.state.viewModel.listImage}
                                            readOnly={true}
                                        />


                                        <tr>
                                            <td className="col-xs-4 text-right">
                                                <label className="text-right" style={{ color: this.props.required_listImage && 'red' }}> 上傳圖片 {this.props.required_listImage && '*'} </label>

                                            </td>
                                            <td className="col-xs-8" >
                                                {
                                                    this.state.viewModel.imageList.map(c => {
                                                        return (
                                                            <Col xs="2 dis-inline-block">
                                                                <img src={c.image} className="img-preview img-thumbnail" />
                                                                <p className="dis-inline-block">{c.description || '\u00A0'}</p>
                                                            </Col>
                                                        )
                                                    })
                                                }
                                            </td>
                                        </tr>

                                        <TextInput name="priority"
                                            labelName="列表排序"
                                            display={this.props.display_priority}
                                            required={this.props.required_priority}
                                            validMessage={{ required: '列表排序 is reduired.' }}
                                            value={this.state.viewModel.priority}
                                            readOnly={true}
                                        />


                                        <TextInput name="status"
                                            labelName="狀態"
                                            display={this.props.display_status}
                                            required={this.props.required_status}
                                            validMessage={{ required: '狀態 is reduired.' }}
                                            value={this.state.viewModel.status}
                                            readOnly={true}
                                        />



                                        <TextInput name="createDate"
                                            labelName="建立時間"
                                            className=""
                                            display={this.props.display_createDate}
                                            required={this.props.required_createDate}
                                            validMessage={{ required: '建立時間 is reduired.' }}
                                            value={this.state.viewModel.createDate}
                                            readOnly={true}
                                            placeholder="createDate" />

                                        <TextInput name="createUser"
                                            labelName="建立者"
                                            className=""
                                            display={this.props.display_createUser}
                                            required={this.props.required_createUser}
                                            validMessage={{ required: '建立者 is reduired.' }}
                                            value={this.state.viewModel.createUser}
                                            readOnly={true}
                                            placeholder="createUser" />

                                        <TextInput name="updateDate"
                                            labelName="更新時間"
                                            className=""
                                            display={this.props.display_updateDate}
                                            required={this.props.required_updateDate}
                                            validMessage={{ required: '更新時間 is reduired.' }}
                                            value={this.state.viewModel.updateDate}
                                            readOnly={true}
                                            placeholder="updateDate" />

                                        <TextInput name="updateUser"
                                            labelName="更新者"
                                            className=""
                                            display={this.props.display_updateUser}
                                            required={this.props.required_updateUser}
                                            validMessage={{ required: '更新者 is reduired.' }}
                                            value={this.state.viewModel.updateUser}
                                            readOnly={true}
                                            placeholder="updateUser" />

                                        {this.Component_Nav()}


                                    </tbody>
                                </table>

                                <div className="form-group form-actions">
                                    <button type="botton" className="btn btn-sm btn-danger" onClick={this.Button_Click}>{this.Button_Text()}</button>
                                    {'\u00A0'}
                                    <Button color="warning" onClick={() => history.goBack()}>返回</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default EasyForm(Product_Delete, 2);

Product_Delete.defaultProps = {
    display_id: false,
    display_listImage: false,
    display_priority: true,
    display_status: true,
    display_createDate: true,
    display_createUser: true,
    display_updateDate: false,
    display_updateUser: false,

    /* */
    required_id: false,
    required_listImage: true,
    required_priority: false,
    required_status: false,
    required_createDate: false,
    required_createUser: false,
    required_updateDate: false,
    required_updateUser: false,

}
