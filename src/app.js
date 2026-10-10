import express from "express";

import suppliersRouter  from "./modules/suppliers/suppliers.routes.js";
import productRoutes from "./modules/products/products.routes.js";
import salesRouter from "./modules/sales/sales.routes.js";
import schemaRouter from "./modules/schema/schema.routes.js";
import reportsRouter from "./modules/reports/reports.routes.js";
import seedRouter from "./modules/seed/seed.routes.js";


const app = express();

app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the API" 
    });
});

app.use("/suppliers", suppliersRouter );
app.use("/products", productRoutes);
app.use("/sales", salesRouter);
app.use("/database", schemaRouter);
app.use("/reports", reportsRouter);
app.use("/seed", seedRouter);

export default app;