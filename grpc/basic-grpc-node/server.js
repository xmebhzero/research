const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;
const fs = require('fs');

const todos = [];
function createTodo(call, callback) {
  const todoItem = {
    id: todos.length + 1,
    text: call.request.text,
  };
  todos.push(todoItem);
  callback(null, todoItem);
}

function readTodosStream(call, callback) {
  todos.forEach((t) => call.write(t));
  call.end();
}

function readTodos(call, callback) {
  callback(null, { items: todos });
}

// Initiate new GRPC Server
const server = new grpc.Server();

// Initialize GRPC services
server.addService(todoPackage.Todo.service, {
  createTodo: createTodo,
  readTodos: readTodos,
  readTodosStream: readTodosStream,
});

// START INSECURE SERVER
// server.bind("0.0.0.0:40000", grpc.ServerCredentials.createInsecure());
// console.log(`Server listening (RAW) at 0.0.0.0:40000`);
// server.start();

// Initiate credentials
const ca_crt = fs.readFileSync("./certs/ca.crt");
console.log(`🚀 ~ ca_crt`, ca_crt);
let credentials = grpc.ServerCredentials.createSsl(
  fs.readFileSync("./certs/ca.crt"),
  [
    {
      cert_chain: fs.readFileSync("./certs/server.crt"),
      private_key: fs.readFileSync("./certs/server.key"),
    },
  ],
  true
);
// let credentials = grpc.ServerCredentials.createSsl();

// START SECURE (SSL) SERVER
server.bindAsync("0.0.0.0:40000", credentials, (error, port) => {
  console.log(`Server listening (SSL) at 0.0.0.0:40000`);
  server.start();
});