import { supabase } from "../db/index.js"

// FUNCTION RESPONSIBLE FOR INSERTING A CONVERSATION TO DB USING SUPABASE CLIENT
export const addConversationToDB = async (title) => {
    
    // INSERTING A CONVERSATION TO DB
    const { data, error } = await supabase.from("conversations")
    .insert({ title })
    .select()
    .single();

    if(error) throw error;

    // RETURN RESPONSE
    return data;

}

// FUNCTION RESPONSIBLE FOR RETURNING ALL THE CONVERSATIONS FROM THE DB
export const getAllConversationFromDB = async () => {
    
    // FETCHING ALL THE CONVERSATION WITH ID AND TITLE
    const { data, error } = await supabase.from("conversations")
    .select("id, title, created_at");

    if(error) throw error;

    return data;
}

// FUNCTION THAT RETURNS ALL THE MESSAGES PRESENT INSIDE A CONVERSATION
export const allConversationMessagesFromDb = async (conversation_id) => {
    const { data, error } = await supabase.from("messages")
    .eq("conversation_id", id)
    .select("id, messages");

    if(error) throw error;

    return data;
}

// FUNCTION RESPONSIBLE FOR DELETING A CONVERSATION FROM THE DB
export const deleteConversationFromDb = async (id) => {
    const { data, error } = await supabase.from("conversations")
    .delete()
    .eq("id", id);

    if(error) throw error
    
    return data;
}