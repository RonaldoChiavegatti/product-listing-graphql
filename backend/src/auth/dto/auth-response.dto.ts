import { ObjectType, Field } from '@nestjs/graphql';
import { AuthError } from './auth-error.dto';

@ObjectType()
export class AuthResponse {
    @Field(() => String, { nullable: true })
    access_token?: string;

    @Field(() => AuthError, { nullable: true })
    error?: AuthError;
} 