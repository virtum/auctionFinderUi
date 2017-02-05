import { AuctionFinderUiPage } from './app.po';

describe('auction-finder-ui App', function() {
  let page: AuctionFinderUiPage;

  beforeEach(() => {
    page = new AuctionFinderUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
