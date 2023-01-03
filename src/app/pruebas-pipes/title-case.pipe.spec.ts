import { TitleCasePipe } from './title-case.pipe';

describe('TitleCasePipe', () => {

  //* Este pipe es puro y sin estado, por lo que no es necesario BeforeEach
  const pipe = new TitleCasePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transform "abc" to "Abc"', () => {
    expect(pipe.transform('abc')).toBe('Abc');
  });

  it('transform "abc def" to "Abc Def"', () => {
    expect(pipe.transform('abc def')).toBe('Abc Def');
  });

  it('deja "Abc Def" si cambios', () => {
    expect(pipe.transform('Abc Def')).toBe('Abc Def');
  });

  it('transforms "abc-def" to "Abc-def"', () => {
    expect(pipe.transform('abc-def')).toBe('Abc-def');
  });

  it('transforms "   abc   def" to "   Abc   Def" (conservando los espacios) ', () => {
    expect(pipe.transform('   abc   def')).toBe('   Abc   Def');
  });

  it('deja "" como ""', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('deja "  " como "  "', () => {
    expect(pipe.transform("  ")).toBe("  ");
  });

});
