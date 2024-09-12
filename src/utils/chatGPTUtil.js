import axios from "axios";
const CHAT_GPT_ENDPOINT = "https://api.openai.com/v1/chat/completions";
const CHAT_GPT_MODEL = "gpt-3.5-turbo";
export const postChatGPTMessage = async (message, openAIKey) => {
    const config = {
        headers: {
            Authorization: `Bearer ${openAIKey}`,
        },
    };
    const userMessage = { role: "user", content: message };
    const chatGPTData = {
        model: CHAT_GPT_MODEL,
        messages: [userMessage],
    };

    try {
        const response = await axios.post(CHAT_GPT_ENDPOINT, chatGPTData, config);
        const message = response?.data?.choices[0]?.message.content;
        return message;
    } catch (error) {
        console.error(error);
        return null;
    }
};