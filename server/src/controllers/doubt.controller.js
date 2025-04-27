import { Doubt } from '../models/index.js';
import { exec , spawn} from 'child_process'; // this is inbuilt

import { tryCatch } from '../utils/tryCatch.js';
import { OK } from '../constants/errorCodes.js';
import path from 'path';

//generating embedding using Python script(can add to utils or as a pre hook)
function generateEmbedding(question) {
    return new Promise((resolve, reject) => {
        const scriptPath = 'src/PythonScripts/generateEmbeddings.py';
        const python = spawn('python', [scriptPath, question]);

        let result = '';
        python.stdout.on('data', (data) => {
            result += data.toString();
        });

        python.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        python.on('close', (code) => {
            if (code !== 0) {
                reject(`Python process exited with code ${code}`);
            }
            try {
                const embedding = JSON.parse(result);
                resolve(embedding);
            } catch (e) {
                reject('Failed to parse Python output');
            }
        });
    });
}

//using exec command
// function generateEmbedding(question) {
//     return new Promise((resolve, reject) => {
//         const scriptPath = 'src/PythonScripts/generateEmbeddings.py'; //we can use absolute path also
//         const command = python "${scriptPath}" "${question}";
//         exec(command, (error, stdout, stderr) => {
//             if (error) {
//                 reject(exec error: ${error});
//                 console.log(error);
//                 return;
//             }
//             if (stderr) {
//                 reject(stderr: ${stderr});
//                 return;
//             }
//             const embedding = JSON.parse(stdout); // Parse the JSON result from Python
//             console.log(1, embedding);
//             resolve(embedding);
//         });
//     });
// }


const addDoubt = tryCatch('add doubt', async (req, res) => {
    const { question, studentId, sessionId } = req.body;
    console.log(question, studentId, sessionId);
    const embedding = await generateEmbedding(question);
    const doubt = await Doubt.create({
        question,
        studentId,
        sessionId,
        embedding,
    });
    console.log(3, doubt);
    await doubt.save();
    res.status(OK).json(doubt);
});

export { addDoubt };
