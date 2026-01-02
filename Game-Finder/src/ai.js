import { HfInference } from '@huggingface/inference'

const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN)

export async function getGameFromAI(featuresArr) {
    const featuresString = featuresArr.join(", ")
    
    try {
        const response = await hf.chatCompletion({
            model: "meta-llama/Llama-3.2-3B-Instruct",
            messages: [
                { 
                    role: "user", 
                    content: `You are a helpful game recommendation assistant. I'm looking for games with these features: ${featuresString}. 
                    Suggest games that matches some or all of these features limit the games to 5. Include the games title, platform(s), a brief description, and why it matches my preferences. Format your response in markdown.` 
                },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error('Error:', err)
        return "Sorry, I couldn't generate a game recommendation. Please try again."
    }
}