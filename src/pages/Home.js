import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUsersStart } from "../redux/actions";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
  MDBSpinner,
} from "mdb-react-ui-kit";
import {Link} from "react-router-dom"

const Home = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadUsersStart());
  }, []);

  const handleDelete = () => {};

  return (
    <>
      <div className="container" style={{ marginTop: "150px" }}>
        <MDBTable>
          <MDBTableHead dark>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
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
                          style={{ color: "#55acee", marginBottom: '10px' }}
                          size="lg"
                        />
                      </MDBTooltip>
                    </Link>{" "}
                    <Link to={`/userInfo/${item.id}`}>
                    <MDBTooltip title="View" tag="a">
                        <MDBIcon
                          fas
                          icon="eye"
                          style={{ color: "#3b5998", marginBottom: '10px' }}
                          size="lg"
                        />
                      </MDBTooltip>
                    </Link>{" "}
                    
                  </td>
                </tr>
              </MDBTableBody>
            ))}
        </MDBTable>
      </div>
    </>
  );
};

export default Home;
