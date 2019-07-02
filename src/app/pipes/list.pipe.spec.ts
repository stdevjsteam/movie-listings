import { ListPipe } from './list.pipe';

describe('ListPipe', () => {
  let pipe: ListPipe;

  beforeEach(() => {
    pipe = new ListPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transform array of strings to comma separated words', () => {
    expect(pipe.transform(['word1', 'word2', 'word3'])).toBe('word1, word2, word3');
  });
});
