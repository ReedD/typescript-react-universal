import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { IUser } from 'interfaces/user';
import { connection, Document, Model, Schema } from 'mongoose';

export const userSchema = new Schema(
  {
    createdAt: Date,
    email: String,
    hashedPassword: String,
    name: String,
  },
  { timestamps: true },
);

userSchema.pre('validate', function(next) {
  if (this.password) {
    this.setPassword(this.password).then(next, next);
  } else {
    next();
  }
});

userSchema.methods.setPassword = function(password: string) {
  return bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(password, salt))
    .then(hashedPassword => {
      this.hashedPassword = hashedPassword;
    });
};

userSchema.methods.authenticate = function(password: string) {
  return bcrypt.compare(password, this.hashedPassword);
};

export interface IUserDocument extends IUser, Document {
  authenticate: (password: string) => Promise<boolean>;
  setPassword: (password: string) => Promise<void>;
}

export const UserModel = connection.model<IUserDocument>('User', userSchema);

const test = new UserModel({
  fake: 'test',
});
