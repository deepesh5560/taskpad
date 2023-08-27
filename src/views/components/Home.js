import { React, useState, useEffect } from "react";
import { createTask, getTask, delTask, editTask } from "../../services/task";
import Loader from "../common/loader";
import Popup from "../common/popup";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [addValue, setAddValue] = useState("");
  const [edit, setEdit] = useState(false);
  const [editVal, setEditVal] = useState("");
  const [editId, setEditId] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [delId, setDelId] = useState("");
  const [pop, setPop] = useState(false);

  const { name, id } = useParams();
  useEffect(() => {
    getList();
  }, []);
  useEffect(() => {
    if (editVal) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [editVal]);

  const getList = async () => {
    setLoading(true);

    await getTask(id)
      .then((res) => {
        setList(() => res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const setTodoList = async () => {
    if (addValue) {
      setLoading(true);

      let data = {
        cateogoryId: id,
        note: addValue,
      };
      await createTask(data)
        .then((res) => {
          toast.success("Task added successfully");

          getList();
          setAddValue("");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setAddValue("");
        });
    } else {
      toast.warning("Task field is required");
    }
  };

  // const editValue = (i) => {};
  const handleDelete = async () => {
    setPop(false);

    setLoading(true);

    await delTask(delId)
      .then((res) => {
        toast.error("Task deleted successfully");
        getList();
      })
      .catch((err) => {
        console.error(err);
        setPop(false);
      });
  };

  const handleEdit = async () => {
    setLoading(true);

    let headers = {
      note: editVal,
    };
    await editTask(editId, headers)
      .then((res) => {
        getList();
        clearEdit();
        toast.success("Task is edited successfully");
      })

      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  const handleStatus = async (status, id) => {
    setLoading(true);

    let headers = {
      completed: !status,
    };
    await editTask(id, headers)
      .then((res) => {
        getList();
        clearEdit();
        toast.success("Status edited successfully");
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  const toggleEdit = (id, name) => {
    setEditVal(() => name);
    setEditId(() => id);
    // setEdit(() => true);
  };
  const clearEdit = () => {
    setEditVal(() => "");
    setEditId(() => id);
    setEdit(false);
  };
  const handlePop = (i) => {
    setDelId(i);
    setPop(true);
  };

  const handleValue = (value) => {
    setAddValue(() => value);
  };

  return (
    <>
      {loading && <Loader />}
      {pop && <Popup setPop={setPop} action={handleDelete} type={"delete"} />}

      <div className="home">
        {edit ? (
          <div className="edit-pop">
            <div className="edit-out">
              <div className="app-container" id="taskList">
                <h1 className="app-header">Edit Task</h1>
                <div className="add-task">
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="Edit Task"
                    v-model="tasks.name"
                    className="task-input"
                    onChange={(e) => setEditVal(e.target.value)}
                    value={editVal}
                  />
                </div>
                <div className="btn-out">
                  <button className="btn-1" onClick={() => clearEdit()}>
                    Cancel
                  </button>
                  <button className="btn-2" onClick={() => handleEdit()}>
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="app-container" id="taskList">
            <h1 className="app-header">Tasks of {name}</h1>
            <div className="add-task">
              <input
                type="text"
                autoComplete="off"
                placeholder="Add New Task"
                v-model="tasks.name"
                className="task-input"
                onChange={(e) => handleValue(e.target.value)}
                value={addValue}
              />
              <input
                type="submit"
                value=""
                className="submit-task"
                title="Add Task"
                onClick={() => setTodoList()}
              />
            </div>

            <div className="task-out">
              {list &&
                list.map((data, i) => {
                  return (
                    <div key={i}>
                      <ul className="task-list">
                        <li className="task-list-item">
                          <div className="task-list-item-label">
                            <div className="checkbox-wrapper-12">
                              <div className="cbx">
                                <input
                                  id="cbx-12"
                                  type="checkbox"
                                  defaultChecked={data.completed}
                                  onClick={() =>
                                    handleStatus(data.completed, data._id)
                                  }
                                />
                                <label htmlFor="cbx-12"></label>
                                <svg
                                  width="15"
                                  height="14"
                                  viewBox="0 0 15 14"
                                  fill="none"
                                >
                                  <path d="M2 8.36364L6.23077 12L13 2"></path>
                                </svg>
                              </div>

                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                              >
                                <defs>
                                  <filter id="goo-12">
                                    <fegaussianblur
                                      in="SourceGraphic"
                                      stdDeviation="4"
                                      result="blur"
                                    ></fegaussianblur>
                                    <fecolormatrix
                                      in="blur"
                                      mode="matrix"
                                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                                      result="goo-12"
                                    ></fecolormatrix>
                                    <feblend
                                      in="SourceGraphic"
                                      in2="goo-12"
                                    ></feblend>
                                  </filter>
                                </defs>
                              </svg>
                            </div>
                            <span
                              className={
                                data.completed
                                  ? "todo-txt-complted"
                                  : "todo-txt"
                              }
                            >
                              {data.note}
                            </span>
                          </div>
                          <span className="task-edit-out">
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() => toggleEdit(data._id, data.note)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#FF3D46"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-edit-2"
                              >
                                <polygon points="16 3 21 8 8 21 3 21 3 16 16 3" />
                              </svg>
                            </span>
                            <span
                              className="delete-btn"
                              title="Delete Task"
                              onClick={() => handlePop(data._id)}
                            ></span>
                          </span>
                        </li>
                      </ul>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
