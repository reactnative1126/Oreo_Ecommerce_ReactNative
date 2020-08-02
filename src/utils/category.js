import includes from 'lodash/includes';
import filter from 'lodash/filter';

export function excludeCategory(data, ids) {
    return filter(data, (item) => !includes(ids, item.id));
}
