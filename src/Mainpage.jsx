import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import Task from './components/Task';
import TaskModal from './components/TaskModal';
import { v4 as uuidv4 } from 'uuid';

const Mainpage = () => {
  const { name } = useParams();
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('Add');
  const [id, setId] = useState();
  const [Vname, setVname] = useState('');
  const [Vdescription, setVdescription] = useState('');
  const [displayTasks, setDisplayTasks] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/tasks/${name}`).then((res) => {
      setTasks(res.data.tasks);
    });
  }, []);

  const onModalSubmit = (Tname, Tdescription, id, formData) => {
    if (
      Tname === '' ||
      Tdescription === '' ||
      Tname.split(' ').join('') === '' ||
      Tdescription.split(' ').join('') === ''
    ) {
      setIsModalOpen(false);
      return;
    }
    if (id) {
      axios
        .put(`http://localhost:3000/tasks/${name}/${id}`, {
          name: Tname,
          description: Tdescription,
        })
        .then((res) => {
          console.log(res.data.tasks);
          setTasks(res.data.tasks);
        });
      setIsModalOpen(false);
      return;
    }
    const newId = uuidv4();
    formData.append('id', newId);
    const newTask = {
      id: newId,
      name: Tname,
      description: Tdescription,
      date: new Date(),
      status: false,
    };
    axios.post(`http://localhost:3000/tasks/${name}`, newTask).then((res) => {
      setTasks(res.data.tasks);
    });
    console.log(formData.get('id'));
    axios
      .post(`http://localhost:3000/upload?id=${newId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
    setIsModalOpen(false);
    setId('');
  };

  const onEdit = (id, name, description) => {
    setId(id);
    setVname(name);
    setVdescription(description);
    setTitle('Edit');
    setIsModalOpen(true);
  };

  const onDelete = (id) => {
    axios.delete(`http://localhost:3000/tasks/${name}/${id}`).then((res) => {
      setTasks(res.data.tasks);
    });
  };

  const onDisplay = (id, name, description, date, status) => {
    setDisplayTasks({ id, name, description, date, status });
  };

  return (
    <div className="px-9">
      <div className="text-3xl text-slate-500 font-bold mt-4 mb-8">
        Welcome, {name}!
      </div>
      <div className="flex gap-2">
        <div className="bg-gray-200 rounded px-2" style={{ width: '35%' }}>
          <div className="pb-8 flex items-center justify-between">
            <div className="text-2xl  text-slate-800 font-semibold ">Tasks</div>
            <button
              className="flex bg-gray-500 hover:bg-gray-700 rounded py-1 px-2 gap-2 items-center mt-2"
              onClick={() => {
                setId('');
                setTitle('Add');
                setVname('');
                setVdescription('');
                setIsModalOpen(true);
              }}
            >
              <div className="w-6 h-6">
                <FaPlus className="w-full h-full fill-white" />
              </div>
              <div className="text-white text-lg font-semibold">Add</div>
            </button>
          </div>
          <div className="">
            {tasks.map((task, index) => (
              <Task
                key={index}
                name={task.name}
                description={task.description}
                status={task.status}
                id={task.id}
                onEdit={onEdit}
                onDelete={onDelete}
                onDisplay={onDisplay}
                Mname={name}
              />
            ))}
          </div>
        </div>
        <div className="p-8 pt-12" style={{ width: '70%' }}>
          <div className="">
            <div className="flex justify-between mb-4 items-center text-2xl text-slate-800 font-semibold">
              <div className="text-2xl text-slate-800 font-semibold">
                {displayTasks.name}
              </div>
              <div className="font-normal">
                {displayTasks.name &&
                  (displayTasks.status ? 'completed' : 'pending')}
              </div>
            </div>
            <div className="text-lg text-slate-700 mb-4">
              {displayTasks.description}
            </div>
            {displayTasks.name && (
              <div className="mb-4">
                <img
                  src={`http://localhost:3000/files/${displayTasks.id}`}
                  alt="Task Image"
                  style={{ maxWidth: '100%' }}
                />
              </div>
            )}
            <div className=""></div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <TaskModal
          onClose={() => setIsModalOpen(false)}
          onModalSubmit={onModalSubmit}
          title={title}
          Vname={Vname}
          Vdescription={Vdescription}
          id={id}
        />
      )}
    </div>
  );
};

export default Mainpage;
