import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const calendarSchema = new mongoose.Schema({
    id: { type: String, required: true },
    userID: { type: String, required: true },
    title: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date },
    allDay: { type: Boolean }
})
calendarSchema.plugin(uniqueValidator)
export const Calendar = mongoose.model('calendar', calendarSchema)

const userSchema = new mongoose.Schema({
    userID: { type: String, default: "U" + Date.now() },
    name: { type: String, required: [true, 'Please enter your name'] },
    email: { type: String, required: [true, 'Please enter your email'], unique: true },
    work_name: { type: String, required: [true, 'Please enter your work name'] },
    password: { type: String, required: [true, 'Please enter your password'] },
    role: { type: Number, default: 1 },
    status: { type: Number, default: 0 },
    is_delete: { type: Number, default: 0 },
    created_at: { type: Date, default: new Date(Date.now()) },
    updated_at: { type: Date, default: new Date(Date.now()) },
    avatar: {
        public_id: { type: String, required: true, },
        url: { type: String, required: true, },
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})
userSchema.plugin(uniqueValidator)
export const User = mongoose.model('user', calendarSchema)

