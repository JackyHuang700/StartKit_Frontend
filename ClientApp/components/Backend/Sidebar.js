import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.SwitchController = this.SwitchController.bind(this);

  }

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }

  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }


  SwitchController() {
    var renderList = [];

    if (this.props.isLogin) {
      renderList = renderList.concat([
        <li key='1' className="nav-item">
          <NavLink to={'/dashboard'} className="nav-link" activeClassName="active"><i className="icon-speedometer"></i> Dashboard</NavLink>
        </li>,
        <li key='2' className="nav-title">模組</li>,
        <li key='3' className="nav-item nav-dropdown">
          <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="icon-star"></i> 通用</a>
          <ul className="nav-dropdown-items">
            <li key='4' className="nav-item">
            <NavLink to={'/News'} className="nav-link" activeClassName="active"><i className="icon-link"></i> 最新消息</NavLink>
            <NavLink to={'/Location'} className="nav-link" activeClassName="active"><i className="icon-link"></i> 服務據點</NavLink>
            <NavLink to={'/ContactUs'} className="nav-link" activeClassName="active"><i className="icon-link"></i> 聯絡我們</NavLink>
            <NavLink to={'/AboutUs'} className="nav-link" activeClassName="active"><i className="icon-link"></i> 關於我們</NavLink>
            </li>
          </ul>
        </li>,
        <li key='5' className="nav-item nav-dropdown">
        <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="icon-star"></i> 產品</a>
        <ul className="nav-dropdown-items">
          <li key='6' className="nav-item">
          <NavLink to={'/Product_Category'} className="nav-link" activeClassName="active"><i className="icon-link"></i> 產品類別</NavLink>
          <NavLink to={'/Product'} className="nav-link" activeClassName="active"><i className="icon-link"></i> 產品</NavLink>
          </li>
        </ul>
      </li>,
        <li key='' className="nav-item nav-dropdown">
        <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="icon-star"></i> 試做</a>
        <ul className="nav-dropdown-items">
          <li key='' className="nav-item">
          <NavLink to={'/MaterialUI'} className="nav-link" activeClassName="active"><i className="icon-link"></i> MaterialUI</NavLink>
          <NavLink to={'/MaterialUI'} className="nav-link" activeClassName="active"><i className="icon-link"></i> MaterialUI</NavLink>
          <NavLink to={'/v16'} className="nav-link" activeClassName="active"><i className="icon-link"></i> v16</NavLink>
          </li>
        </ul>
      </li>,
        <li key='7' className="nav-title">系統</li>,
        <li key='8' className="nav-item nav-dropdown">
          <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="icon-star"></i> 管理</a>
          <ul className="nav-dropdown-items">
            <li key='9' className="nav-item">
              <NavLink to={'/Role'} className="nav-link" activeClassName="active"><i className="icon-link"></i> 角色管理</NavLink>
            </li>
            <li key='10' className="nav-item">
              <NavLink to={'/User'} className="nav-link" activeClassName="active"><i className="icon-link"></i> 帳號管理</NavLink>
            </li>
          </ul>
        </li>,
      ]);
    }

    return renderList;
  }

  render() {
    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            {this.SwitchController()}
          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar;
