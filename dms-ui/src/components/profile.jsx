import Modal from "./modal";
import ProfileUpdateForm from "./profileUpdateForm";

const Profile = ({ user }) => {
  return (
    <div className="profile-jumbotron">
      <Modal>
        <ProfileUpdateForm user={user} />
      </Modal>
      <div className="prl-img-container">
        <img
          className="profile-img"
          src={process.env.PUBLIC_URL + "/andrew.png"}
          alt="profile"
        />
      </div>
      <div
        className="ri-pencil-fill ri-2x"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      ></div>
      <div className="row mt-5">
        <div className="col-0 col-md-1"></div>
        <div className="col-12 col-md-5">
          <div className="label">First Name</div>
          <div>{user.firstName}</div>
        </div>
        <div className="col-12 col-md-5">
          <div className="label">Last Name</div>
          <div>{user.lastName}</div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-0 col-md-1"></div>
        <div className="col-12 col-md-5">
          <div className="label">Email</div>
          <div>{user.email}</div>
        </div>
        <div className="col-12 col-md-5">
          <div className="label">Contact Number</div>
          <div>{user.contactNo}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
