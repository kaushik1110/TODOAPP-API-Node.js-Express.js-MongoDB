const express = require('express');
const route = express.Router();

const Model = require('../Database/db');


// @desc get all task
// @route POST  todo/getAllTask
route.get('/getAllTask', async (req, res) => {
    try {
        let get_all_task = await Model.find();
        res.send(get_all_task);
    } catch (error) {
        console.log('getAllTask   ->' + error);
    }
});



// @desc add new task
// @route POST  todo/addTask
route.post('/addTask', async (req, res) => {

    try {
        let insertTask = await Model.create(req.body);
        res.send(insertTask);
    } catch (error) {
        console.log('addTask   ->' + error);
    }

});


// @desc add new task
// @route DELETE todo/deleteTask/:id
route.delete('/deleteTask/:id', async (req, res) => {
    try {
        let delete_task = await Model.findByIdAndRemove({
            _id: req.params.id
        });
        res.send(delete_task);
    } catch (error) {
        console.log('deleteTask   ->' + error);

    }
});

// @desc update task status
// @route PATCH  todo/updateTaskStatus/:id
route.patch('/updateTaskStatus/:id', async (req, res) => {

    let x = await Model.findById({
        _id: req.params.id
    });

    let toggleValue = x.complete;

    if (x.complete) {
        toggleValue = false;
    } else {
        toggleValue = true;
    }

    try {
        let update_task_status = await Model.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                "complete": toggleValue
            }
        });

        let sendResponce = await Model.findById({
            _id: req.params.id
        });

        res.send(sendResponce);

    } catch (error) {

        console.log('update_Task_Status   ->' + error);

    }

});

// @desc update task 
// @route PATCH  todo/updateTask/:id

route.patch('/updateTask/:id', async (req, res) => {

    try {
        await Model.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                "task": req.body.task
            }
        });

        let sendResponce = await Model.findById({
            _id: req.params.id
        });

        res.send(sendResponce);

    } catch (error) {

        console.log('update_Task   ->' + error);

    }

});


// @desc delete all 
// @route DELETE todo/deleteAll
route.delete('/deleteAll', async(req, res)=>{

    try {
        await Model.deleteMany();
        res.send('all task are deleted');
    } catch (error) {
        
        console.log('deleteAll   ->' + error);

    }

});

// @desc delete all complete
// @route DELETE todo/deleteCompleted

route.delete('/deleteCompleted', async(req, res)=>{

    try {

        await Model.deleteMany({complete : true});
        res.send('delete all complete task');
    
    } catch (error) {
        console.log('deleteCompleted   ->' + error);
        
    }
    
});

module.exports = route;