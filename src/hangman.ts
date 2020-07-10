import { Result } from './result';

export class Hangman {
  private secretWord: string;
  private incorrectGuessesAllowed: number;
  private incorrectGuesses: string[] = [];
  private guesses = new Set<string>();
  constructor(secretWord: string, incorrectGuessesAllowed: number) {
    this.secretWord = secretWord.toUpperCase();
    this.incorrectGuessesAllowed = incorrectGuessesAllowed;
  }

  get gameIsInProgress() {
    return true;
  }

  guess(letter: string): Result {
    if (this.isInvalid(letter)) return Result.Invalid;
    const validLetter = letter.toUpperCase();

    if (this.wasPreviouslyGuessed(validLetter)) return Result.Duplicate;

    this.guesses.add(validLetter);

    if (this.isInTheSecretWord(validLetter)) return Result.Correct;

    this.incorrectGuesses.push(validLetter);
    return Result.Incorrect;
  }

  private isInvalid(letter: string): boolean {
    return !/^[a-z]{1}$/gi.test(letter);
  }

  wasPreviouslyGuessed(validLetter: string) {
    return this.guesses.has(validLetter);
  }

  private isInTheSecretWord(validLetter: string): boolean {
    return new RegExp(validLetter, 'gi').test(this.secretWord);
  }
}
