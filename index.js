import express from "express";
import calculateChangeRoute from "./routes/change.js";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
const swaggerDocument = YAML.load("./swagger.yaml")

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use("/calculate-change", calculateChangeRoute);

export default app;
