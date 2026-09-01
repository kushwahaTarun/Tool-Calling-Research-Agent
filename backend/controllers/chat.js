import { researchAndGetAnswer } from "../services/chat.js";

function writeSse(res, event) {
    if (res.writableEnded) return;
    res.write(`data: ${JSON.stringify(event)}\n\n`);
    if (typeof res.flush === "function") res.flush();
}

// CONTROLLER FUNCTION THAT RESEARCHES AND RETURN USER A RESPONSE BASED ON THE QUERY
export const getAnswer = async (req, res) => {
    const { question, conversationId } = req.body;

    if (!question || !question.trim().length) {
        return res.status(400).json({
            status: "success",
            error: "Please provide the question",
        });
    }

    res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders();
    if (res.socket) res.socket.setNoDelay(true);

    writeSse(res, { type: "started" });

    // Server-only callback. Frontend does not send this in the body.
    // runAgent calls this whenever a tool starts, a tool finishes, or the answer is ready.
    const onEvent = (event) => {
        writeSse(res, event);
    };

    try {
        await researchAndGetAnswer(question, conversationId, onEvent);
        writeSse(res, { type: "done" });
        res.end();
    } catch (err) {
        writeSse(res, { type: "error", message: err.message || "Research failed" });
        res.end();
    }
};