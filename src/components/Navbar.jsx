import { Link, useParams } from 'react-router-dom';

const NavBar = () => {
  const { name } = useParams();
  console.log(name);
  return (
    <div className="flex justify-between shadow-lg px-14 py-6 items-center">
      {/* {name && (
        <div className="text-slate-700 text-2xl" id="name">
          Welcome {name}
        </div>
      )} */}
      <div className="text-3xl text-sky-500 font-sans font-semibold">Tasky</div>
      <Link to={'/'}>
        <div className="text-slate-700 text-2xl" id="name"></div>
        <div className="text-xl text-sky-700 font-semibold">Login</div>
      </Link>
    </div>
  );
};

export default NavBar;
