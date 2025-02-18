import type { DirectusPanel } from '../../../schema/panel.js';
import type { ApplyQueryFields, Query } from '../../../types/index.js';
import type { RestCommand } from '../../types.js';

export type UpdatePanelOutput<
	Schema extends object,
	TQuery extends Query<Schema, Item>,
	Item extends object = DirectusPanel<Schema>
> = ApplyQueryFields<Schema, Item, TQuery['fields']>;

/**
 * Update multiple existing panels.
 * @param keys
 * @param item
 * @param query
 * @returns Returns the panel objects for the updated panels.
 */
export const updatePanels =
	<Schema extends object, const TQuery extends Query<Schema, DirectusPanel<Schema>>>(
		keys: DirectusPanel<Schema>['id'][],
		item: Partial<DirectusPanel<Schema>>,
		query?: TQuery
	): RestCommand<UpdatePanelOutput<Schema, TQuery>[], Schema> =>
	() => ({
		path: `/panels`,
		params: query ?? {},
		body: JSON.stringify({ keys, data: item }),
		method: 'PATCH',
	});

/**
 * Update an existing panel.
 * @param key
 * @param item
 * @param query
 * @returns Returns the panel object for the updated panel.
 */
export const updatePanel =
	<Schema extends object, const TQuery extends Query<Schema, DirectusPanel<Schema>>>(
		key: DirectusPanel<Schema>['id'],
		item: Partial<DirectusPanel<Schema>>,
		query?: TQuery
	): RestCommand<UpdatePanelOutput<Schema, TQuery>, Schema> =>
	() => ({
		path: `/panels/${key}`,
		params: query ?? {},
		body: JSON.stringify(item),
		method: 'PATCH',
	});
