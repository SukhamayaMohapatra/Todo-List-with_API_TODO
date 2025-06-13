import React, { useEffect, useState } from "react";

const Todos = () => {
  const [task, setTask] = useState([]);
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTodos = task.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return false;
  });

  const fetchData = async () => {
    const res = await fetch("https://dummyjson.com/todos");
    const data = await res.json();
    setTask(data.todos);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <div
          style={{
            width: "50rem",
            height: "auto",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <button
            className="btn btn-primary my-4 mx-4"
            onClick={() => handleFilterChange("all")}
          >
            All
          </button>
          <button
            className="btn btn-secondary my-4 mx-4"
            onClick={() => handleFilterChange("completed")}
          >
            Completed
          </button>
          <button
            className="btn btn-warning my-4 mx-4"
            onClick={() => handleFilterChange("pending")}
          >
            Pending
          </button>
        </div>

        <ul style={{ alignItems: "center", marginLeft: "9rem" }}>
          {filteredTodos.map((e) => (
            <li className="list-items" key={e.id}>
              <span
                style={{
                  textDecoration: e.completed ? "line-through" : "none",
                }}
              >
                {e.todo}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todos;
