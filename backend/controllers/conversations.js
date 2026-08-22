import { addConversationToDB, 
    getAllConversationFromDB,
    deleteConversationFromDb,
    allConversationMessagesFromDb
} from "../services/conversations.js"

// CONTROLLER FUNCTION THAT CREATES A NEW CONVERSATION IN THE DB
export const createConversation = async (req, res) => {
    try {
       const { title } = req.body;
    // const { user_id } = req.headers;

    // if(!user_id) return res.status(401).json({
    //     success: false,
    //     error: "Unauthorized!"
    // });

    if(!title.trim().length) return res.status(400).json({
        success: false,
        error: "Invalid Conversation!"
    });

    const conversation = await addConversationToDB(title);
    
    return res.status(201).json({
        success: true,
        data: conversation
    });

    }
    catch(err) {
        next(err);
    }
    
}

// CONTROLLER FUNCTION THAT RETURNS ALL THE CONVERSATIONS FROM THE DB
export const getallConversations = async (req, res) => {
    try {
    // const { user_id } = req.headers;

    // if(!user_id) return res.status(401).json({
    //     success: false,
    //     error: "Unauthorized"
    // });

    const conversations = await getAllConversationFromDB();

    return res.status(200).json({
        success: true,
        data: conversations
    });

    }
    catch (err) {
        next(err);
    }  
}

// CONTROLLER FUNCTION THAT RETURNS THE CHATS OF A CONVERSATION
export const getConversationChats = async (req, res, next) => {

    const { id } = req.params;
    const { user_id } = req.headers;

    try {

    if(!user_id) return res.status(401).json({
            success: false,
            error: "Unauthorized!"
    })
    
    if(!id) return res.status(400).json({
        success: false,
        error: "Conversation Id is required"
    });

    const conversationMessages = await allConversationMessagesFromDb(id);

    return res.status(200).json({
        success: true,
        messages: conversationMessages
    })

    }

    catch(err) {
        next(err);
    }

}

// CONTROLLER FUNCTION THAT DELETES AN ENTRY OF A CONVERSATION FROM DB
export const deleteConversation = async (req, res, next) => {
    try {
        // const { user_id } = req.headers;
        const { id } = req.params;
        
        // if (!user_id) return res.status(401).json({
            //     success: false,
            //     error: "Unauthorized!"
            // })
            
            if(!id) return res.status(400).json({
                success: false,
                error: "Conversation Id is not present"
            })
            
            const conversation = await deleteConversationFromDb(id);

            return res.status(200).json({
                success: true,
                status: "Conversation deleted successfully"
            })
        }
        catch(err) {
            next(err);
        }

}