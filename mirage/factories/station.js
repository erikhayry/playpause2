import Mirage, {faker}  from 'ember-cli-mirage';

export default Mirage.Factory.extend({
    name: faker.internet.domainName(),
    url: 'http://sr.se'
});
