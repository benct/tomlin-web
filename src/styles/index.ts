const bg = 'bg-light dark:bg-dark ';
const text = 'text-primary dark:text-primary-dark ';

const buttonCommon = 'dark:hover:bg-neutral-dark focus:outline-none focus:ring focus:ring-sky-500 cursor-pointer ';
const buttonDefault = 'px-8 py-6 border rounded-4 dark:border-slate-400 hover:shadow ';

export const button = text + buttonCommon + buttonDefault + 'text-12 font-bold uppercase';
export const buttonIcon = text + buttonCommon + 'p-2 rounded-8 hover:bg-neutral';

export const input = text + bg + buttonCommon + buttonDefault;
export const inputBlock = input + 'block mx-auto';
export const select = input + 'text-12 pr-16';
