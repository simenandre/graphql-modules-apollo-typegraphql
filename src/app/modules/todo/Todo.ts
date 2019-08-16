import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export default class Todo {
  @Field(type => ID)
  id?: string;

  @Field()
  status: string;

  @Field({ nullable: true })
  title?: string;
}
