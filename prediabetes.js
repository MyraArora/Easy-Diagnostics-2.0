// Predefined question and answer mappings with unique identifiers
const predefinedQuestions = [
    {
        id: "define-condition",
        keywords: ["what is", "define", "meaning", "explain"],
        answer:
            "Prediabetes is a condition where your blood sugar levels are higher than normal but not yet high enough to be classified as type 2 diabetes. It indicates that your body is not processing glucose effectively. Early intervention can often prevent or delay the onset of diabetes."
    },
    {
        id: "symptoms-warning-signs",
        keywords: ["symptoms", "signs", "warning", "indicators"],
        answer:
            "Many people with prediabetes don't experience noticeable symptoms. However, some might notice increased thirst, frequent urination, fatigue, or blurred vision. Regular health check-ups are essential to detect prediabetes early."
    },
    {
        id: "diagnosis-method",
        keywords: ["diagnosed", "check", "diagnosis", "test"],
        answer:
            "Prediabetes is typically diagnosed using blood tests such as fasting blood sugar, A1C levels, or an oral glucose tolerance test (OGTT). These tests measure how your body processes glucose."
    },
    {
        id: "reversible-question",
        keywords: ["reversible", "reverse", "can it be cured"],
        answer:
            "Yes, prediabetes is often reversible. By making healthy lifestyle changes, such as maintaining a balanced diet, exercising regularly, and losing even a small percentage of body weight, you can lower your blood sugar levels back to a normal range."
    },
    {
        id: "foods-to-avoid",
        keywords: ["foods to avoid", "bad foods", "what not to eat"],
        answer:
            "Avoid foods that spike your blood sugar quickly, such as white bread, white rice, sugary drinks, desserts, and highly processed snacks. Focus instead on whole grains, lean proteins, healthy fats, and non-starchy vegetables."
    },
    {
        id: "foods-to-eat",
        keywords: ["what to eat", "good foods", "healthy diet"],
        answer:
            "Foods that are beneficial for prediabetes include whole grains, fresh fruits (in moderation), vegetables, lean protein like fish or chicken, nuts, seeds, and foods rich in fiber. Choose low-glycemic foods to keep blood sugar stable."
    },
    {
        id: "progression-to-diabetes",
        keywords: ["lead to diabetes", "progression", "diabetes risk"],
        answer:
            "Without intervention, prediabetes can lead to type 2 diabetes over time. However, adopting a healthier lifestyle can significantly reduce this risk and even reverse prediabetes in many cases."
    },
    {
        id: "exercise-benefits",
        keywords: ["exercise", "physical activity", "workout"],
        answer:
            "Exercise is crucial for managing prediabetes. Activities like walking, cycling, swimming, or strength training can improve insulin sensitivity and help control blood sugar levels. Aim for at least 150 minutes of moderate-intensity activity per week."
    },
    {
        id: "sugar-intake",
        keywords: ["sugar", "sweet foods", "sugar consumption"],
        answer:
            "While you don't have to completely eliminate sugar, it's important to limit added sugars and focus on naturally occurring sugars from whole fruits. Reading nutrition labels can help you avoid hidden sugars in processed foods."
    },
    {
        id: "fruits-safe",
        keywords: ["can I eat fruits", "fruits safe", "fruit consumption"],
        answer:
            "Yes, most fruits are safe to eat in moderation. Opt for fruits with a low glycemic index like berries, apples, and oranges. Avoid fruit juices and dried fruits as they can spike blood sugar."
    },
    {
        id: "hydration-importance",
        keywords: ["water", "hydration", "drink water"],
        answer:
            "Staying hydrated is essential for maintaining healthy blood sugar levels. Aim for at least 8-10 cups of water daily. Proper hydration helps your kidneys flush excess sugar out of your body."
    },
    {
        id: "lifestyle-changes",
        keywords: ["lifestyle changes", "habits", "what should I change"],
        answer:
            "Key lifestyle changes include eating a balanced diet, increasing physical activity, losing weight if needed, managing stress, and ensuring you get adequate sleep. Small, consistent changes can make a big difference."
    },
    {
        id: "stress-impact",
        keywords: ["stress", "anxiety", "stress effects"],
        answer:
            "Chronic stress can lead to elevated blood sugar levels due to the release of stress hormones like cortisol. Managing stress through techniques such as meditation, yoga, or deep breathing exercises is beneficial."
    },
    {
        id: "sleep-impact",
        keywords: ["sleep", "rest", "bedtime"],
        answer:
            "Sleep plays a crucial role in regulating blood sugar. Poor sleep can disrupt insulin sensitivity and appetite-regulating hormones. Aim for 7-8 hours of quality sleep per night."
    },
    {
        id: "medication-options",
        keywords: ["medication", "drugs", "pills"],
        answer:
            "While lifestyle changes are the first line of defense, medications like metformin may be prescribed in some cases to help control blood sugar levels. Consult your healthcare provider for personalized advice."
    },
    {
        id: "risk-factors",
        keywords: ["risk factors", "causes", "why do I have this"],
        answer:
            "Risk factors for prediabetes include being overweight, having a sedentary lifestyle, a family history of diabetes, poor dietary habits, and being over the age of 45. Certain ethnicities also have a higher risk."
    },
    {
        id: "insulin-resistance",
        keywords: ["insulin resistance", "what is insulin resistance"],
        answer:
            "Insulin resistance occurs when your cells don't respond effectively to insulin, a hormone that regulates blood sugar. This leads to elevated blood sugar levels and is a hallmark of prediabetes."
    },
    {
        id: "weight-impact",
        keywords: ["weight", "obesity", "does weight matter"],
        answer:
            "Excess weight, particularly around the abdomen, increases the risk of prediabetes and type 2 diabetes. Losing even a small percentage of your body weight can significantly improve blood sugar levels."
    },
    {
        id: "normal-blood-sugar",
        keywords: ["normal range", "blood sugar level"],
        answer:
            "Normal fasting blood sugar levels are below 100 mg/dL. Levels between 100-125 mg/dL indicate prediabetes, and levels above 126 mg/dL suggest diabetes."
    },
    {
        id: "monitoring-frequency",
        keywords: ["how often", "check blood sugar", "monitor"],
        answer:
            "For those with prediabetes, it’s a good idea to monitor your blood sugar levels periodically, especially after meals or when fasting. Discuss a schedule with your healthcare provider."
    }
    // Add more questions from the list above using the same structure
];

// DOM Elements
const chatBox = document.getElementById("messages");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Display message in chat
function displayMessage(message, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.className = sender;
    msgDiv.textContent = message;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Handle user input
sendBtn.addEventListener("click", async () => {
    const query = userInput.value.trim().toLowerCase();
    if (!query) return;

    displayMessage(`You: ${query}`, "user");

    // Find matching predefined question
    const matchedQuestion = predefinedQuestions.find((q) =>
        q.keywords.some((keyword) => query.includes(keyword))
    );

    if (matchedQuestion) {
        displayMessage(`Dr. Genie: ${matchedQuestion.answer}`, "bot");
    } else {
        // Handle unmatched questions using ChatGPT API
        const prompt = `I have prediabetes. ${query}`;
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer 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`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
            }),
        });

        const data = await response.json();
        const answer = data.choices[0].message.content;
        displayMessage(`Dr. Genie: ${answer}`, "bot");
    }

    userInput.value = "";
});
