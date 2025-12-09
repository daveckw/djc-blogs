import { doc, getDoc } from 'firebase/firestore';

import mapDocSnapshot from './mapDocSnapshot';
import { db, model } from 'src/lib/firebase';
import isIQI from './common-functions/isIQI';

const queryData = async (ids: any, query: any) => {
    try {
        console.log('Querying data...');

        if (query === '') {
            return '';
        }

        const data = await Promise.all(
            ids.map(async (id: any) => {
                console.log('ID: ', id);
                const docRef = doc(db, 'records', id);
                const docSnap = await getDoc(docRef);
                const record = mapDocSnapshot(docSnap);
                return record;
            })
        );

        console.log('Query: ', query);
        data.map((doc) => console.log(doc.input, '\n'));

        // Correct Vertex AI prompt structure
        const prompt = [
            {
                role: 'user' as const, // System-like instructions are typically passed as a user message in Vertex AI
                parts: [
                    {
                        text: `Imagine you are a friendly customer service representative, answer questions in creative but professional ways in your own words using only the information provided in the context below:
                        \n\n
                        <context>${data.map((doc) => doc.input).join('\n\n')}</context>\n\n`,
                    },
                ],
            },
            {
                role: 'user' as const,
                parts: [
                    {
                        text: `Given the user message is <message>${query}</message>, generate a response.`,
                    },
                ],
            },
        ];

        // Generate content using Vertex AI model
        const result = await model.generateContent({
            contents: prompt, // Use 'contents' as the key
            generationConfig: {
                temperature: 0.9,
                maxOutputTokens: 2048, // Adjust as needed
            },
        });

        let reply = result.response.text();

        if (isIQI()) {
            if (reply.includes('djcsystem.com/records')) {
                reply = reply.replaceAll('djcsystem.com/records', 'iqpilot.ai/records');
            }
        }

        return reply;
    } catch (err) {
        console.log(err);
        return '';
    }
};

export default queryData;
