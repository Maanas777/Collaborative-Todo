import Todo from "../models/todo.model.js";
import { getSocketInstance } from "../utils/socket.js";

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find().populate("createdBy", "username email").populate("updatedBy", "username email")
        .sort({ createdAt: -1 })
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch todos", error: error.message });
    }
};

export const createTodo = async (req, res) => {
    console.log(req.body, "body received");

    const { title, user_id } = req.body;

    console.log('User ID:', user_id);

    try {
        
        const newTodo = await Todo.create({ title, createdBy: user_id });

    
        const populatedTodo = await newTodo.populate('createdBy'); 

      
        const io = getSocketInstance();
        io.emit('todoAdded', populatedTodo);

    
        res.status(201).json(populatedTodo);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to create todo", error: error.message });
    }
};


export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, completed, updatedBy } = req.body;

        console.log(updatedBy,"updatedBy")
    try {
        
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            {
                title,
                completed,
                updatedBy,
                updatedAt: new Date(),
            },
            { new: true }
        )
        .populate("createdBy", "username email")  
        .populate("updatedBy", "username email"); 

        console.log(updatedTodo)

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

      
        const io = getSocketInstance();

        
        io.emit('todoUpdated', updatedTodo);

      
        res.status(200).json(updatedTodo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update todo", error: error.message });
    }
};



export const deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        await Todo.findByIdAndDelete(id);
        const io = getSocketInstance();
        io.emit('todoDeleted',id);
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete todo", error: error.message });
    }
};
