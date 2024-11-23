document.getElementById('pdfFile').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = async function () {
        const typedarray = new Uint8Array(this.result);

        // Load the PDF
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        let extractedText = "";

        // Loop through all pages to extract text
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();

            // Extract text from each item
            textContent.items.forEach(item => {
                extractedText += item.str + " ";
            });
        }

        // Process the extracted text
        const resultValue = extractResultValue(extractedText);

        // Handle feedback based on the result value
        displayFeedback(resultValue);
    };

    fileReader.readAsArrayBuffer(file);
});

// Function to extract the result value
function extractResultValue(text) {
    // Convert text to lowercase and tokenize
    const tokens = text.toLowerCase().split(/\s+/);

    // Filter tokens to keep only numbers or the word 'result/results'
    const filteredTokens = tokens.filter(token =>
        !isNaN(token) || token === "result" || token === "results"
    );

    // Find the index of 'result' or 'results'
    const resultIndex = filteredTokens.indexOf("result") !== -1
        ? filteredTokens.indexOf("result")
        : filteredTokens.indexOf("results");

    // If 'result' exists, get the token after it
    if (resultIndex !== -1 && resultIndex + 1 < filteredTokens.length) {
        return parseFloat(filteredTokens[resultIndex + 1]); // The token after 'result'
    }

    return null; // No valid result found
}

// Function to display feedback
function displayFeedback(resultValue) {
    const resultElement = document.getElementById('resultValue');
    const feedbackElement = document.getElementById('feedback');
    const learnMoreButton = document.getElementById('learnMore');

    if (resultValue === null) {
        resultElement.innerText = "Result value not found.";
        feedbackElement.innerText = "Please upload a valid PDF.";
        learnMoreButton.style.display = "none";
        return;
    }

    // Display the result value
    resultElement.innerText = `Result Value: ${resultValue}`;

    if (resultValue < 185) {
        feedbackElement.innerText =
            "Your result value is completely normal. There shouldn't be any need to fret.";
        learnMoreButton.style.display = "none";
    } else if (resultValue >= 185 && resultValue <= 210) {
        feedbackElement.innerText =
            "You are prediabetic. A prediabetic diagnosis can be alarming. However, prediabetes does not mean that you will definitely get type 2 diabetes. Early intervention can get you out of the range. Don't eat White bread, white rice, Corn flakes, Potatoes, Saltine crackers, Pumpkins & Melons. Eat more healthy fats from nuts, olive oil or flax seeds, whole fruit vegetables, high fiber cereals, whole grain breads, fish, high quality proteins like eggs, beans, low-fat dairy, etc.";
        learnMoreButton.style.display = "block";
        learnMoreButton.dataset.target = "prediabetes.html";
    } else if (resultValue > 210) {
        feedbackElement.innerText =
            "You have diabetes. Diabetes occurs when your blood glucose is too high. Over time, having too much glucose in your blood can cause health problems. Although diabetes has no cure, you can take steps to manage your diabetes and stay healthy. Don't eat White bread, white rice, Corn flakes, Potatoes, Saltine crackers, Pumpkins & Melons. Eat more healthy fats from nuts, olive oil or flax seeds, whole fruit vegetables, high fiber cereals, whole grain breads, fish, high quality proteins like eggs, beans, low-fat dairy, etc.";
        learnMoreButton.style.display = "block";
        learnMoreButton.dataset.target = "diabetes.html";
    }
}

// Function to redirect to the appropriate page
function redirect() {
    const learnMoreButton = document.getElementById('learnMore');
    const targetPage = learnMoreButton.dataset.target;
    if (targetPage) {
        window.location.href = targetPage;
    }
}
