const fs = require('fs');
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const text = process.argv[2];
console.log(`Text params: ${text}`);

// CONNECT INSECURE
// const client = new todoPackage.Todo(
//   "localhost:40000",
//   grpc.credentials.createInsecure()
// );

// CONNECT SECURE (WITH CERT)
const credentials = grpc.credentials.createSsl(
	fs.readFileSync('./certs/ca.crt'),
	fs.readFileSync('./certs/client.key'),
	fs.readFileSync('./certs/client.crt')
);
const client = new todoPackage.Todo(
  'localhost:40000',
  credentials,
);

client.createTodo(
  {
    id: -1,
    text: text,
  },
  (err, response) => {
    console.log("createTodo response:" + JSON.stringify(response));
  }
);

/*
client.readTodos(null, (err, response) => {
    console.log("read the todos from server " + JSON.stringify(response))
    if (!response.items)
        response.items.forEach(a=>console.log(a.text));
})
*/

const call = client.readTodosStream();
call.on("data", (item) => {
  console.log("readTodosStream response: " + JSON.stringify(item));
});

call.on("end", (e) => console.log("server done!"));
