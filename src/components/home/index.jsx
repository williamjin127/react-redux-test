import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router";
import {
  GET_TODO_REQUEST,
  ADD_TODO_REQUEST,
  UPDATE_TODO_REQUEST,
  DELETE_TODO_REQUEST,
} from "../../redux/actionTypes";

const Home = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.Todo);
  const [data, setData] = useState([]);
  const [forceCheckAll, setForceCheckAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(-1);
  const [name, setName] = useState("");

  useEffect(() => {
    let data = [];
    todos.forEach((x) =>
      data.push({
        ...x,
        isChecked: false,
      })
    );
    setData(data);
  }, [todos]);

  useEffect(() => {
    dispatch({
      type: GET_TODO_REQUEST,
      payload: {},
    });
  }, []);

  const toggleChecked = (index) => {
    const updatedData = [...data];
    updatedData[index].isChecked = !updatedData[index].isChecked;
    setData(updatedData);
  };

  const toggleForceChecked = () => {
    const updatedData = [...data];
    for (let i = 0; i < updatedData.length; i++) {
      updatedData[i].isChecked = !forceCheckAll;
    }
    setForceCheckAll(!forceCheckAll);
    setData(updatedData);
  };

  const handleUpdate = (index) => {
    setItemToEdit(index);
    setName(data[index].title);
    setShowModal(true);
  };

  const deleteSelectedItems = () => {
    const updatedData = [...data].filter((x) => x.isChecked === false);
    setData(updatedData);
    setForceCheckAll(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setItemToEdit(-1);
    setName("");
  };

  const handleDelete = (index) => {
    const updatedData = [...data];
    const id = updatedData[index].id;
    updatedData.splice(index, 1);
    setData(updatedData);
    dispatch({
      type: DELETE_TODO_REQUEST,
      payload: {
        id,
      },
    });
  };

  const updateItem = () => {
    const updatedData = [...data];
    updatedData[itemToEdit].title = name;
    setData(updatedData);
    closeModal();
    dispatch({
      type: UPDATE_TODO_REQUEST,
      payload: {
        ...updatedData[itemToEdit],
      },
    });
  };

  const addItem = () => {
    const itemToAdd = {
      userId: 1,
      id: data.length + 1,
      title: name,
      completed: false,
    };
    setData([...data, itemToAdd]);
    closeModal();
    dispatch({
      type: ADD_TODO_REQUEST,
      payload: {
        ...itemToAdd,
      },
    });
  };

  return (
    <section className="hero ">
      <div className="hero-body">
        <div className="container">
          <section className="section">
            <div className="columns">
              <div className="column is-8 is-offset-2">
                <div className="content is-medium">
                  <h1 className="title">Items List</h1>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div className="is-divider"></div>

          <section className="section">
            <div className="columns">
              <div className="column is-8 is-offset-2">
                <label onClick={toggleForceChecked} className="checkbox">
                  <input
                    checked={forceCheckAll}
                    onChange={() => {}}
                    type="checkbox"
                  />{" "}
                  Select All
                </label>
                <hr />
                <table className="table is-fullwidth is-striped">
                  <colgroup>
                    <col width="5%"></col>
                    <col width="5%"></col>
                    <col width="70%"></col>
                    <col width="20%"></col>
                  </colgroup>
                  <tbody>
                    {data.map((x, index) => (
                      <tr key={`TODO-LIST-${x.id}`}>
                        <td>
                          <label
                            onClick={() => toggleChecked(index)}
                            className="checkbox"
                          >
                            <input
                              onChange={() => {}}
                              checked={x.isChecked}
                              type="checkbox"
                            />
                          </label>
                        </td>
                        <td>{x.id}</td>
                        <td>{x.title}</td>
                        <td className="has-text-right">
                          <div className="dropdown is-hoverable">
                            <div className="dropdown-trigger">
                              <button
                                className="button is-inverted"
                                aria-haspopup="true"
                                aria-controls={"dropdown-menu-" + x.id}
                              >
                                <span className="icon is-small">
                                  <i
                                    className="fas fa-angle-down"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              </button>
                            </div>
                            <div
                              className="dropdown-menu has-text-left has-shadow"
                              id={"dropdown-menu-" + x.id}
                              role="menu"
                            >
                              <div className="dropdown-content">
                                <a
                                  onClick={() => handleUpdate(index)}
                                  className="dropdown-item"
                                >
                                  Update
                                </a>
                                <a
                                  onClick={() => handleDelete(index)}
                                  className="dropdown-item"
                                >
                                  Delete
                                </a>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <hr />
                <div className="buttons">
                  <button
                    onClick={() => setShowModal(true)}
                    className="button is-info"
                  >
                    Add New Item
                  </button>
                  <button
                    onClick={deleteSelectedItems}
                    className="button is-danger"
                  >
                    Delete Selected Items
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className={showModal ? "modal is-active" : "modal"}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              {itemToEdit !== -1 ? "Update Item" : "Add Item"}
            </p>
            <button
              onClick={closeModal}
              className="delete"
              aria-label="close"
            ></button>
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter name"
                />
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button
              onClick={itemToEdit !== -1 ? updateItem : addItem}
              className="button is-success"
            >
              Save changes
            </button>
            <button onClick={closeModal} className="button">
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </section>
  );
};

export default withRouter(Home);
