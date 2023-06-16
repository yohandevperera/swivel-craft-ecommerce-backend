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
   * Usage - This method will be used to fetch a order for a given
   * order id
   *
   * @parms params @typedef OrderParamsDto
   */
  @Get('get-order/:id')
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

  /**
   * Usage - This method will be used to fetch all created orders and craft details
   *
   */
  @Get('/get-orders')
  @ApiOkResponse({ description: 'Order fetched successfully' })
  async getOrders() {
    try {
      const orders = await this.orderService.getOrders();
      if (_.isEmpty(orders)) {
        return errorRes('Error fetching order ');
      }
      return successRes('Orders fetched successfully', orders);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  /**
   * Usage - This method will be used to fetch all total sales in order collection
   *
   */
  @Get('/get-total-sales')
  @ApiOkResponse({ description: 'Total sales fetched successfully' })
  async getTotalSales() {
    try {
      const totalSales = await this.orderService.getTotalSales();
      if (_.isEmpty(totalSales)) {
        return errorRes('Error fetching total sales ');
      }
      return successRes('Total sales fetched successfully', totalSales);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  /**
   * Usage - This method will be used fetch all top sales in order collection
   *
   */
  @Get('/get-top-sales')
  @ApiOkResponse({ description: 'Top sales fetched successfully' })
  async getTopSales() {
    try {
      const topSales = await this.orderService.getTopSales();
      if (_.isEmpty(topSales)) {
        return errorRes('Error fetching top sales ');
      }
      return successRes('Top sales fetched successfully', topSales);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }
}
