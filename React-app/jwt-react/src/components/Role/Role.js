import "./Role.scss";
import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { createRoles } from "../../services/roleService";
import TableRole from "./TableRole";
const Role = (props) => {
  const childRef = useRef();
  const dataChildDefault = { url: "", description: "", isValidUrl: true };
  const [listchilds, setListChilds] = useState({
    child1: dataChildDefault,
  });

  const handleOnchangeInput = (name, value, key) => {
    let _listchilds = _.cloneDeep(listchilds);

    _listchilds[key][name] = value;
    if (value && name === "url") {
      _listchilds[key]["isValidUrl"] = true;
    }
    setListChilds(_listchilds);
  };

  const handleAddNewInput = () => {
    let _listchilds = _.cloneDeep(listchilds);
    _listchilds[`child-${uuidv4()}`] = dataChildDefault;
    setListChilds(_listchilds);
  };
  const handleDeleteInput = (name) => {
    let _listchilds = _.cloneDeep(listchilds);
    delete _listchilds[name];
    setListChilds(_listchilds);
    console.log(name);
  };

  const buildDataToPersist = () => {
    let _listchilds = _.cloneDeep(listchilds);
    let result = [];
    let invalidObj = Object.entries(listchilds).map(([key, child], index) => {
      result.push({
        url: child.url,
        description: child.description,
      });
    });
    return result;
  };

  const handleSave = async (data) => {
    console.log(listchilds);
    let check = true;
    let invalidObj = Object.entries(listchilds).find(([key, child], index) => {
      return child && !child.url;
    });

    if (!invalidObj) {
      //call api
      let data = buildDataToPersist();
      let res = await createRoles(data);
      if (res && res.EC === 0) {
        toast.success(res.EM);
        childRef.current.fetListRolesAgain();
      }
    } else {
      //eror
      toast.error("input URL must not be empty");
      console.log("check invalel", invalidObj);
      let _listchilds = _.cloneDeep(listchilds);
      const key = invalidObj[0];
      _listchilds[key]["isValidUrl"] = false;
      setListChilds(_listchilds);
    }
  };

  return (
    <>
      <div className="role-container">
        <div className="container">
          <div className="adding-roles mt-3">
            <div className="title-role">
              <h3>Add a new role</h3>
            </div>
            <div className="role-parent">
              {Object.entries(listchilds).map(([key, child], index) => {
                return (
                  <div className="row role-child" key={`child-${key}`}>
                    <div className="col-5 form-group">
                      <label htmlFor="">URL:</label>
                      <input
                        type="text"
                        className={
                          child.isValidUrl
                            ? "form-control"
                            : "form-control is-invalid"
                        }
                        value={child.url}
                        onChange={(event) =>
                          handleOnchangeInput("url", event.target.value, key)
                        }
                      />
                    </div>
                    <div className="col-5 form-group">
                      <label htmlFor="">DESCRIPTION:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={child.description}
                        onChange={(event) =>
                          handleOnchangeInput(
                            "description",
                            event.target.value,
                            key
                          )
                        }
                      />
                    </div>
                    <div className="col-2  mt-4 actions">
                      <i
                        className="fa fa-plus-circle add"
                        onClick={() => handleAddNewInput()}
                      ></i>
                      {index >= 1 && (
                        <i
                          className="fa fa-trash-o delete"
                          onClick={() => handleDeleteInput(key)}
                        ></i>
                      )}
                    </div>
                  </div>
                );
              })}

              <div>
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => handleSave()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          <div className="mt-3 table-role">
            <h4>List current roles</h4>
            <TableRole ref={childRef} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Role;
