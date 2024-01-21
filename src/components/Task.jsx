/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaTrash, FaPencilAlt, FaCheck } from 'react-icons/fa';
import axios from 'axios';

const Task = ({
  id,
  name,
  description,
  date,
  status,
  onEdit,
  onDelete,
  onDisplay,
  Mname,
}) => {
  const [vStatus, setVStatus] = useState(status);
  const onStatusChange = () => {
    setVStatus(!vStatus);
    console.log(vStatus, Mname, id);
    console.log('come here');
    axios
      .put(`http://localhost:3000/tasks/${Mname}/${id}`, {
        status: !vStatus,
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className=" border-2 rounded border-gray-300 hover:bg-gray-300 px-3 py-2 mb-2"
      onClick={() => {
        onDisplay(id, name, description, date, vStatus);
      }}
    >
      <div className="flex justify-between">
        <div className="text-xl font-normal">{name}</div>
        <div className="flex gap-2 items-center">
          <div className="text-gray-700  text-sm">{date}</div>
          <button
            className="w-8 h-8 border-2 rounded pl-1.5"
            onClick={(e) => {
              onDelete(id);
              e.stopPropagation();
            }}
          >
            <FaTrash />
          </button>
          <button
            className="w-8 h-8 border-2 rounded pl-1.5"
            onClick={() => {
              onEdit(id, name, description);
            }}
          >
            <FaPencilAlt />
          </button>
          <button
            className="w-8 h-8 border-2 rounded pl-1.5"
            onClick={(e) => {
              onStatusChange();
              e.stopPropagation();
              onDisplay(id, name, description, date, !vStatus);
            }}
          >
            {vStatus && <FaCheck />}
          </button>
        </div>
      </div>
      <div className="text-sm text-gray-800 overflow-hidden  h-6 truncate">
        {description}
      </div>
    </div>
  );
};

export default Task;
