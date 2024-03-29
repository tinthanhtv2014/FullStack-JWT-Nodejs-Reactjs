import React, { useEffect, useState, useContext } from "react";
import "./Users.scss";
import { useHistory } from "react-router-dom";
import { fetchAllUser, deleteUSer } from "../../services/userService";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";

const Users = (props) => {
  const [listUser, setListUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModaldelete, setIsShowModaldelete] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [isShowModalUser, setIsShowModalUser] = useState(false);
  const [actionModalUser, setActionModalUser] = useState("CREATE");
  const [dataModalUser, setDataModalUser] = useState({});
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    let response = await fetchAllUser(currentPage, currentLimit);
    if (response && response.EC === 0) {
      setTotalPages(response.DT.totalPages);
      setListUser(response.DT.users);
    }
  };

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);

    await fetchUsers(+event.selected + 1);
  };

  const handleDeleteUser = async (item) => {
    setDataModal(item);
    setIsShowModaldelete(true);
  };

  const handleEditUser = async (item) => {
    setActionModalUser("UPDATE");
    setDataModalUser(item);
    setIsShowModalUser(true);
  };

  const handleClose = () => {
    setIsShowModaldelete(false);
    setDataModal({});
  };

  const confirmDeleteUser = async () => {
    let response = await deleteUSer(dataModal);
    console.log("check user", response);
    if (response && response.EC === 0) {
      toast.success(response.EM);
      await fetchUsers();
    } else {
      toast.error(response.EM);
    }
  };
  const onHideModalUser = async () => {
    setIsShowModalUser(false);
    setDataModalUser({});
    await fetchUsers();
  };
  const handleRefresh = async () => {
    await fetchUsers();
    setCurrentPage(1);
  };
  return (
    <>
      <div className="container">
        <div className="manage-users-container">
          <div className="user-header">
            <div className="title mt-3">
              <h3>Manage User</h3>
            </div>
            <div className="actions my-3">
              <button
                className="btn btn-success refresh"
                onClick={() => handleRefresh()}
              >
                <i className="fa fa-refresh"></i>Refresh
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setIsShowModalUser(true);
                  setActionModalUser("CREATE");
                }}
              >
                <i className="fa fa-plus-circle"></i>Add New User
              </button>
            </div>
          </div>
          <div className="user-body">
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Id</th>
                  <th scope="col">Email</th>
                  <th scope="col">Username</th>
                  <th scope="col">Group Role</th>
                </tr>
              </thead>
              <tbody>
                {listUser && listUser.length > 0 ? (
                  <>
                    {listUser.map((item, index) => {
                      return (
                        <tr key={`row-${index}`}>
                          <td>
                            {(currentPage - 1) * currentLimit + index + 1}
                          </td>
                          <td>{item.id}</td>
                          <td>{item.email}</td>
                          <td>{item.username}</td>
                          <td>{item.Group ? item.Group.name : ""}</td>
                          <td>
                            <span
                              title="Edit"
                              className="edit"
                              onClick={() => handleEditUser(item)}
                            >
                              <i className="fa fa-pencil"></i>
                            </span>
                            <span
                              title="Delete"
                              className="delete"
                              onClick={() => handleDeleteUser(item)}
                            >
                              <i className="fa fa-trash-o"></i>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <tr>
                      <td>not foundqq</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 0 && (
            <div className="user-footer">
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          )}
        </div>
      </div>
      <ModalDelete
        show={isShowModaldelete}
        handleClose={handleClose}
        dataModal={dataModal}
        confirmDeleteUser={confirmDeleteUser}
      />
      <ModalUser
        isShowModalUser={isShowModalUser}
        onHide={onHideModalUser}
        action={actionModalUser}
        dataModalUser={dataModalUser}
      />
    </>
  );
};

export default Users;
