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

const Home = () => {
  const dispatch = useDispatch();
  const {users} = useSelector(state => state.data)

  useEffect(() => {
    dispatch(loadUsersStart());
  }, []);

  return (
    <>
      <div className="container" style={{marginTop: "150px"}}>
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
            {users && users.map((item,i) => (
              <MDBTableBody key={i}>
                  <tr>
                    <th scope="row">{i+1}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>Edit Delete View</td>
                  </tr>
              </MDBTableBody>
            ))}
        </MDBTable>
      </div>
    </>
  );
};

export default Home;
