function removeMarkdown(text: string): string {
    // Remove markdown special characters
    return text.replace(/[*_`~]/g, '');
}

function normalizeQA(text: string): string {
    // Normalize q: to Q: and a: to A:, adding a space after Q: and A:
    return text.replace(/\bq:\s*/gi, 'Q: ').replace(/\ba:\s*/gi, 'A: ');
}

function extractQA(text: string): string[] {
    const qaPairs = [];
    const regex = /Q:([\s\S]*?)(?=A:)/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
        const question = match[1].trim();
        const answerStartIndex = match.index + match[0].length;
        const answerMatch = text.slice(answerStartIndex).match(/A:([\s\S]*?)(?=Q:|$)/);
        const answer = answerMatch ? answerMatch[1].trim() : '';
        qaPairs.push(`Q: ${question}\nA: ${answer}`);
    }
    return qaPairs;
}

function createQAArray(
    text: string,
    title: string,
    catalogId: string
): { input: string; id: string; catalogId: string }[] {
    if (!text) return [];

    // Step 1: Remove markdown special characters
    const cleanedText = removeMarkdown(text);

    // Step 2: Normalize q: to Q: and a: to A:, adding spaces after Q: and A:
    const normalizedText = normalizeQA(cleanedText);

    // Step 3-4: Extract Q&A pairs and ensure proper formatting
    const qaPairs = extractQA(normalizedText);

    // Combine pairs into formatted text
    const formattedText = qaPairs.join('\n\n');

    // Split into array of objects
    const pairs = formattedText.split(/\n(?=Q:)/);

    return pairs.map((pair, index) => ({
        input: `Title: ${title}\n${pair.trim()}`,
        id: (index + 1).toString(),
        catalogId,
    }));
}

export default createQAArray;
