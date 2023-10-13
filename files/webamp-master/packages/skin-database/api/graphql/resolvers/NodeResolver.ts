import { ID } from "grats";

/**
 * A globally unique object. The `id` here is intended only for use within
 * GraphQL.
 * https://graphql.org/learn/global-object-identification/
 *
 * @gqlInterface Node
 */
export interface NodeResolver {
  /**
   * @gqlField
   * @killsParentOnException
   */
  id(): ID;
  __typename: string;
}

export function toId(graphqlType: string, id: string) {
  return Buffer.from(`${graphqlType}__${id}`).toString("base64");
}

export function fromId(base64Id: string): { graphqlType: string; id: string } {
  const decoded = Buffer.from(base64Id, "base64").toString("ascii");
  const [graphqlType, id] = decoded.split("__");
  return { graphqlType, id };
}
