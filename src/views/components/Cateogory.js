import { React, useState, useEffect, useCallback } from "react";
import {
  createCateogory,
  getCateogory,
  delCateogory,
} from "../../services/cateo";
import { useNavigate } from "react-router-dom";
import Popup from "../common/popup";
import Loader from "../common/loader";
import { toast } from "react-toastify";

const Cateogory = () => {
  const [addValue, setAddValue] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [delId, setDelId] = useState("");
  const [pop, setPop] = useState(false);

  const navigate = useNavigate();

  const getList = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getCateogory();
      setList(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getList();
  }, [getList]);

  const setTodoList = async () => {
    if (addValue) {
      setLoading(true);

      await createCateogory({ name: addValue })
        .then((res) => {
          toast.success("Category is added successfully");

          getList();
          setAddValue("");
        })

        .catch((err) => {
          console.error(err);
          setAddValue("");
          setLoading(false);
        });
    } else {
      toast.warning("Category field is required");
    }
  };

  const handleDelete = async () => {
    setPop(false);
    setLoading(true);
    await delCateogory(delId)
      .then((res) => {
        toast.error("Category is deleted successfully");

        getList();
      })

      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
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
        <div className="app-container" id="taskList">
          <h1 className="app-header">Cateogory</h1>
          <div className="add-task">
            <input
              type="text"
              autoComplete="off"
              placeholder="Add New Cateogory"
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
                      <li className="task-list-item" v-for="task in tasks">
                        <label className="task-list-item-label">
                          <span
                            className="todo-txt"
                            onClick={() =>
                              navigate(`/Cateogory/${data.name}/${data._id}`)
                            }
                          >
                            {data.name}
                          </span>
                        </label>
                        <span className="task-edit-out">
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
      </div>
    </>
  );
};

export default Cateogory;
