import React, { Component } from "react";
import Loader from "./Loader";
import UserCardInfo from "./UserCardInfo";

class Table extends Component {
  state = {
    data: [],
    user: [],
    isClicked: false,
    currentPage: 1,
    pageSize: 50,
    userAddress: [],
    addNewUser: false,
    newUserId: "",
    newUserFirstName: "",
    newUserLastName: "",
    newUserEmail: "",
    newUserPhone: "",
  };

  chooseDataType = (id) => {
    if (id === "small") {
      this.fetchSmallData();
    } else if (id === "large") {
      this.fetchLargeData();
    }
  };

  fetchSmallData = () => {
    this.setState({ data: [] });
    fetch(
      "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
    )
      .then((res) => res.json())
      .then((data) => this.setState({ data: data }));
  };
  fetchLargeData = () => {
    this.setState({ data: [] });
    fetch(
      "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
    )
      .then((res) => res.json())
      .then((data) => this.setState({ data: data }));
  };
  chooseRow = (id) => {
    const { data } = this.state;
    const newUser = data.find((item) => {
      return item.phone === id;
    });
    this.setState({ user: newUser, userAddress: newUser.address });
  };

  sortBy = (key) => {
    const { data, isClicked } = this.state;
    if (!isClicked) {
      const newData = data.sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      });
      this.setState({ isClicked: true, data: newData });
    } else {
      const newData = data.sort((a, b) => {
        if (a[key] > b[key]) return -1;
        if (a[key] < b[key]) return 1;
        return 0;
      });
      this.setState({ isClicked: false, data: newData });
    }
  };

  //пагинация
  //страница назад
  prevPage = () => {
    this.setState({ currentPage: this.state.currentPage - 1 });
  };
  //страница назад
  nextPage = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  showAddNewUser = () => {
    this.setState({ addNewUser: true });
  };

  getNewUserId = (e) => {
    this.setState({ newUserId: +e.target.value });
  };

  getNewUserFirstName = (e) => {
    this.setState({ newUserFirstName: e.target.value });
  };

  getNewUserLastName = (e) => {
    this.setState({ newUserLastName: e.target.value });
  };

  getNewUserEmail = (e) => {
    this.setState({ newUserEmail: e.target.value });
  };

  getNewUserPhone = (e) => {
    this.setState({ newUserPhone: e.target.value });
  };

  addNewUser = () => {
    const {
      newUserId,
      newUserFirstName,
      newUserLastName,
      newUserEmail,
      newUserPhone,
      data,
    } = this.state;
    data.unshift({
      id: newUserId,
      firstName: newUserFirstName,
      lastName: newUserLastName,
      email: newUserEmail,
      phone: newUserPhone,
    });
    console.log(data);
  };

  findUser = () => {};

  render() {
    const {
      data,
      user,
      userAddress,
      pageSize,
      currentPage,
      addNewUser,
      newUserId,
      newUserFirstName,
      newUserLastName,
      newUserEmail,
      newUserPhone,
    } = this.state;
    return (
      <div className="table">
        <button onClick={this.showAddNewUser}>Добавить пользователя</button>
        {!addNewUser ? (
          <div>
            <label>
              Id
              <input
                type="text"
                value={newUserId}
                onChange={this.getNewUserId}
              />
            </label>
            <label>
              firstName
              <input
                type="text"
                value={newUserFirstName}
                onChange={this.getNewUserFirstName}
              />
            </label>
            <label>
              lastName
              <input
                type="text"
                value={newUserLastName}
                onChange={this.getNewUserLastName}
              />
            </label>
            <label>
              email
              <input
                type="text"
                value={newUserEmail}
                onChange={this.getNewUserEmail}
              />
            </label>
            <label>
              phone
              <input
                type="text"
                value={newUserPhone}
                onChange={this.getNewUserPhone}
              />
            </label>
            <button
              onClick={this.addNewUser}
              disabled={
                !newUserId ||
                !newUserFirstName ||
                !newUserLastName ||
                !newUserEmail ||
                !newUserPhone
              }
            >
              Добавить в таблицу
            </button>
          </div>
        ) : null}
        <input type="text" />
        <h1>Выбери тип данных</h1>
        <button
          onClick={() => {
            this.chooseDataType("small");
          }}
        >
          Маленький объем данных
        </button>
        <button
          onClick={() => {
            this.chooseDataType("large");
          }}
        >
          Большой объем данных
        </button>
        {data.length < 50 ? null : (
          <div>
            <h3>Текущая страница {currentPage}</h3>
            <button onClick={this.prevPage} disabled={currentPage === 1}>
              {"<"}
            </button>
            <button onClick={this.nextPage} disabled={currentPage === 20}>
              {">"}
            </button>
          </div>
        )}

        {data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th
                  onClick={() => {
                    this.sortBy("id");
                  }}
                >
                  Id
                </th>
                <th
                  onClick={() => {
                    this.sortBy("firstName");
                  }}
                >
                  firstName
                </th>
                <th
                  onClick={() => {
                    this.sortBy("lastName");
                  }}
                >
                  lastName
                </th>
                <th
                  onClick={() => {
                    this.sortBy("email");
                  }}
                >
                  email
                </th>
                <th
                  onClick={() => {
                    this.sortBy("phone");
                  }}
                >
                  phone
                </th>
              </tr>
            </thead>

            <tbody>
              {data
                .slice(pageSize * (currentPage - 1), pageSize * currentPage)
                .map((item) => (
                  <tr
                    key={item.phone}
                    onClick={() => {
                      this.chooseRow(item.phone);
                    }}
                  >
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <Loader />
        )}
        {user.description || userAddress ? (
          <UserCardInfo
            userFirstName={user.firstName}
            userLastName={user.lastName}
            userDescription={user.description}
            userAddress={userAddress.address}
            userCity={userAddress.city}
            userState={userAddress.state}
            userZipCode={userAddress.zip}
          />
        ) : null}
      </div>
    );
  }
}

export default Table;
