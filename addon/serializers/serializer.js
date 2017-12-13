import JSONAPISerializer from 'ember-data/serializers/json-api';
import { warn } from '@ember/debug';
import Ember from 'ember';
import { dasherize } from '@ember/string';
import { pluralize, singularize } from 'ember-inflector';

const { testing } = Ember;

const payloadTypeFromModelName = (name, namespace) => {
  return pluralize(
    dasherize(name)
      .replace(namespace, '')
      .replace(/(^-|-$)/g, '')
  );
};

const modelNameFromPayloadType = (type, namespace) => {
  return singularize(dasherize(`${namespace}-${type}`));
};

export default JSONAPISerializer.extend({
  namespace: null,

  init() {
    this._super(...arguments);

    if (!this.get('namespace')) {
      warn('`namespace` on serializer must be set', testing, {
        id: 'ember-model-namespaces.no-namespace'
      });
    }
  },

  payloadTypeFromModelName(name) {
    return payloadTypeFromModelName(name, this.get('namespace'));
  },
  payloadKeyFromModelName(name) {
    return payloadTypeFromModelName(name, this.get('namespace'));
  },
  modelNameFromPayloadType(type) {
    return modelNameFromPayloadType(type, this.get('namespace'));
  },
  modelNameFromPayloadKey(type) {
    return modelNameFromPayloadType(type, this.get('namespace'));
  }
});
