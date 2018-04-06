const faker = require('faker');
const fs = require('fs');

const itemCount = Math.floor(Math.random() * 400 + 100);

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
  'Expenses'
];

const obj = {
  meta: {
    page: '1',
    count: itemCount,
    totalCount: itemCount,
    cursor: 'e1aa2c04-85c9-4583-9b61-801bb4dfbc9b'
  },
  data: [],
  error: {
    code: '200',
    message: 'Success'
  }
};

for (let i = 0; i < itemCount; i++) {
  const transaction = {
    id: faker.random.uuid(),
    number: faker.finance.account(),
    amount:
      Math.random() < 0.8
        ? -Math.abs(faker.random.number())
        : faker.random.number(),
    status: Math.random() < 0.5 ? 'Complete' : 'Pending',
    date: Math.random() < 0.5 ? faker.date.past() : faker.date.recent(),
    category: categories[Math.floor(Math.random() * categories.length)],
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.county()} ${faker.address.zipCode()}`
  };

  if (Math.random() < 0.5) {
    transaction.contact = {
      id: faker.random.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      image: Math.random() < 0.5 ? faker.image.avatar() : null
    };
  } else {
    transaction.merchant = {
      id: faker.finance.account(),
      name: faker.company.companyName(),
      logo: Math.random() < 0.5 ? faker.internet.avatar() : null,
      website: faker.internet.url()
    };
  }

  obj.data.push(transaction);
}

fs.writeFileSync(
  './Transactions/transactions.json',
  JSON.stringify(obj),
  'utf8'
);
