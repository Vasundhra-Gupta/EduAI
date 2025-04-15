import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const userSchema = new Schema(
    {
        role: {
            type: String,
            enum: ['Educator', 'Student'],
            default: 'Student',
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

userSchema.plugin(mongooseAggregatePaginate);

// Hash password before saving pre hook
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

export const User = new model('User', userSchema);
