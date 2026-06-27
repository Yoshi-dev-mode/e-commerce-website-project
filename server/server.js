const express = require("express");
const app = express();
const PORT = 5000;
const pool = require("./db")
const cors = require("cors");

app.use(express.json())
app.use(cors());

app.post('/foodVariants', async(req, res)=> {
    try {
        const {user_food, food_image, price_total, quantity} = req.body;
        const variants = await pool.query("INSERT INTO variants(user_food, food_image, price_total, quantity) VALUES ($1, $2, $3, $4) RETURNING * ", [user_food, food_image, price_total, quantity])
        res.json(variants.rows[0])
    } catch (error) {
        console.error(error.message);
    }
})

app.delete('/foodVariants/:user_id', (req,res)=> {
    try {
        const {user_id} = req.params;
        pool.query('DELETE FROM variants WHERE user_id = $1', [user_id], (error, results)=>{
            if (error) throw error;
            res.status(200).send(`successfully Deleted ID: ${user_id}`);
        })

    } catch (error) {
        console.error(error.message)
    }
    
      
})

app.get('/foodVariants', async(req, res)=> {
    try {
        const getUsers = await pool.query("SELECT * FROM variants");
        res.json(getUsers.rows)
    } catch (error) {
        console.error(error.message)
    }
})

app.get('/foods', async(req,res)=> {
    try {
        const getFoods = await pool.query("SELECT * FROM foods")
        res.json(getFoods.rows)
    } catch (error) {
        console.log('There is an error in food section!')
    }
})

app.get('/foods/:id', async(req, res)=> {
    try {
        const {id} = req.params
        const getUsers = await pool.query("SELECT * FROM foods WHERE id = $1", [id]);
        res.json(getUsers.rows)
    } catch (error) {
        console.error(error.message)
    }
})

app.get('/canned', async(req, res)=> {
    try {
        const getUsers = await pool.query("SELECT * FROM canned_drinks");
        res.json(getUsers.rows)
    } catch (error) {
        console.error(error.message)
    }
})

app.get('/canned/:id', async(req, res)=> {
    try {
        const {id} = req.params
        const getUsers = await pool.query("SELECT * FROM canned_drinks WHERE id = $1", [id]);
        res.json(getUsers.rows)
    } catch (error) {
        console.error(error.message)
    }
})


app.get('/sweets', async(req, res)=> {
    try {
        const getUsers = await pool.query("SELECT * FROM sweet_drinks");
        res.json(getUsers.rows)
    } catch (error) {
        console.error(error.message)
    }
})

app.get('/sweets/:id', async(req, res)=> {
    try {
        const {id} = req.params
        const getUsers = await pool.query("SELECT * FROM sweet_drinks WHERE id = $1", [id]);
        res.json(getUsers.rows)
    } catch (error) {
        console.error(error.message)
    }
});

app.get('/burst/:id', async (req,res)=>{
    try {
        const {id} = req.params
        const getUsers = await pool.query("SELECT * FROM burst_drinks WHERE id = $1", [id]);
        res.json(getUsers.rows)
    } catch (error) {
        console.error(error.message)
    }
})


app.listen(PORT, console.log(`Server is listening to port ${PORT}`))