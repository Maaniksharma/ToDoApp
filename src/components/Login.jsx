import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    let Accounts;
    axios.get('http://localhost:3000/accounts').then((res) => {
      console.log(res.data);
      Accounts = res.data;
      const FAccounts = Accounts.filter(
        (account) => account.email === email && account.password === password
      );
      if (FAccounts.length !== 0) {
        document.getElementById('presponse').innerHTML =
          'Login Success Redirection to Mainpage';
        const params = FAccounts[0].name.toLowerCase();
        window.open(`/mainpage/${params}`, '_self');
      } else {
        document.getElementById('response').innerHTML =
          'Invalid Email or Password';
      }
    });
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen lmt">
      <h1 className="text-3xl font-bold mb-8">Login</h1>
      <div className="text-green-600 text-sm" id="presponse"></div>
      <div className="text-rose-700 text-sm" id="response"></div>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-h-80
         w-96"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2 text-xl"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="text-lg shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-semibold text-xl mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className=" text-lg bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
          <Link to="/signup">
            <div className="text-sky-600 text-sm text-semibold">Sign Up</div>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
