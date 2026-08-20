import { researchAndGetAnswer } from "../services/chat.js"

// CONTROLLER FUNCTION THAT RESEARCHES AND RETURN USER A RESPONSE BASED ON THE QUERY
export const getAnswer = async (req, res) => {

    // extracting the question and conversation id from the body
    const { question, conversationId } = req.body;

    // if question is not provided in that case we are returning an error to the user
    if(!question.trim().length) {
        return res.status(400).json({
            status: "success",
            error: "Please provide the question"
        })
    }

    try {
        const result = await researchAndGetAnswer(question, conversationId)
    }
    catch (err) {
        next(err);
    }
}