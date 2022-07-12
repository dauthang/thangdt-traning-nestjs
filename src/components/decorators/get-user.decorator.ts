import { createParamDecorator } from '@nestjs/common';
import RequestWithUser from '../../auth/interfaces/requestWithUser.interface';

export const GetUser = createParamDecorator((req): RequestWithUser => req.user);
