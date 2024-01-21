/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/uploads/');
  },
  filename: function (req, file, cb) {
    console.log(req.query.id);
    const taskId = req.query.id;
    const fileName = `${taskId}-${file.originalname}`;
    cb(null, fileName);
  },
});
const port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
const upload = multer({ storage: storage });

app.get('/Accounts', (req, res) => {
  fs.readFile('./src/Data/Accounts.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading accounts file');
      return;
    }
    const accounts = JSON.parse(data);
    res.send(accounts);
  });
});

app.get('/files/:id', (req, res) => {
  const id = req.params.id;
  const dirPath = './src/uploads/';
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      res.status(500).send('Error reading directory');
      return;
    }
    const matchingFiles = files.filter((file) => file.startsWith(id));
    if (matchingFiles.length === 0) {
      res.status(404).send('File not found');
      return;
    }
    const filePath = path.resolve(dirPath, matchingFiles[0]);
    res.sendFile(filePath);
  });
});

app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully');
});

app.get('/tasks/:name', (req, res) => {
  fs.readFile('./src/Data/Tasks.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error reading tasks file');
      return;
    } else {
      const tasks = JSON.parse(data);
      const Ftasks = tasks.filter((task) => task.name === req.params.name);
      res.send(Ftasks[0]);
    }
  });
});

app.post('/Accounts', (req, res) => {
  fs.readFile('./src/Data/Accounts.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading accounts file');
      return;
    }
    let accounts = JSON.parse(data);
    accounts = [...accounts, req.body];
    fs.writeFile(
      './src/Data/Accounts.json',
      JSON.stringify(accounts),
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error writing accounts file');
          return;
        } else res.send('POST request to the server');
      }
    );
  });
});

app.post('/tasks/:name', (req, res) => {
  fs.readFile('./src/Data/Tasks.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      console.log('error ocurred file reading');
      res.status(500).send('Error reading tasks file');
      return;
    } else {
      const TASKS = JSON.parse(data);
      const UpdatedTASKS = TASKS.map((task) => {
        if (task.name === req.params.name) {
          return {
            ...task,
            tasks: [...task.tasks, req.body],
          };
        }
        return task;
      });
      const ToSendTasks = UpdatedTASKS.filter(
        (task) => task.name === req.params.name
      );
      fs.writeFile(
        './src/Data/Tasks.json',
        JSON.stringify(UpdatedTASKS),
        (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Error writing tasks file');
            return;
          } else res.send(ToSendTasks[0]);
        }
      );
    }
  });
});

app.put(`/tasks/:name/:id`, (req, res) => {
  fs.readFile('./src/Data/Tasks.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading tasks file');
      return;
    } else {
      const TASKS = JSON.parse(data);
      const UpdatedTASKS = TASKS.map((task) => {
        if (task.name === req.params.name) {
          task.tasks = task.tasks.map((task) => {
            if (task.id === req.params.id) {
              return {
                ...task,
                ...req.body,
              };
            } else return task;
          });
        }
        return task;
      });
      const ToSendTasks = UpdatedTASKS.filter(
        (task) => task.name === req.params.name
      );
      fs.writeFile(
        './src/Data/Tasks.json',
        JSON.stringify(UpdatedTASKS),
        (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Error writing tasks file');
            return;
          } else res.send(ToSendTasks[0]);
        }
      );
    }
  });
});

app.delete(`/tasks/:name/:id`, (req, res) => {
  fs.readFile('./src/Data/Tasks.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading tasks file');
      return;
    } else {
      const TASKS = JSON.parse(data);
      const UpdatedTASKS = TASKS.map((task) => {
        if (task.name === req.params.name) {
          task.tasks = task.tasks.filter((task) => task.id !== req.params.id);
        }
        return task;
      });
      const ToSendTasks = UpdatedTASKS.filter(
        (task) => task.name === req.params.name
      );
      fs.writeFile(
        './src/Data/Tasks.json',
        JSON.stringify(UpdatedTASKS),
        (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Error writing tasks file');
            return;
          } else res.send(ToSendTasks[0]);
        }
      );
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
