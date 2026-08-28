import "../load-env.js";

// FUNCTION THAT TAKES A URL AS A PARAMETER USE TAVILY TO EXTRACT THE TEXT AND RETURN
export async function fetchUrl({ url }) {
    try {
        const response = await fetch(`${process.env.TAVILY_BASE_URL}/extract`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.TAVILY_API_KEY}`
            },
            body: JSON.stringify({ url }),
        });

        if (!response.ok) {
            return { error: `Fetch URL failed with status ${response.status}` };
        }

        const result = await response.json();

        return result;

    }
    catch(err) {
        console.error(err);
        return { error: err.message || "Fetch URL failed" };
    }
}