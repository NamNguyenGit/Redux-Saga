import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  loadUsersStart,
  deleteUserStart,
  filterUserStart,
  sortUserStart,
} from "../redux/actions";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
  MDBSpinner,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtnGroup,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { sortUsersApi } from "../redux/api";

const Home = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.data);
  const sortOption = ["Name", "Email", "Phone", "Address", "Status"];
  const [sortValue, setSortValue] = useState("");

  useEffect(() => {
    dispatch(loadUsersStart());
  }, []);

  useEffect(() => error && toast.error(error), [error]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <MDBSpinner
          className="spinner-grow text-danger"
          style={{ marginTop: "180px" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
      </div>
    );
  }

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure to delete that user?`)) {
      dispatch(deleteUserStart(id));
      toast.success("User Delete Successfully");
    }
  };

  const onFilterChange = (value) => {
    dispatch(filterUserStart(value));
  };

  const onSortChange = (e) => {
    let sortValue = e.target.value
      .toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");

    if (sortOption.includes(sortValue)) {
      setSortValue(e.target.value);
      dispatch(sortUserStart(e.target.value));
    } else {
      dispatch(loadUsersStart());
      setSortValue("");
    }
  };

  return (
    <MDBContainer>
      <div className="container" style={{ marginTop: "150px" }}>
        <MDBTable>
          <MDBTableHead dark>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </MDBTableHead>
          {users &&
            users.map((item, i) => (
              <MDBTableBody key={i}>
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>{item.status}</td>
                  <td>
                    <MDBBtn
                      className="m-1"
                      tag="a"
                      color="none"
                      onClick={() => handleDelete(item.id)}
                    >
                      <MDBTooltip title="Delete" tag="a">
                        <MDBIcon
                          fas
                          icon="trash"
                          style={{ color: "#dd4b39" }}
                          size="lg"
                        />
                      </MDBTooltip>
                    </MDBBtn>{" "}
                    <Link to={`/editUser/${item.id}`}>
                      <MDBTooltip title="Edit" tag="a">
                        <MDBIcon
                          fas
                          icon="pen"
                          style={{ color: "#55acee", marginBottom: "10px" }}
                          size="lg"
                        />
                      </MDBTooltip>
                    </Link>{" "}
                    <Link to={`/userInfo/${item.id}`}>
                      <MDBTooltip title="View" tag="a">
                        <MDBIcon
                          fas
                          icon="eye"
                          style={{ color: "#3b5998", marginBottom: "10px" }}
                          size="lg"
                        />
                      </MDBTooltip>
                    </Link>
                  </td>
                </tr>
              </MDBTableBody>
            ))}
        </MDBTable>
      </div>
      <MDBRow>
        <MDBCol size="8">
          <h5>Sort By:</h5>
          <select
            style={{ width: "50%", borderRadius: "2px", height: "35px" }}
            value={sortValue}
            onChange={onSortChange}
          >
            <option>Please Select Value</option>
            {sortOption.map((item, i) => (
              <option value={item.toLowerCase()} key={i}>
                {item}
              </option>
            ))}
          </select>
        </MDBCol>
        <MDBCol size="4">
          <h5>Filter By Status:</h5>
          <MDBBtnGroup>
            <MDBBtn color="success" onClick={() => onFilterChange("Active")}>
              Active
            </MDBBtn>
            <MDBBtn
              color="danger"
              onClick={() => onFilterChange("Inactive")}
              style={{ marginLeft: "2px" }}
            >
              InActive
            </MDBBtn>
          </MDBBtnGroup>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Home;
