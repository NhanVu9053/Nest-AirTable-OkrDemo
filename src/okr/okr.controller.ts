import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthorizationGuard } from 'src/auth/auth.guard';
import { CreateOkrDto } from './dto/create-okr.dto';
import { OkrService } from './okr.service';

@Controller('okr')
export class OkrController {
    constructor( private readonly okrService: OkrService){}


    // @UseGuards(AuthGuard('jwt'))
    @UseGuards(AuthorizationGuard)
    @Get()
    async findAll() {
        console.log('controller');
        return 'This is a protected resource. Welcome member';
    }

    @UseGuards(AuthorizationGuard)
    @Get("/:id")
    async find(@Param("id") id: string) {
        return await this.okrService.find(id);
    }

    @Post()
    async create(@Body() createOkrDto: CreateOkrDto) {
        return await this.okrService.create(createOkrDto);
    }

    @Patch(':id')
    async update(@Param("id") id: string, @Body() createOkrDto: CreateOkrDto) {
        return await this.okrService.update(id,createOkrDto);
    }

    @Delete("/:id")
    @HttpCode(204)
    async delete(@Param("id") id: string) {
      return await this.okrService.delete(id);
    }
}
