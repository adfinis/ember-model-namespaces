import JSONAPISerializer from 'ember-data/serializers/json-api';
import { warn } from '@ember/debug';
import Ember from 'ember';
import { dasherize } from '@ember/string';
import { pluralize, singularize } from 'ember-inflector';

const { testing } = Ember;

const payloadTypeFromModelName = (name, namespace, pluralizedPayloadType) => {
  let dasherized = dasherize(name)
    .replace(namespace, '')
    .replace(/(^-|-$)/g, '')
  return pluralizedPayloadType ? pluralize(dasherized) : singularize(dasherized);
};

const modelNameFromPayloadType = (type, namespace) => {
  return singularize(dasherize(`${namespace}-${type}`));
};

export default JSONAPISerializer.extend({
  namespace: null,
  pluralizedPayloadType: false,

  init() {
    this._super(...arguments);

    if (!this.get('namespace')) {
      warn('`namespace` on serializer must be set', testing, {
        id: 'ember-model-namespaces.no-namespace'
      });
    }
  },

  payloadTypeFromModelName(name) {
    return payloadTypeFromModelName(name, this.get('namespace'), this.get('pluralizedPayloadType'));
  },
  payloadKeyFromModelName(name) {
    return payloadTypeFromModelName(name, this.get('namespace'), this.get('pluralizedPayloadType'));
  },
  modelNameFromPayloadType(type) {
    return modelNameFromPayloadType(type, this.get('namespace'));
  },
  modelNameFromPayloadKey(type) {
    return modelNameFromPayloadType(type, this.get('namespace'));
  }
});
