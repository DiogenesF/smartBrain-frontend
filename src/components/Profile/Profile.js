import React, { useState } from "react";
import "./Profile.css";

const Profile = ({ isProfileOpen, toggleModal, user, loadUser }) => {
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [pet, setPet] = useState(user.pet);

  const onSubmit = (e) => {
    e.preventDefault();
    fetch(`http://192.168.99.100:3000/profile/${user.id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        formInput: { name, age, pet },
      }),
    })
      .then((resp) => {
        if (resp.status === 200 || resp.status === 304) {
          toggleModal();
          loadUser({ ...user, ...{ name, age, pet } });
        }
      })
      .catch(console.log("A"));
  };

  return (
    <div className="profile-modal">
      <article className="bg-white br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="w-80 pa4 black-80">
          <img
            src="http://tachyons.io/img/logo.jpg"
            className="h3 w3 dib"
            alt="avatar"
          />
          <h1>{name}</h1>
          <h4>Images submitted: {user.entries}</h4>
          <p>Member since: {new Date(user.joined).toLocaleDateString()}</p>
          <hr />

          <label className="mt2 fw6" htmlFor="user-name">
            Name:
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            className="pa2 ba w-100"
            placeholder={user.name}
            type="text"
            name="user-name"
            id="name"
          />
          <label className="mt2 fw6" htmlFor="user-age">
            Age:
          </label>
          <input
            onChange={(e) => setAge(e.target.value)}
            className="pa2 ba w-100"
            placeholder={user.age}
            type="text"
            name="user-age"
            id="age"
          />
          <label className="mt2 fw6" htmlFor="user-pet">
            Pet:
          </label>
          <input
            onChange={(e) => setPet(e.target.value)}
            className="pa2 ba w-100"
            placeholder={user.pet}
            type="text"
            name="user-pet"
            id="pet"
          />
          <div
            className="mt4"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <button
              onClick={(e) => onSubmit(e)}
              className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
            >
              Save
            </button>
            <button
              onClick={() => toggleModal()}
              className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
            >
              Cancel
            </button>
          </div>
        </main>
        <div className="modal-close" onClick={() => toggleModal()}>
          &times;
        </div>
      </article>
    </div>
  );
};

export default Profile;
