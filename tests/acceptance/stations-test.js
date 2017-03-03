import { test } from 'qunit';
import moduleForAcceptance from 'play-pause/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | stations');

/*test('visiting /stations', function(assert) {
  visit('/stations');

  andThen(function() {
    assert.equal(currentURL(), '/stations');
  });
});*/

test('should load stations', function(assert) {
  server.logging = true;
  let stations = server.createList('station', 10);
  console.log(stations);
  visit('/stations');
  fillIn('input.name', 'My new post');
  fillIn('input.url', 'My new post');
  click('button.submit');
  andThen(() => {
    assert.equal(find('li').length, 1);
  });
});
