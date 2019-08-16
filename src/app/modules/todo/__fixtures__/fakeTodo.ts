import * as faker from 'faker';
import Todo from '../Todo';
export default (): Todo =>  ({
  id: faker.random.uuid(),
  title: faker.lorem.words(3),
  status: faker.random.arrayElement(['pending', 'done'])
});
