import { Int } from "grats";
import SkinModel from "../../data/SkinModel";
import { knex } from "../../db";
import ModernSkinResolver from "./resolvers/ModernSkinResolver";

/**
 * A collection of "modern" Winamp skins
 * @gqlType */
export default class ModernSkinsConnection {
  _first: number;
  _offset: number;
  constructor(first: number, offset: number) {
    this._first = first;
    this._offset = offset;
  }
  _getQuery() {
    const query = knex("skins").where({ skin_type: 2 });
    return query;
  }

  /**
   * The total number of skins matching the filter
   * @gqlField */
  async count(): Promise<Int> {
    const count = await this._getQuery().count("*", { as: "count" });
    return Number(count[0].count);
  }

  /**
   * The list of skins
   * @gqlField */
  async nodes(_args: never, ctx): Promise<Array<ModernSkinResolver | null>> {
    const skins = await this._getQuery()
      .select()
      .limit(this._first)
      .offset(this._offset);
    return skins.map((skin) => {
      return new ModernSkinResolver(new SkinModel(ctx, skin));
    });
  }
}
