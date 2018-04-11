const faker = require('faker');
const fs = require('fs');
const moment = require('moment');

module.exports = {
  addNewTransaction: () => {
    const categories = [
      'Transport',
      'Groceries',
      'Eating out',
      'Cash',
      'Bills',
      'Entertainment',
      'Holidays',
      'Shopping',
      'General',
      'Expenses',
    ];

    const genTransaction = () => {
      const transaction = {
        id: faker.random.uuid(),
        number: faker.finance.account(),
        amount: Math.trunc(
          (Math.random() < 0.8
            ? -Math.abs(faker.random.number())
            : faker.random.number()) / 100,
        ),
        status: Math.random() < 0.5 ? 'Complete' : 'Pending',
        date: moment(),
        category: categories[Math.floor(Math.random() * categories.length)],
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude(),
        address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.county()} ${faker.address.zipCode()}`,
      };

      if (Math.random() < 0.5) {
        transaction.contact = {
          id: faker.random.uuid(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          image: Math.random() < 0.5 ? faker.image.avatar() : null,
        };
      } else {
        transaction.merchant = {
          id: faker.finance.account(),
          name: faker.company.companyName(),
          logo: Math.random() < 0.5 ? faker.internet.avatar() : null,
          website: faker.internet.url(),
        };
      }

      return transaction;
    };

    fs.readFile('./Transactions/transactions.json', 'utf-8', function(
      err,
      data,
    ) {
      if (err) throw err;

      var arrayOfObjects = JSON.parse(data);
      arrayOfObjects.data.push(genTransaction());
      arrayOfObjects.meta.count = arrayOfObjects.meta.count + 1;
      arrayOfObjects.meta.totalCount = arrayOfObjects.meta.totalCount + 1;

      fs.writeFile(
        './Transactions/transactions.json',
        JSON.stringify(arrayOfObjects),
        'utf-8',
        function(err) {
          if (err) throw err;
          console.log('Done!');
        },
      );
    });
  },
};
