import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';


export const CORS : CorsOptions ={
      origin: [process.env.URL_FRONT],
      // origin: ['http://localhost:3000', process.env.URL_FRONT],
    allowedHeaders: ['Content-Type', 'Authorization',],
    methods: 'GET,PUT,POST,DELETE,OPTIONS,HEAD,PATCH',
    credentials:true,
    
}
