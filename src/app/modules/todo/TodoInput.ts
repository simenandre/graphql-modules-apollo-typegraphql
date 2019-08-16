/* eslint @typescript-eslint/explicit-function-return-type: 0 */
/* eslint @typescript-eslint/explicit-member-accessibility: 0 */
import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class TodoInput {
  @Field()
  status: string;

  @Field({ nullable: true })
  title?: string;
}

@InputType()
export class TodoUpdateInput {
  @Field(type => ID)
  id?: string;

  @Field()
  status: string;

  @Field({ nullable: true })
  title?: string;
}
