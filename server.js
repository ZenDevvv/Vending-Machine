import app from "./index.js"

const PORT = 8008;
app.listen(PORT, () => {
    console.log(`Go to http://localhost:${PORT}/api-docs for API documentation`);
}) 