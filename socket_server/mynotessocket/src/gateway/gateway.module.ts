import { Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { MyGateway2 } from './gateway2';

@Module({
  providers: [MyGateway, MyGateway2],
})
export class GatewayModule {}
