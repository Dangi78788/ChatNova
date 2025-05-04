import * as ai from "../services/ai.service.js";

export const getResult = async (req, res) => {  
    try {
        const { prompt } = req.query;
        const result = await ai.generateResult(prompt);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred while generating the result.", errorMessage: error.message });
    }
    }