import React, { Component } from "react";

export class UserCardInfo extends Component {
  render() {
    const {
      userFirstName,
      userLastName,
      userDescription,
      userAddress,
      userCity,
      userState,
      userZipCode,
    } = this.props;
    return (
      <div className="user-card">
        <p>
          Выбран пользователь:
          <b>
            {userFirstName} {userLastName}
          </b>
        </p>
        <p>
          Описание:
          <textarea value={userDescription} />
        </p>
        Адрес проживания: <b>{userAddress}</b>
        Город: <b>{userCity}</b>
        Провинция/штат: <b>{userState}</b>
        Индекс: <b>{userZipCode}</b>
      </div>
    );
  }
}

export default UserCardInfo;
