import mongoose from "mongoose";

export const TodoSchema = new mongoose.Schema({
    todoTopic: {
        type: String,
        required: [true, "Please state the task."]
    },
    dateAndTime: {
        type: String,
        required: [true, "Please state date and time for this task"]
    }
});

export default mongoose.model.Todos || mongoose.model('Todo', TodoSchema);