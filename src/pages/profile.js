import axios from "axios";
import { useEffect, useState } from "react";

function Profile() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/mtg-stone/user/<id>",
    })
      .then((res) => {
        console.log(res);
        setUsername(res.data.username);
      })
      .catch((err) => {
        console.log("error retrieving user data", err);
      });
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/mtg-user/add-card-to-user",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username]);

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}

export default Profile;
