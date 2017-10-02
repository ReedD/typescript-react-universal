import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import * as Debug from 'debug';
import { IUser } from 'interfaces';
import { connection, Document, Model, Schema } from 'mongoose';

const debug = Debug('app:model:user');

export const userSchema = new Schema(
  {
    createdAt: Date,
    email: {
      required: 'Email required',
      type: String,
    },
    hashedPassword: {
      type: String,
    },
    name: {
      required: 'Name required',
      type: String,
    },
  },
  { timestamps: true },
);

userSchema.virtual('password').set(function(password: string) {
  this._password = password;
});

userSchema.virtual('passwordConfirm').set(function(password: string) {
  this._passwordConfirm = password;
});

userSchema.pre('validate', async function(next) {
  debug('Validating');
  if (this._password) {
    await this.setPassword(this._password);
  } else if (this.isNew) {
    this.invalidate('password', 'Password required');
  }

  if (
    (this.isNew || (this._password && this._passwordConfirm)) &&
    this._password !== this._passwordConfirm
  ) {
    this.invalidate('password', 'Passwords do not match');
    this.invalidate('passwordConfirm', 'Passwords do not match');
  }

  next();
});

userSchema.pre('save', async next => {
  debug('Saving');
  next();
});

userSchema.post('save', async user => {
  debug('Saved: %O', user);
});

userSchema
  .path('email')
  .validate((email: string) => {
    return /^.+@.+\..+$/.test(email);
  }, 'Invalid email address')
  .validate({
    isAsync: true,
    async validator(email: string, next: any) {
      debug('Checking db for existing email');
      const notFound = !await User.count({ email }).exec();
      debug(`Email ${notFound && 'not '}found`);
      if (notFound) return next(true);
      this.invalidate('email', 'email has already been registered', email);
      return next(false);
    },
  });

userSchema.methods.setPassword = async function(password: string) {
  debug('Hashing password');
  const salt = await bcrypt.genSalt(10);
  this.hashedPassword = await bcrypt.hash(password, salt);
  debug('Password hashed');
};

userSchema.methods.authenticate = function(password: string) {
  return bcrypt.compare(password, this.hashedPassword);
};

export interface IUserDocument extends IUser, Document {
  authenticate: (password: string) => Promise<boolean>;
  setPassword: (password: string) => Promise<void>;
}

const User = connection.model<any>('User', userSchema);
export default User;
