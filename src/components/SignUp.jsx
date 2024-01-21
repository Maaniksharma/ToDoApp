import axios from 'axios';

const SignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const rePassword = e.target.rePassword.value;
    let Accounts;
    console.log(name, email, password, rePassword);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      emailRegex.test(email) &&
      password === rePassword &&
      password.length > 5
    ) {
      axios.get('http://localhost:3000/accounts').then((res) => {
        console.log(res.data);
        Accounts = res.data;
        const FAccounts = Accounts.filter(
          (account) => account.email === email && account.password === password
        );
        if (FAccounts.length !== 0) {
          document.getElementById('response').innerHTML =
            'Already registered User';
        } else {
          axios
            .post('http://localhost:3000/accounts', {
              name: name,
              email: email,
              password: password,
            })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.error(error);
            });
          document.getElementById('Presponse').innerHTML =
            'Sign Up Success. Redirecting to Login page';
          window.open('/', '_self');
        }
      });
    } else
      document.getElementById('response').innerHTML = 'Invalid cridentials';
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen lmt">
      <h1 className="text-3xl font-bold mb-8">Sign Up</h1>
      <div className="text-green-600 text-sm" id="Presponse"></div>
      <div className="text-rose-700 text-sm" id="response"></div>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4  w-96"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold text-xl mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            required
          />
          <label
            className="block text-gray-700 font-semibold text-xl mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold text-xl mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-semibold text-xl mb-2"
            htmlFor="rePassword"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="rePassword"
            name="rePassword"
            type="password"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded text-xl font-semibold focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
