import { Rule } from "eslint";
import { ClassDeclaration, PropertyDefinition } from "estree";
import { getClass } from "../../src/maki/objects";
import path from "path";
// debug stuff
// https://stackoverflow.com/questions/11616630/how-can-i-print-a-circular-structure-in-a-json-like-format
import * as util from "util"; // has no default export
let firstProblem = true; //to throw first only

function isMakiModule(context: Rule.RuleContext): boolean {
  const filePath = context.getFilename();
  const parentDir = path.dirname(filePath).split(path.sep).pop();
  return parentDir === "makiClasses";
}

module.exports = function (context: Rule.RuleContext): Rule.RuleListener {
  if (!isMakiModule(context)) {
    return {};
  }
  return {
    ClassDeclaration(node) {
      if (node["abstract"] == true) return; // any intermediate class must be marked as abstract class
      if (node.id.name.endsWith("Handler")) return; // any action/vis-painter must be ended with Handler
      const guid = guidFromClassDeclaration(node);
      if (guid == null) {
        context.report({
          node,
          message: `Expected Maki class to declare a static property "GUID".`,
        });
        if (firstProblem) {
          context.report({
            node,
            message:
              "noguid" + /* JSON.stringify */ util.inspect(node, { depth: 3 }),
          });
          firstProblem = false;
        }
      } else if (guid == "OFFICIALLY-NO-GUID") {
        //? Okay, it seem that the class is never touched by maki script
      } else {
        const objectInfo = getClass(guid);
        if (objectInfo == null) {
          context.report({
            node,
            message: `Invalid GUID value.`,
          });
        }
      }
    },
    MethodDefinition(node) {
      const classBody = node.parent;
      const klass = classBody.parent as ClassDeclaration;
      const key = node.key;
      if (key.type !== "Identifier") {
        return;
      }
      const name = key.name;
      const guid = guidFromClassDeclaration(klass);
      if (guid == null) {
        return;
      }

      const objectInfo = getClass(guid);
      if (objectInfo == null) {
        // We report this in the `ClassDeclaration` handler.
        return;
      }

      const methods = objectInfo.functions;
      const methodInfo = methods.find((method) => {
        return method.name.toLowerCase() === name;
      });
      if (methodInfo == null) {
        // This is not a maki method.
        // TODO: We could check if it's a case mismatch or close in some way.
        return;
      }

      const args = node.value.params;
      const argDefinitions = methodInfo.parameters;

      const typeLoc = {
        start: node.value.body.loc.start,
        end: node.value.body.loc.start,
      };

      const result = methodInfo.result;
      if (result) {
        const expectedTsType = makiTypeToTsType(result);
        let returnType = getHumanReadableTSType(
          // @ts-ignore Missing type for .returnType?
          node.value.returnType
        );
        if (returnType == null) {
          context.report({
            loc: typeLoc,
            message: `Missing return type for Maki method '${name}'. Expected "${expectedTsType}".`,
          });
          return;
        }
        if (returnType !== expectedTsType) {
          context.report({
            loc: typeLoc,
            message: `Incorrect TypeScript return type for Maki method '${name}'. Expected "${expectedTsType}" but found "${returnType}".`,
          });
          return;
        }
      } else {
        // Handle the case where a code provided a return type but maki has none.
      }

      if (args.length !== argDefinitions.length) {
        context.report({
          node,
          message: `Incorrect arity for Maki method '${name}'. Expected ${argDefinitions.length} arguments but found ${args.length}.`,
        });
        return;
      }

      for (const [i, arg] of Object.entries(args)) {
        const [defType, defName] = argDefinitions[i];
        const tsDefType = makiTypeToTsType(defType);
        const tsType = getHumanReadableTSType(
          // @ts-ignore Too lazy to refine here. Perhaps it will crash one day.
          arg.typeAnnotation
        );
        if (tsType == null) {
          context.report({
            node: arg,
            message: `Maki argument missing type annotation.`,
          });
          continue;
        }
        if (tsDefType == null) {
          continue;
        }
        if (tsDefType !== tsType) {
          context.report({
            node: tsType,
            message: `Incorrect TypeScript type for Maki method argument. Expected "${tsDefType}" but found "${tsType}".`,
          });
          continue;
        }
      }
    },
  };
};

function makiTypeToTsType(makiType: string): string {
  switch (makiType.toLowerCase()) {
    case "int":
    case "double":
    case "float":
      return "number";
    case "any":
      return "any";
    case "string":
      return "string";
    case "map":
      return "MakiMap";
    case "boolean":
      return "boolean";
    case "object":
      return "BaseObject";
    case "guiobject":
      return "GuiObj";
    case "layout":
    case "container":
    case "group":
    case "wac":
    case "configitem":
    case "configattribute":
    case "winampconfiggroup":
    case "popupmenu":
    case "menu":
      return makiType;
    default:
      throw new Error(`Missing maki type: ${makiType}`);
  }
}

function guidFromClassDeclaration(node: ClassDeclaration): string | null {
  const guidNode = node.body.body.find((classProp) => {
    return classProp.static;
  }) as PropertyDefinition;
  if (guidNode == null) {
    return null;
  }
  const value = guidNode.value;
  if (value.type !== "Literal") {
    // TODO: Could report error
    return null;
  }
  const literalValue = value.value;
  if (typeof literalValue !== "string") {
    // TODO: Could report error
    return null;
  }
  return literalValue;
}

function getHumanReadableTSType(returnType) {
  if (returnType == null) {
    return null;
  }
  const annotation = returnType.typeAnnotation;
  switch (annotation.type) {
    case "TSTypeReference":
      return annotation.typeName.name;
    case "TSNumberKeyword":
      return "number";
    case "TSStringKeyword":
      return "string";
    case "TSBooleanKeyword":
      return "boolean";
    default:
      // This probably means I need to add a new value.
      return null;
  }
}
