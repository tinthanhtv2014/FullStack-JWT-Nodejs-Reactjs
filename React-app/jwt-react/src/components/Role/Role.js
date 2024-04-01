import "./Role.scss";
import { useEffect, useState } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
const Role = (props) => {
  const [listchilds, setListChilds] = useState({
    child1: { url: "", description: "" },
  });

  const handleOnchangeInput = (name, value, key) => {
    let _listchilds = _.cloneDeep(listchilds);

    _listchilds[key][name] = value;
    setListChilds(_listchilds);
  };

  const handleAddNewInput = () => {
    let _listchilds = _.cloneDeep(listchilds);
    _listchilds[`child-${uuidv4()}`] = {
      url: "",
      description: "",
    };
    setListChilds(_listchilds);
  };
  const handleDeleteInput = (name) => {
    let _listchilds = _.cloneDeep(listchilds);
    delete _listchilds[name];
    setListChilds(_listchilds);
    console.log(name);
  };
  return (
    <>
      <div className="role-container">
        <div className="container">
          <div className=" mt-3">
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
                        className="form-control"
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
                <button className="btn btn-primary mt-3">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Role;
