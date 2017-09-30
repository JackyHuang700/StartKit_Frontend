import React, { Component } from 'react';
import { ButtonToolbar, Button, Modal, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn, ButtonGroup } from 'react-bootstrap-table';
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import axios from 'axios';
import history from '../../../history'

import { role_Enum } from '../../../helpers/enum/GeneralEnum';


class Role_View extends Component {

    constructor(props) {
        super(props);
        this.state = {
            RoleList: [],
            //Table變數
            selected: [],
            currPage: 1
        }
        this.buttonFormatter = this.buttonFormatter.bind(this);
        this.GetData = this.GetData.bind(this);
    }

    componentDidMount() {
        this.GetData();
    }

    GetData() {
        const self = this;

        axios.get('/api/Role/Role_View').then((result) => {
            this.setState({ RoleList: result.data });
        }).catch((error) => {
            console.log(error)
        });
    }

    createCustomButtonGroup = props => {
        return (
            <ButtonGroup className='' sizeClass='btn-group-md'>
                {this.props.dispaly_button_create &&
                    <Button color="primary" onClick={this.OnClick_Create}>建立</Button>}
                {'\u00A0'}
                {props.exportCSVBtn}
            </ButtonGroup>
        );
    }


    buttonFormatter(cell, row) {
        return (
            <ButtonGroup className='' sizeClass='btn-group-md'>
                {this.props.display_button_edit && <Button color="warning" data-id={row.id} onClick={this.OnClick_Edit}><i className="fa fa-pencil" aria-hidden="true"></i></Button>}
                {'\u00A0'}
                {this.props.display_button_del && <Button color="danger" data-id={row.id} onClick={this.OnClick_Delete}><i className="fa fa-trash" aria-hidden="true"></i></Button>}
            </ButtonGroup>
        );
    }


    OnClick_Edit(event) {
        history.push(`/Role/Edit/${event.currentTarget.getAttribute('data-id')}/${true}`);
    }

    OnClick_Delete(event) {
        history.push(`/Role/Delete/${event.currentTarget.getAttribute('data-id')}`);
    }

    OnClick_Create(event) {
        history.push('/Role/Create');
    }

    //將資訊轉換成中文
    Formatter_Status(cell, row) {
        let name = "";

        switch (`${row.status}`) {
            case role_Enum.STOP.value:
                name = role_Enum.STOP.name;
                break;
            case role_Enum.NORMAL.value:
                name = role_Enum.NORMAL.name;
                break;

        }

        return name;
    }

    renderShowsTotal(start, to, total) {
        return (
            <p style={{ color: 'blue' }}>
                顯示第 {start} 至 {to} 項結果, 共 {total} 項
          </p>
        );
    }

    render() {
        const options = {
            btnGroup: this.createCustomButtonGroup,
            sizePerPageList: [5, 10, 15, 20],
            sizePerPage: 10,
            page: this.state.currPage,
            paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            paginationPosition: 'bottom'  // default is bottom, top and both is all available
        };

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            selected: this.state.selected
        };

        const StatusType = {
            0 : role_Enum.STOP.name,
            1 : role_Enum.NORMAL.name
        };


        return (
            <div className="col-xs-12">

                <div className="table-users">
                    <div className="header">角色管理</div>

                    <div className="card">
                        {/* <div className="card-header">最新消息</div> */}
                        <div className="card-block">
                            <BootstrapTable data={this.state.RoleList}
                                selectRow={selectRow}
                                options={options}
                                version="4"
                                striped
                                hover
                                pagination
                                search
                                exportCSV>
                                {/* {this.props.display_Id ? <TableHeaderColumn dataField='id'>id</TableHeaderColumn> : null} */}
                                {this.props.display_SysId ? <TableHeaderColumn dataField='sysId' dataSort={true} filter={ { type: 'TextFilter', delay: 1000 } }>群組</TableHeaderColumn> : null}
                                {this.props.display_name ? <TableHeaderColumn dataField='name' dataSort={true} filter={ { type: 'TextFilter', delay: 1000 } }>群組名稱</TableHeaderColumn> : null}
                                {this.props.display_Priority ? <TableHeaderColumn dataField='priority' dataSort={true}>排序</TableHeaderColumn> : null}
                                {this.props.display_Status ? <TableHeaderColumn dataField='status' dataSort={true} dataFormat={this.Formatter_Status} filter={ { type: 'SelectFilter', options: StatusType } }>狀態</TableHeaderColumn> : null}
                                {this.props.display_CreateDate ? <TableHeaderColumn dataField='createDate' dataSort={true}>建立時間</TableHeaderColumn> : null}
                                {this.props.display_CreateUser ? <TableHeaderColumn dataField='createUser' dataSort={true} filter={ { type: 'TextFilter', delay: 1000 } }>建立帳號</TableHeaderColumn> : null}
                                {this.props.display_UpdateDate ? <TableHeaderColumn dataField='updateDate' dataSort={true}>更新時間</TableHeaderColumn> : null}
                                {this.props.display_UpdateUser ? <TableHeaderColumn dataField='updateUser' dataSort={true} filter={ { type: 'TextFilter', delay: 1000 } }>更新帳號</TableHeaderColumn> : null}
                                <TableHeaderColumn isKey dataField="button" dataFormat={this.buttonFormatter}></TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Role_View.defaultProps = {

    dispaly_button_create: true,
    display_button_edit: true,
    display_button_del: true,

    /**/
    display_Id: true,
    display_name: true,
    display_SysId: true,
    display_Priority: true,
    display_Status: true,
    display_CreateDate: true,
    display_CreateUser: false,
    display_UpdateDate: false,
    display_UpdateUser: false,
};


export default Role_View;