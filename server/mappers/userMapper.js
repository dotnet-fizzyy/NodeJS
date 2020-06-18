import { User } from './mapperModels';
import crypto from 'crypto';

export function mapToModel(req) {
    const user = new User();
    const md5 = crypto.createHash('md5');

    user.id = req.body.id;
    user.name = req.body.name;
    user.password = md5.update(req.body.password).digest('hex');

    return user;
}