import { config } from "dotenv";
import e from "express";
import { query } from "./db/index.js";
import cors from "cors"


config();

//Create an express app
const app = e();

app.use(cors());

//Middle ware to parse req data i.e json  into java object 
app.use(e.json());



const port = process.env.PORT || 3002;


app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await query("SELECT * FROM restaurants");
        // console.log("Restaurants : ", results["rows"]);

        res.status(200).json({
            status: "success",
            statusCode: 200,
            totalRows: results.rows.length,
            data: {
                restaurants: results.rows
            }
        });

    } catch (error) {
        // console.error("Error fetching restaurants:", error);

        res.status(500).json({
            status: "error",
            statusCode: 500,
            message: "An error occurred while fetching restaurants.",
            errorDetails: error.message
        });
    }






});

app.get("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const restaurantId = req.params.id;


        const result = await query("SELECT * FROM restaurants WHERE id=$1", [restaurantId]);


        if (result.rowCount === 0) {
            return res.status(404).json({
                status: "fail",
                statusCode: 404,
                totalRows: result.rowCount,
                message: `Restaurant with ID ${restaurantId} not found.`,
                data: { restaurant: [] }
            });
        }


        res.status(200).json({
            status: "success",
            statusCode: 200,
            totalRows: result.rowCount,
            data: { restaurant: result.rows[0] }
        });
    } catch (error) {

        // console.error("Error fetching restaurant data:", error.message);

        res.status(500).json({
            status: "error",
            statusCode: 500,
            message: "Internal Server Error."
        });
    }
});




app.post("/api/v1/restaurants", async (req, res) => {
    try {
        const { name, location, price_range } = req.body;


        const result = await query(
            "INSERT INTO restaurants(name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
            [name, location, price_range]
        );

        res.status(201).json({
            status: "success",
            statusCode: 201,
            data: { restaurant: result.rows[0] }
        });
    } catch (error) {
        // console.error("Error while saving data:", error.message);

        res.status(500).json({
            status: "error",
            statusCode: 500,
            message: "Internal Server Error. Please try again later."
        });
    }
});




app.put("/api/v1/restaurants/:id", async (req, res) => {


    try {
        const { name, location, price_range } = req.body;
        const id = req.params.id;

        console.log("update restaurant which has id :", req.params.id);
        console.log("values that need to update are : ", req.body);


        // validating data
        if (!name || !location || !price_range) {
            return res.status(400).json({
                status: "fail",
                statusCode: 400,
                message: "All fields are required."
            });
        }


        const result = await query("UPDATE  restaurants SET name=$1,location=$2,price_range=$3 WHERE id=$4 RETURNING *", [name, location, price_range, id]);

        // send if data id exists
        if (result.rowCount === 0) {
            return res.status(404).json({
                status: "fails",
                statusCode: "404",
                message: `Restaurant with ${id} not found`
            });
        }

        //Send if data sucessfully updated
        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Restaurant updated successfully.",
            data: {
                restaurant: result.rows[0],
            },
        });

    } catch (error) {
        // console.error("Error updating restaurant:", error.message);

        res.status(500).json({
            status: "error",
            statusCode: 500,
            message: "Internal Server Error. Please try again later.",
        });
    }
});

//delete 
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await query("DELETE FROM restaurants where id=$1", [id]);

        //Not found with given id 
        if (result.rowCount === 0) {
            return res.status(404).json({
                status: "fail",
                statusCode: 404,
                message: `Restaurant with ${id} not found.`
            });
        }

        //Successfully deleted

        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: `Restaurant with ID ${id} was successfully deleted.`,

        });

    } catch (error) {
        console.error("Error while deleting restaurant:", error.message);


        res.status(500).json({
            status: "error",
            statusCode: 500,
            message: "Internal Server Error. Please try again later."
        });
    }
});

//Define a route
app.listen(port, () => {
    console.log(`Server is running on ${port}...`);
})