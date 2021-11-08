import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhoneAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import authProvider from "../../common/utils";
import EditProfileScreen from "./EditProfile";
import MaleAvatar from "../../assets/svg/male-avatar.svg";
import FemaleAvatar from "../../assets/svg/female-avatar.svg";
import "./profile.scss";

function ProfileScreen() {
  const [userDetails] = useState(authProvider());
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen((previousSate) => !previousSate);
  return (
    <>
      <div className="profile-wrapper">
        <div className="profile-card-container">
          <a className="profile-edit" onClick={handleModalOpen}>
            <FontAwesomeIcon
              icon={faEdit}
              color="#0000FF"
              style={{ fontSize: "20px" }}
            />
          </a>
          <div className="profile-card-img">
            {userDetails.gender === "male" ? (
              <img src={MaleAvatar} height="100%" />
            ) : (
              <img src={FemaleAvatar} height="100%" />
            )}
          </div>

          <div className="profile-card-body">
            <div className="profile-card-name">
              {userDetails.firstName} {userDetails.lastName}
            </div>
            <div className="profile-card-txt">
              <FontAwesomeIcon icon={faEnvelope} color="#324e63" />{" "}
              {userDetails.eMail}
            </div>
            <div className="profile-card-loc">
              <span className="profile-card-loc-txt">
                <FontAwesomeIcon icon={faPhoneAlt} color="#324e63" />{" "}
                {userDetails.mobileNumber}
              </span>
            </div>

            <div className="profile-card-info">
              <div className="profile-info-item">
                <div className="profile-info-title">{userDetails.gender}</div>
                <div className="profile-info-txt">Gender</div>
              </div>
              <div className="profile-info-item">
                <div className="profile-info-title">{userDetails.age}</div>
                <div className="profile-info-txt">Age</div>
              </div>
              <div className="profile-info-item">
                <div className="profile-info-title">{userDetails.userType}</div>
                <div className="profile-info-txt">Type</div>
              </div>
              <div className="profile-info-item">
                <div className="profile-info-title">
                  ****{userDetails.password.slice(-3)}
                </div>
                <div className="profile-info-txt">Password</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditProfileScreen
        modalOpen={modalOpen}
        handleModalOpen={handleModalOpen}
      />
    </>
  );
}

export default ProfileScreen;
