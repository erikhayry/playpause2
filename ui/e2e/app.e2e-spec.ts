import { UiPage } from './app.po';

describe('ui App', function() {
  let page: UiPage;

  beforeEach(() => {
    page = new UiPage();
  });

  it('should display message saying Play / Pause', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Play / Pause');
  });
});
