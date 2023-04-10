import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [allKonserms, setKonser] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: new Headers({
        // Authorization: sessionStorage.getItem("token"),
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      }),
    };

    fetch("http://localhost:3000/api/user/read", options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserId(data.user.id);
        sessionStorage.setItem("userId", data.user.id);
      });

    // read
    fetch("http://localhost:3000/api/konser/read")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setKonser(data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)));
      });
  });

  // create
  const addKonserConsume = async (konser) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(konser),
    };

    await fetch("http://localhost:3000/api/konser/create", options)
      .then((response) => {
        if (response.ok) {
          alert("Konser added successfully!");
          document.getElementById("konserForm").reset();
          return response.json();
        } else {
          throw new Error("Invalid to create!");
        }
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        if (error) {
          alert("Failed!");
        }
      });
  };

  const createKonser = (event) => {
    event.preventDefault();

    var nameValue = document.getElementById("name").value;
    var descriptionValue = document.getElementById("description").value;

    const konser = {
      name: nameValue,
      description: descriptionValue,
      userId: userId,
    };

    addKonserConsume(konser);
  };

  // edit
  const btnEdit = (id, name, description) => {
    document.getElementById("add").style = "display:none";
    document.getElementById("update").style = "display:block";
    document.getElementById("cancel").style = "display:block";

    document.getElementById("id-konser").value = id;
    document.getElementById("name").value = name;
    document.getElementById("description").value = description;
  };

  const btnEditCancel = (event) => {
    event.preventDefault();

    document.getElementById("add").style = "display:block";
    document.getElementById("update").style = "display:none";
    document.getElementById("cancel").style = "display:none";

    document.getElementById("konserForm").reset();
  };

  // update
  const editConsume = async (konser) => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(konser),
    };

    await fetch("http://localhost:3000/api/konser/update", options)
      .then((response) => {
        if (response.ok) {
          alert("Konser has been updated!");
          document.getElementById("konserForm").reset();
          return response.json();
        } else {
          throw new Error("Invalid edit");
        }
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        if (error) {
          alert("Edit failed!");
        }
      });
  };

  const editDone = (event) => {
    event.preventDefault();

    var idEditValue = document.getElementById("id-konser").value;
    var nameEditValue = document.getElementById("name").value;
    var descriptionEditValue = document.getElementById("description").value;

    const konser = {
      id: Number(idEditValue),
      name: nameEditValue,
      description: descriptionEditValue,
    };

    editConsume(konser);
  };

  // delete
  const delKonser = async (id) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    };

    const response = await fetch("http://localhost:3000/api/konser/delete", options);
    const responseJson = await response.json();
  };

  // signOut
  const signOut = () => {
    sessionStorage.clear();
    router.push("/");
    history.replaceState(null, null, "/");
  };

  return (
    <>
      {/* navbar */}
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-purple-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Konser in the World</span>
          </a>
          <div className="flex md:order-2">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={signOut}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <form className="w-full mt-20 m-auto" id="konserForm">
        <input type="hidden" name="id" id="id-konser"></input>
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-purple-900 dark:text-white">
            Konser Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-purple-50 border border-purple-300 text-purple-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-purple-700 dark:border-purple-600 dark:placeholder-purple-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></input>
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-purple-900 dark:text-white">
            Konser Descriptions
          </label>
          <textarea
            id="description"
            rows="4"
            className="block p-2.5 w-full text-sm text-purple-900 bg-purple-50 rounded-lg border border-purple-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-purple-700 dark:border-purple-600 dark:placeholder-purple-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Leave a comment..."
          ></textarea>
        </div>

        <div className="flex justify-around">
          <button
            type="submit"
            id="add"
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={createKonser}
          >
            Add
          </button>
          <button
            type="submit"
            id="update"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={editDone}
            hidden
          >
            Update
          </button>
          <button
            type="submit"
            id="cancel"
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={() => {
              btnEditCancel;
            }}
            hidden
          >
            Cancel
          </button>
        </div>
      </form>

      <h1 className="text-3xl m-auto text-center my-3">List Konser</h1>
      {allKonserms.map((data) => {
        return (
          <div className="flex justify-center m-auto" key={data.id}>
            <div href="#" className="flex flex-col items-center bg-white border border-purple-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-purple-100 dark:border-purple-700 dark:bg-purple-800 dark:hover:bg-purple-700 my-2">
              <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="https://source.unsplash.com/random/?bts" alt=""></img>
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-purple-900 dark:text-white">{data.name}</h5>
                <p className="mb-3 font-normal text-purple-700 dark:text-purple-400">{data.description}</p>
              </div>
            </div>
            <div className="action flex flex-col m-2">
              <button
                type="button"
                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-1 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                onClick={() => {
                  btnEdit(data.id, data.name, data.description);
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-1 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                onClick={() => {
                  delKonser(data.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
