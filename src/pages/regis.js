import { useRouter } from "next/router";

export default function Regis() {
  const router = useRouter();

  const regisConsume = async (account) => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    };

    await fetch("http://localhost:3000/api/register", options)
      .then((response) => {
        if (response.ok) {
          alert("Register Successfully!");
          router.push("/");
          return response.json();
        } else {
          throw new Error("Invalid register!");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        if (error) {
          alert("Register gagal!");
        }
      });
  };

  const signIn = (event) => {
    router.push("/");
  };

  const signUp = async (event) => {
    event.preventDefault();

    const usernameValue = document.getElementById("username").value;
    const emailValue = document.getElementById("email").value;
    const passValue = document.getElementById("password").value;
    const passValueValid = document.getElementById("passwordValid").value;

    if (passValue != passValueValid) {
      alert(`Password doesn't match`);
      formRegis.reset();
    } else {
      const account = {
        username: usernameValue,
        email: emailValue,
        password: passValueValid,
      };

      await regisConsume(account);
    }
  };

  return (
    <>
      <form className="w-full m-auto mt-40">
        <div className="mb-6">
          <label htmlFor="email-address-icon" className="block mb-2 text-sm font-medium text-purple-900 dark:text-white">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </div>
            <input
              type="text"
              id="username"
              className="bg-purple-50 border border-purple-300 text-purple-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-purple-700 dark:border-purple-600 dark:placeholder-purple-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
            ></input>
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="email-address-icon" className="block mb-2 text-sm font-medium text-purple-900 dark:text-white">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </div>
            <input
              type="text"
              id="email"
              className="bg-purple-50 border border-purple-300 text-purple-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-purple-700 dark:border-purple-600 dark:placeholder-purple-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
            ></input>
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-purple-900 dark:text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-purple-50 border border-purple-300 text-purple-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-purple-700 dark:border-purple-600 dark:placeholder-purple-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          ></input>
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-purple-900 dark:text-white">
            Confirm password
          </label>
          <input
            type="password"
            id="passwordValid"
            className="bg-purple-50 border border-purple-300 text-purple-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-purple-700 dark:border-purple-600 dark:placeholder-purple-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          ></input>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={signUp}
        >
          Sign Up
        </button>
        <p className="text-right">
          Sudah punya akun?{" "}
          <button className="text-blue-500" onClick={signIn}>
            Sign In
          </button>
        </p>
      </form>
    </>
  );
}
