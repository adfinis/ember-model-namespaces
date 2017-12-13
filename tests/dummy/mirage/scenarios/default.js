export default function(server) {
  let user = server.create('user');

  server.createList('post', 10, { user });
}
