import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AuthError {
    @Field(() => String)
    message: string;
} 