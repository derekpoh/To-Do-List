const ToDoList = require("../models/ToDoList")


const index = async (req,res) => {
    try {
        const list = await ToDoList.find({"owner": req.params.id})
        res.status(201).json(list)
    }
    catch(error) {
        res.status(500).json(error)
    }
}

const create = async (req,res) => {
    try {
        const item = await ToDoList.create(req.body);
        res.status(201).json(item)
    }
    catch(error) {
        res.status(500).json(error)
    }
}

const handleChecked = async (req, res) => {
    try {
      const item = await ToDoList.findById(req.params.id);
      if (item) {
        item.checked = !item.checked;
        await item.save();
        res.status(200).json(item); 
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };

  const show = async (req,res) => {
    try {
      const item = await ToDoList.findOne({"_id": req.params.id})
      res.status(201).json(item)
    }
    catch(error) {
      res.status(500).json(error)
    }
  }

  const update = async (req,res) => {
    const {name, attachment, attachmentName} = req.body
    try {
      const item = await ToDoList.findByIdAndUpdate(
        {"_id": req.params.id},
        {name: `${name}`,
        attachment: `${attachment}`,
        attachmentName: `${attachmentName}`},
        {new: true})
      res.status(201).json(item)
    }
    catch(error) {
      res.status(500).json(error)
    }
  }
  

module.exports = {
    index,
    create,
    handleChecked,
    show,
    update,
}