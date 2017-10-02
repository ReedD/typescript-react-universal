import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import * as Debug from 'debug';
import { IUser } from 'interfaces';
import { connection, Document, Model, Schema } from 'mongoose';

const debug = Debug('app:model:user');

export const userSchema = new Schema(
  {
    createdAt: Date,
    email: String,
    hashedPassword: String,
    name: String,
  },
  { timestamps: true },
);

userSchema.virtual('password').set(function(password: string) {
  this._password = password;
});

userSchema.pre('validate', async function(next) {
  debug('Validating');
  if (this._password) {
    await this.setPassword(this._password);
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

userSchema.path('email').validate({
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
