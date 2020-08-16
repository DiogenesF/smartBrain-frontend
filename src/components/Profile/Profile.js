import React, { useState } from "react";
import "./Profile.css";
import ImageUploader from "react-images-upload";
import axios from "axios";

const Profile = ({ isProfileOpen, toggleModal, user, loadUser }) => {
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [uploadImage, setUploadImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    fetch(`http://192.168.99.100:3000/profile/${user.id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        formInput: { name, age },
      }),
    })
      .then((resp) => {
        if (resp.status === 200 || resp.status === 304) {
          toggleModal();
          loadUser({ ...user, ...{ name, age } });
        }
      })
      .catch((err) => console.log(err.message));
  };

  const onImage = async (failedImages, successImages) => {
    try {
      const parts = successImages[0].split(";");
      const mime = parts[0].split(":")[1];
      const imgName = parts[1].split("=")[1];
      const data = parts[2];

      setLoading(true);
      const res = await axios.post(
        "https://2lmv0evan3.execute-api.us-east-1.amazonaws.com/dev/image-upload",
        { mime, name: imgName, image: data }
      );

      fetch(`http://192.168.99.100:3000/profile/${user.id}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: window.sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          formInput: { userimage: res.data.imageURL },
        }),
      })
        .then((resp) => {
          if (resp.status === 200 || resp.status === 304) {
            loadUser({
              ...user,
              ...{ name, age, userimage: res.data.imageURL },
            });
          }
        })
        .catch((err) => console.log(err.message));

      setLoading(false);
      setUploadImage(false);
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div className="profile-modal">
      <article className="bg-white br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="w-80 pa4 black-80">
          <div style={{ display: "flex" }}>
            <img
              onClick={() => setUploadImage(true)}
              src={user.image}
              className="h3 w3 dib"
              alt="avatar"
            />

            {!uploadImage && (
              <p
                style={{
                  fontSize: "12px",
                  margin: "auto 0 auto 5px",
                }}
              >
                Click in the image to edit{" "}
              </p>
            )}
          </div>
          {uploadImage ? (
            <form>
              {loading && <h1 style={{ textAlign: "center" }}>Loading...</h1>}
              <ImageUploader
                key="image-uploader"
                singleImage={true}
                onChange={onImage}
                imgExtension={[".jpg", ".png", ".jpeg"]}
              ></ImageUploader>
            </form>
          ) : (
            <>
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
            </>
          )}
        </main>
        <div className="modal-close" onClick={() => toggleModal()}>
          &times;
        </div>
      </article>
    </div>
  );
};

export default Profile;
