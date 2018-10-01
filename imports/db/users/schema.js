import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
  _id: { type: String },
  username: { type: String, optional: true },
  emails: { type: Array },
  'emails.$': { type: Object },
  'emails.$.address': { type: String },
  'emails.$.verified': { type: Boolean },
  createdAt: { type: Date },
  services: { type: Object, blackbox: true, optional: true },
  roles: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  'roles.$': {
    type: String,
  },
  profile: {
    type: Object,
    optional: true,
  },
  'profile.firstName': {
    type: String,
    optional: true,
  },
  'profile.lastName': {
    type: String,
    optional: true,
  },
});
