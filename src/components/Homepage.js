import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { signOut } from "firebase/auth";
import { auth, db } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import { Card, IconButton, Input } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Box } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    justifyContent: "center",
  },
}));

const Homepage = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [tempUidd, setTempUidd] = useState("");
  console.log({ todos });
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);
            });
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // add
  const writeToDatabase = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      uidd: uidd,
      isCompleted: false,
    });

    setTodo("");
  };

  const handleEditConfirm = (todo) => {
    update(ref(db, `/${auth.currentUser.uid}/${todo.uidd}`), {
      isCompleted: true,
    });

    // setTodo("");
    // setIsEdit(false);
  };

  // delete
  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  };

  const classes = useStyles();
  return (
    <div>
      <div className={classes.main}>
        <Input
          type="text"
          placeholder="Add todo..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          sx={{ color: "white" }}
        />
        <IconButton
          // color="success"
          onClick={writeToDatabase}
          className={classes.buttonStyles}
          sx={{ color: "white" }}
        >
          <AddIcon />
        </IconButton>
        <LogoutIcon
          color="error"
          style={{ margin: "20px 0px 20px 20px" }}
          onClick={handleSignOut}
          className={classes.buttonStyles}
        />
      </div>
      <Box
        sx={{
          // display: "flex",
          justifyContent: "space-around",
          marginLeft: "35%",
        }}
      >
        {todos.map((todo) => (
          <Card
            sx={{
              backgroundColor: "white",
              display: "flex",
              justifyContent: "space-between",
              width: "400px",
              alignItems: "center",
              // border: "1px solid black",
              padding: "14px 25px",
              margin: "20px 0px",
            }}
            boxShadow={4}
          >
            {/* <div className={classes.todoStyle}> */}
            <h1
              style={{
                textDecoration: todo.isCompleted ? "line-through" : "none",
              }}
            >
              {todo.todo}
            </h1>
            <Box sx={{ displa: "flex", alignItems: "center" }}>
              <IconButton>
                <DeleteIcon
                  color="error"
                  fontSize="large"
                  onClick={() => handleDelete(todo.uidd)}
                  className="delete-button"
                  style={{ marginRight: "10px" }}
                />
              </IconButton>

              <IconButton>
                <CheckCircle
                  onClick={() => handleEditConfirm(todo)}
                  fontSize="large"
                />
              </IconButton>
              {/* </div> */}
            </Box>
          </Card>
        ))}
      </Box>
    </div>
  );
};
export default Homepage;
