const { execSync } = require('child_process');
const fs = require('fs');

const pdfPath = '/home/kashyap/.gemini/antigravity-ide/brain/9b1acefd-f773-41ca-80e5-6b1b5d30c0b3/.user_uploaded/media_1790606576005.pdf';
const rawText = execSync(`pdftotext -layout "${pdfPath}" -`).toString();

const lines = rawText.split('\n');
const questions = [];
let currentUnit = 1;
let currentQ = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Detect Unit
  const unitMatch = line.match(/UNIT\s+(\d+):/i);
  if (unitMatch) {
    currentUnit = parseInt(unitMatch[1]);
  }
  
  // Detect Question
  const qMatch = line.match(/^Q(\d+)\.\s+(.*)\[(.*Marks.*)\]/i) || line.match(/^Q(\d+)\.\s+(.*)/i);
  if (qMatch) {
    if (currentQ) {
      questions.push(currentQ);
    }
    currentQ = {
      id: `q${qMatch[1]}`,
      unitId: `unit-${currentUnit}`,
      number: parseInt(qMatch[1]),
      question: qMatch[2].trim(),
      answer: '',
      marks: qMatch[3] ? qMatch[3].trim() : ''
    };
    continue;
  }
  
  if (currentQ) {
    // skip headers/footers
    if (line.includes('Data Structures (BE03000081)') || line.trim() === '\f' || line.includes('NEW L.J. INSTITUTE')) {
      continue;
    }
    currentQ.answer += line + '\n';
  }
}

if (currentQ) {
  questions.push(currentQ);
}

// Clean answers
questions.forEach(q => {
  q.answer = q.answer.trim();
  // Correction for Q14
  if (q.id === 'q14') {
    q.answer = q.answer.replace('C - 44 = -20', 'C - 44 = -32').replace('32 + (-20) = \\mathbf{12}', '32 + (-32) = \\mathbf{0}');
  }
});

const tsContent = `export type Question = {
  id: string;
  unitId: string;
  number: number;
  question: string;
  answer: string;
  marks?: string;
  completed?: boolean;
  bookmarked?: boolean;
};

export const questionBank: Question[] = ${JSON.stringify(questions, null, 2)};
`;

fs.writeFileSync('src/data/questions.ts', tsContent);
console.log(`Extracted ${questions.length} questions.`);
