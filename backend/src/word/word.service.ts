import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { Word } from './entities/word.entity';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word) private WordRepository: Repository<Word>,
  ) {}

  async create(createWordDto: CreateWordDto) {
    return await this.WordRepository.save(createWordDto)
      .then((res) => {
        return res;
      })
      .catch(() => {
        return false;
      });
  }

  async findAllByCategory(category: number) {
    const words = await this.WordRepository.find({
      where: {
        category_id: category,
      },
      order: { count_typed: 'DESC' },
    });
    const totalCount = words
      .map((word) => word.count_typed)
      .reduce((acc, curr) => {
        acc += curr;
        return acc;
      }, 0);

    return words.map(({ id, term, term_formatted, count_typed }) => {
      return {
        id,
        term,
        term_formatted,
        percent: parseInt(((100 * count_typed) / totalCount).toFixed(0)),
      };
    });
  }

  async update(id: number, updateWordDto: UpdateWordDto) {
    return await this.WordRepository.update({ id }, updateWordDto)
      .then((res) => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  async remove(id: number) {
    return await this.WordRepository.delete({ id })
      .then((res) => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}
