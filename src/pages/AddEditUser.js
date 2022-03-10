import { useState, useEffect } from "react";
import { MDBValidation, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUserStart } from "../redux/actions";

const InitialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const AddEditUser = () => {
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState(InitialState);
  const { name, email, phone, address } = formValue;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && phone && address) {
      dispatch(createUserStart(formValue));
      setTimeout(() => {
        history.push("/");
      }, 500);
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const history = useHistory();

  return (
    <MDBValidation
      className="row g-3"
      style={{ marginTop: "100px" }}
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="fs-2 fw-bold text-center">Add User Detail</p>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <MDBInput
          value={name}
          name="name"
          type="text"
          onChange={onInputChange}
          required
          label="Name"
          validation="Please provide a name"
          invalid
        />
        <br />
        <MDBInput
          value={email}
          name="email"
          type="email"
          onChange={onInputChange}
          required
          label="Email"
          validation="Please provide an email"
          invalid
        />
        <br />
        <MDBInput
          value={phone}
          name="phone"
          type="number"
          onChange={onInputChange}
          required
          label="Phone"
          validation="Please provide a phone number"
          invalid
        />
        <br />
        <MDBInput
          value={address}
          name="address"
          type="text"
          onChange={onInputChange}
          required
          label="Address"
          validation="Please provide a address"
          invalid
        />
        <br />
        <div className="col-12">
          <MDBBtn style={{ marginRight: "10px" }} type="submit">
            Add
          </MDBBtn>
          <MDBBtn onClick={() => history.push("/")} color="danger">
            Go Back
          </MDBBtn>
        </div>
      </div>
    </MDBValidation>
  );
};

export default AddEditUser;
