export default function() {
  this.urlPrefix = '';
  this.namespace = '';
  this.timing = 400;

  this.get('/x-posts', function({ posts }) {
    return posts.all();
  });
  this.get('/y-posts', function({ posts }) {
    return posts.all();
  });
}
