import { Environment } from './common/enums/environment.enum';
import * as Joi from 'joi';
import { ConfigModuleOptions } from '@nestjs/config';


export const envValidations: ConfigModuleOptions = {
  validationSchema: Joi.object({
    NODE_ENV: Joi.string().valid(...Object.values(Environment)),
    PORT: Joi.number().default(3000),
    MONGODB_URI: Joi.string().required(),
  }),
};
