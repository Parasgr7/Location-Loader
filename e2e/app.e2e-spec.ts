import { ParasPage } from './app.po';

describe('paras App', () => {
  let page: ParasPage;

  beforeEach(() => {
    page = new ParasPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
