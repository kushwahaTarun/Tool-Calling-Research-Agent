export const tools = [{
    type: "function",
    function: {
        name: "web_search",
        description: "Search the internet for current information. Use this when you need up-to-date or external knowledge.",
        parameters: {
            type: "object",
            properties: {
                query: {
                    type: "string",
                    description: "The search query"
                }
            },
            required: ["query"]
        }
    }
},
{
    type: "function",
    function: {
        name: "fetch_url",
        description: "Fetch and extract the main text content from a specific webpage URL.",
        parameters: {
            type: "object",
            properties: {
                url: {
                    type: "string",
                    description: "The full URL of the page to read"
                }
            },
            required: ["url"]
        }
    }
}
]