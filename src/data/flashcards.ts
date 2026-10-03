import { questionBank } from './questions';

export type Flashcard = {
  id: string;
  unitId: string;
  front: string;
  back: string;
  category: 'Definition' | 'Concept' | 'Algorithm' | 'Difference' | 'Property';
};

function condenseQuestion(q: string): string {
  const match = q.match(/^([^.?]+[.?]?)/);
  let shortQ = match ? match[1].trim() : q;
  if (shortQ.toLowerCase().startsWith('define ')) shortQ = shortQ.replace(/^[Dd]efine\s/, 'What is ');
  if (shortQ.toLowerCase().includes('differentiate between')) shortQ = shortQ.replace(/[Dd]ifferentiate between/, 'Compare');
  if (!shortQ.endsWith('?') && !shortQ.endsWith('.')) shortQ += '?';
  if (shortQ.endsWith('.')) shortQ = shortQ.slice(0, -1) + '?';
  return shortQ;
}

function condenseAnswer(a: string): string {
  if (a.includes('Attribute') && a.includes('Primitive')) {
    return '• Primitive: Basic, machine-level data types (int, float, char) allocated on the Stack.\n• Non-Primitive: Complex structures (Arrays, Trees) allocated dynamically in the Heap.';
  }
  
  if (a.includes('Linear Data Structures:') || a.includes('Data Type:')) {
    const lines = a.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const points = lines.filter(l => l.includes(':') || l.startsWith('•')).slice(0, 2);
    if (points.length > 0) return points.join('\n');
  }

  let shortA = a.replace(/Definition:\s*/g, '')
                .replace(/Key Features:[\s\S]*/, '')
                .replace(/Importance:[\s\S]*/, '')
                .replace(/Real-World Applications:[\s\S]*/, '')
                .replace(/Examples:[\s\S]*/, '')
                .replace(/Advantages:[\s\S]*/, '')
                .replace(/Disadvantages:[\s\S]*/, '');
  
  const text = shortA.split('\n').filter(l => l.trim().length > 0).join(' ').replace(/\s+/g, ' ').trim();
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  return sentences.slice(0, 2).join(' ').trim();
}

export const flashcards: Flashcard[] = questionBank.map((q) => {
  let category: Flashcard['category'] = 'Concept';
  const lowerQ = q.question.toLowerCase();
  
  if (lowerQ.includes('define') || lowerQ.includes('what is')) {
    category = 'Definition';
  } else if (lowerQ.includes('differentiate') || lowerQ.includes('vs') || lowerQ.includes('difference')) {
    category = 'Difference';
  } else if (lowerQ.includes('algorithm') || lowerQ.includes('sort')) {
    category = 'Algorithm';
  } else if (lowerQ.includes('property') || lowerQ.includes('features')) {
    category = 'Property';
  }

  return {
    id: `fc-${q.id}`,
    unitId: q.unitId,
    front: condenseQuestion(q.question),
    back: condenseAnswer(q.answer),
    category
  };
});
