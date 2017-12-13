import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model() {
    return hash({
      x: this.store.findAll('x-post', { include: 'user' }),
      y: this.store.findAll('y-post', { include: 'user' })
    });
  }
});
