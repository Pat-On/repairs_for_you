import { useEffect, useState } from "react";
import { useRouteMatch, useParams } from "react-router";

const TemporaryEditForm = (props) => {
  let { path, url } = useRouteMatch();
  const { id } = useParams();

  const [user, setUser] = useState({});

  useEffect(() => {
    // fetch("/api/users/handyman")
    fetch(`/api/users/handyman/adminsacceshandymans/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((body) => {
        //!TODO: brutal solution of storing data inside the db as a string - fix it
        // const newArray = body.data.map((item) => {
        //   return (item = {
        //     ...item,
        //     address_offer: JSON.parse(item.address_offer[0]),
        //   });
        // });
        // setUser(newArray);
        setUser(body.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

const handleChange = (e) => {
console.log(e.target)
}


  // Function to send update
  const patchUser = async () => {
    try {
    } catch (error) {
      // TODO: temporary
      console.log(error);
    }
  };
  //"form" to input the data to sent if needed

  // TODO: disabled='disabled'
console.log(user.first_name)
  return (
    <form>
      <p>First name:</p>
      <input type="text" id="first_name" name="fname" value={user.first_name}  onChange={handleChange}/>
    </form>
  );
};

export default TemporaryEditForm;
