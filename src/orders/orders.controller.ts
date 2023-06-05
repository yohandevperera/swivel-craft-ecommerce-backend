import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Logger,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './orders.service';
import { OrderDto, OrderParamsDto } from './dto/create-update-order.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import { errorRes, successRes } from 'src/utls/response.formatter';
import _ = require('lodash');

/**
 * Usage and Description - This file will act as a controller file which
 * will act as a mediator between the defined service methods and api routes
 * of the order resource
 **/

@Controller('api/orders')
export class OrdersController {
  constructor(
    private readonly orderService: OrderService,
    private readonly logger: Logger,
  ) {}

  /**
   * Usage - This method will be used to create a new order
   *
   * @parms createOrderDto @typedef OrderDto
   */
  @Post()
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ description: 'Order created successfully' })
  @ApiBody({ type: OrderDto })
  async create(@Body() createOrder: OrderDto[]) {
    try {
      const createdOrder = await this.orderService.create(createOrder);
      return successRes('Order created successfully', createdOrder);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  /**
   * Usage - This method will be used to fetch all created Order
   *
   */
  @Get()
  @ApiOkResponse({ description: 'Order fetched successfully' })
  async findAll() {
    try {
      const order = await this.orderService.findAll();
      if (_.isEmpty(order)) {
        return errorRes('Error fetching order ');
      }
      return successRes('Order fetched successfully', order);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  /**
   * Usage - This method will be used to fetch a order  for a given
   * order  id
   *
   * @parms params @typedef OrderParamsDto
   */
  @Get(':id')
  @ApiOkResponse({ description: 'Order fetched successfully' })
  @ApiParam({
    type: String,
    name: 'id',
  })
  async findOne(@Param() params: OrderParamsDto) {
    try {
      const order = await this.orderService.findOne(params.id);
      if (_.isEmpty(order)) {
        return errorRes('Error fetching order ');
      }
      return successRes('Order fetched successfully', order);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }
}
