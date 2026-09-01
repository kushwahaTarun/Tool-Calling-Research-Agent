import "../load-env.js";

// FUNCTION RESPONSIBLE FOR MAKING AN API CALL AND GETTING THE RESULT OF QUERY FROM THE INTERNET
export async function webSearch({ query }) {
    try {
        const result = await fetch(`${process.env.TAVILY_BASE_URL}/api/research`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${process.env.TAVILY_API_KEY}`
            },
            body: JSON.stringify({
                query,
                max_results: 5
            })
        });

        if (!result.ok) {
            return { error: `Web search failed with status ${result.status}` };
        }

        const response = await result.json();
        return response;
    }
    catch(err) {
        console.error(err);
        return { error: err.message || "Web search failed" };
    }
}