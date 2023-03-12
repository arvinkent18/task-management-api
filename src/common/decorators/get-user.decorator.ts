import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '../../authentication/payload.interface';
import { Token } from '../../authentication/token.interface';
interface DecodedToken extends Payload, Token {
  iat: number;
  exp: number;
}

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const jwtService = new JwtService({});
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtService.decode(token) as DecodedToken;
    
    return decodedToken;
  },
);
