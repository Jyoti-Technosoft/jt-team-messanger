import CapitalizeFirstLetter from "../CustomFunctions/CapatilizeFirstLetter";
import "./Users.scss";

function Users({ firstName, lastName }) {
  return (
    <>
      <div className="card single-user-details">
        <div className="card-body">
          <div className="user-details-card">
            <div className="user-img">
              <h6 className="first-char-text">{`${CapitalizeFirstLetter(
                firstName
              )}${CapitalizeFirstLetter(lastName)}`}</h6>
            </div>
            <div className="user-div">
              <h6 className="user-name">
                {firstName} {lastName}
              </h6>
              <p className="user-msg">Message</p>
            </div>
          </div>
          <p>12:34 PM</p>
        </div>
      </div>
    </>
  );
}

export default Users;
