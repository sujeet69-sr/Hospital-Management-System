import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { UserRole } from 'src/entity/user.entity';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(6)
  password: string;

  @Field(() => UserRole)
  @IsEnum(UserRole)
  role: UserRole;
}

@InputType()
export class CreateAdminInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(6)
  password: string;
}
