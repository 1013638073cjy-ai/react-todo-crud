import { createBrowserRouter } from "react-router";

import App from "../App"
import Home from "../pages/Home";
import Todo from "../pages/Todo";
import FormPage from "../pages/FormPage";
import ReduxTodo from "../pages/ReduxTodo";
import ZustandTodo from "../pages/ZustandTodo";
import HookTodo from "../pages/HookTodo";
import { TodoProvider } from "../context/TodoContext";
import ContextTodo from "../pages/ContextTodo";
import RequestDemo from "../pages/RequestDemo";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/todo",
        element: <Todo />
      },
      {
        path: "/form",
        element: <FormPage />
      },
      {
        path: "todo/hook",
        element: <HookTodo />
      },
      {
        path: "todo/context",
        element: (
          <TodoProvider>
            <ContextTodo />
          </TodoProvider>
        )
      },
      {
        path: "todo/redux",
        element: <ReduxTodo />
      },
      {
        path: "todo/zustand",
        element: <ZustandTodo />
      },
      {
        path: "request",
        element: <RequestDemo />,
      }
    ]
  }

])