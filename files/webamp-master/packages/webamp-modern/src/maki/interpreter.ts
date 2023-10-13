import { V, Variable } from "./v";
import { assert, assume } from "../utils";
import { ParsedMaki, Command, Method } from "./parser";
import { getClass, getMethod } from "./objects";
import GuiObj from "../skin/makiClasses/GuiObj";
import BaseObject from "../skin/makiClasses/BaseObject";
import { UIRoot } from "../UIRoot";
// import { classResolver } from "../skin/resolver";

function validateMaki(program: ParsedMaki) {
  /*
  for (const v of program.variables) {
    validateVariable(v);
  }
  */
  return; // Comment this out to get warnings about missing methods
  /*
  for (const method of program.methods) {
    if (method.name.startsWith("on")) {
      continue;
    }
    const guid = program.classes[method.typeOffset];
    const methodDefinition = getMethod(guid, method.name);
    const klass = classResolver(guid);
    const impl = klass.prototype[method.name];
    if (!impl) {
      const classDefinition = getClass(guid);
      console.warn(`Expected to find ${classDefinition.name}.${method.name}`);
    } else if (impl.length != methodDefinition.parameters.length) {
      throw new Error("Arity Error");
    }
  }
  */
}

export async function interpret(
  start: number,
  program: ParsedMaki,
  stack: Variable[],
  classResolver: (guid: string) => any,
  eventName: string,
  uiRoot: UIRoot
) {
  validateMaki(program);
  const interpreter = new Interpreter(
    program,
    classResolver,
    eventName,
    uiRoot
  );
  interpreter.stack = stack;
  return await interpreter.interpret(start);
}

function validateVariable(v: Variable) {
  if (v.type === "OBJECT" && typeof v.value !== "object" && v.value !== 0) {
    debugger;
  }
}

class Interpreter {
  _uiRoot: UIRoot; // actually only new Klass(uiRoot)
  stack: Variable[];
  callStack: number[];
  classes: string[];
  variables: Variable[];
  methods: Method[];
  commands: Command[];
  debug: boolean = false;
  maki_id: string;
  eventName: string;
  classResolver: (guid: string) => any;

  constructor(
    program: ParsedMaki,
    classResolver: (guid: string) => any,
    eventName: string,
    uiRoot: UIRoot
  ) {
    const { commands, methods, variables, classes, maki_id } = program;
    this.classResolver = classResolver;
    this.commands = commands;
    this.methods = methods;
    this.variables = variables;
    this.classes = classes;
    this.maki_id = maki_id;
    this.eventName = eventName;
    this._uiRoot = uiRoot;

    this.stack = [];
    this.callStack = [];
    /*
    for (const v of this.variables) {
      validateVariable(v);
    }
    */
  }

  push(variable: Variable) {
    this.stack.push(variable);
  }

  async interpret(start: number) {
    for (const v of this.variables) {
      validateVariable(v);
    }
    // Instruction Pointer
    let ip = start;
    while (ip < this.commands.length) {
      const command = this.commands[ip];
      if (this.debug) {
        console.log(command);
      }

      switch (command.opcode) {
        // push 0x01
        case 1: {
          const offsetIntoVariables = command.arg;
          this.push(this.variables[offsetIntoVariables]);
          break;
        }
        // pop 0x02
        case 2: {
          this.stack.pop();
          break;
        }
        // popTo 0x03
        case 3: {
          const a = this.stack.pop();
          const offsetIntoVariables = command.arg;
          const current = this.variables[offsetIntoVariables];
          // assume( a != null, `Assigning from invalid object into: ${JSON.stringify(current)}. #${this.maki_id}`)
          assume(
            a != null,
            `Assigning from invalid object into: ${current.value}. #${this.maki_id}. @${this.eventName} \n (see next error)`
          );
          assume(
            typeof a.value === typeof current.value || current.value == null,
            `Assigned from one type to a different type ${typeof a.value}, ${typeof current.value}. #${
              this.maki_id
            }`
          );

          current.value = a.value;
          break;
        }
        // == 0x08
        case 8: {
          const a = this.stack.pop();
          const b = this.stack.pop();
          /*
          assume(
            typeof a.value == typeof b.value,
            `Tried to compare a ${a.type} to a ${b.type}.`
          );
          */
          // const result = V.newInt(b.value === a.value);
          let result;
          // if comparing string, maybe case-insensitive
          if (a.type == "STRING" && b.type == "STRING") {
            result = V.newInt(b.value.toLowerCase() == a.value.toLowerCase());
          } else {
            result = V.newInt(b.value === a.value);
          }
          this.push(result);
          break;
        }
        // != 0x09
        case 9: {
          const a = this.stack.pop();
          const b = this.stack.pop();
          /* It's fine to compare objects to null
          assume(
            a.type == b.type,
            `Tried to compare a ${a.type} to a ${b.type}.`
          );
          */
          // const result = V.newInt(b.value !== a.value);
          let result;
          // if comparing string, maybe case-insensitive
          if (a.type == "STRING" && b.type == "STRING") {
            result = V.newInt(b.value.toLowerCase() != a.value.toLowerCase());
          } else {
            result = V.newInt(b.value !== a.value);
          }
          this.push(result);
          break;
        }
        // > 0x0a
        case 10: {
          const a = this.stack.pop();
          const b = this.stack.pop();
          // it should work to compare both int & string
          if (
            !(
              a.type == b.type &&
              ["INT", "FLOAT", "DOUBLE", "STRING"].includes(a.type)
            )
          ) {
            switch (a.type) {
              case "STRING":
              case "OBJECT":
              case "BOOLEAN":
              case "NULL":
                throw new Error("Tried to add non-numbers.10a");
            }
            switch (b.type) {
              case "STRING":
              case "OBJECT":
              case "BOOLEAN":
              case "NULL":
                throw new Error("Tried to add non-numbers.10b");
            }
          }
          if (this.debug) {
            console.log(`${b.value} > ${a.value}`);
          }
          this.push(V.newInt(b.value > a.value));
          break;
        }
        // >= 0x0b
        case 11: {
          const a = this.stack.pop();
          const b = this.stack.pop();
          // it should work to compare both int & string
          if (
            !(
              a.type == b.type &&
              ["INT", "FLOAT", "DOUBLE", "STRING"].includes(a.type)
            )
          ) {
            switch (a.type) {
              case "STRING":
              case "OBJECT":
              case "BOOLEAN":
              case "NULL":
                throw new Error(
                  "Tried to add non-numbers.11a. " + this.maki_id
                );
            }
            switch (b.type) {
              case "STRING":
              case "OBJECT":
              case "BOOLEAN":
              case "NULL":
                throw new Error("Tried to add non-numbers.11b");
            }
          }
          if (this.debug) {
            console.log(`${b.value} >= ${a.value}`);
          }
          this.push(V.newInt(b.value >= a.value));
          break;
        }
        // < 0x0c
        case 12: {
          const a = this.stack.pop();
          const b = this.stack.pop();
          // it should work to compare both int & string
          if (
            !(
              a.type == b.type &&
              ["INT", "FLOAT", "DOUBLE", "STRING"].includes(a.type)
            )
          ) {
            switch (a.type) {
              case "STRING":
              case "OBJECT":
              case "BOOLEAN":
              case "NULL":
                throw new Error("Tried to add non-numbers.12a");
            }
            switch (b.type) {
              case "STRING":
              case "OBJECT":
              case "BOOLEAN":
              case "NULL":
                throw new Error("Tried to add non-numbers.12b");
            }
          }
          if (this.debug) {
            console.log(`${b.value} < ${a.value}`);
          }

          this.push(V.newInt(b.value < a.value));
          break;
        }
        // <= 0x0d
        case 13: {
          const a = this.stack.pop();
          const b = this.stack.pop();
          // it should work to compare both int & string
          if (
            !(
              a.type == b.type &&
              ["INT", "FLOAT", "DOUBLE", "STRING"].includes(a.type)
            )
          ) {
            switch (a.type) {
              case "STRING":
              case "OBJECT":
              case "BOOLEAN":
              case "NULL":
                throw new Error("Tried to add non-numbers.13a");
            }
            switch (b.type) {
              case "STRING":
              case "OBJECT":
              case "BOOLEAN":
              case "NULL":
                throw new Error("Tried to add non-numbers.13b");
            }
          }
          if (this.debug) {
            console.log(`${b.value} < ${a.value}`);
          }

          this.push(V.newInt(b.value <= a.value));
          break;
        }
        // jumpIf 0x10
        case 16: {
          const value = this.stack.pop();
          // This seems backwards. Seems like we're doing a "jump if not"
          if (value.value) {
            break;
          }
          ip = command.arg - 1;
          break;
        }
        // jumpIfNot 0x11
        case 17: {
          const value = this.stack.pop();
          // This seems backwards. Same as above
          if (!value.value) {
            break;
          }
          ip = command.arg - 1;
          break;
        }
        // jump 0x12
        case 18: {
          ip = command.arg - 1;
          break;
        }
        // call 0x18
        // strangeCall (seems to behave just like regular call)  0x70
        case 24:
        case 112: {
          const methodOffset = command.arg;
          const method = this.methods[methodOffset];
          let methodName = method.name;
          const returnType = method.returnType;
          const classesOffset = method.typeOffset;
          methodName = methodName.toLowerCase();

          const guid = this.classes[classesOffset];
          const klass = this.classResolver(guid);
          if (!klass) {
            throw new Error("Need to add a missing class to runtime");
          }
          // This is a bit awkward. Because the variables are stored on the stack
          // before the object, we have to find the number of arguments without
          // actually having access to the object instance.
          if (!klass.prototype[methodName]) {
            throw new Error(
              `Need to add missing method: ${klass.name}.${methodName}: ${returnType}`
            );
          }
          let argCount: number = klass.prototype[methodName].length;

          const methodDefinition = getMethod(guid, methodName);
          if (methodName.toLowerCase() != "init") {
            assert(
              argCount === (methodDefinition.parameters.length ?? 0),
              `Arg count mismatch. Expected ${
                methodDefinition.parameters.length ?? 0
              } arguments, but found ${argCount} for ${
                klass.name
              }.${methodName}`
            );
          }

          const methodArgs = [];
          while (argCount--) {
            const a = this.stack.pop();
            methodArgs.push(a.value);
          }
          const obj = this.stack.pop();

          assert(
            (obj.type === "OBJECT" && typeof obj.value) === "object" &&
              obj.value != null,
            `Guru Meditation: Tried to call method ${klass.name}.${methodName} on null object. #${this.maki_id}`
          );

          // let value = obj.value[methodName](...methodArgs);
          let result = null;
          try {
            // result = obj.value[methodName](...methodArgs);
            let afunction = obj.value[methodName];
            if (afunction.constructor.name === "AsyncFunction") {
              console.log(
                "calling fun type:",
                afunction.constructor.name,
                `@${klass.name}.${methodName}`
              );
              // result = await afunction(...methodArgs);
              result = await obj.value[methodName](...methodArgs);
            } else {
              // afunction = afunction.bind(obj)
              // result = afunction(...methodArgs);
              result = obj.value[methodName](...methodArgs);
            }
          } catch (err) {
            const args = JSON.stringify(methodArgs)
              .replace("[", "")
              .replace("]", "");
            console.warn(
              `error call: ${klass.name}.${methodName}(${args})`,
              `err: ${err.message} obj:`,
              obj
            );
            result = null;
          }

          if (result === undefined && returnType !== "NULL") {
            throw new Error(
              `Did not expect ${klass.name}.${methodName}: ${returnType} to return undefined`
            );
          }
          if (result === null) {
            // variables[1] holds global NULL value
            result = this.variables[1];
          }
          if (returnType === "BOOLEAN") {
            assert(
              typeof result === "boolean",
              `${
                klass.name
              }.${methodName} should return a boolean, but "${JSON.stringify(
                result
              )}"`
            );
            result = result ? 1 : 0;
          }
          if (returnType === "OBJECT") {
            assert(
              typeof result === "object",
              `Expected the returned value of ${klass.name}.${methodName} to be an object, but it was "${result}"`
            );
          }
          if (this.debug) {
            console.log(`Calling method ${methodName}`);
          }
          this.push({ type: returnType, value: result } as any);
          break;
        }
        // callGlobal 0x19
        case 25: {
          this.callStack.push(ip);
          const offset = command.arg;

          ip = offset - 1; // -1 because we ++ after the switch
          break;
        }
        // return 0x21
        case 33: {
          ip = this.callStack.pop();
          // TODO: Stack protection?
          break;
        }
        // complete 0x28
        case 40: {
          // noop for now
          // assume(false, "OPCODE: complete");
          break;
        }
        // mov 0x30
        case 48: {
          const a = this.stack.pop();
          const b = this.stack.pop();
          /*
          assume(
            a.type === b.type,
            `Type mismatch: ${a.type} != ${b.type} at ip: ${ip}`
          );
          */
          if (a.type == "OBJECT" && b.type == "OBJECT") {
            // TODO: do attach bindings here now, since we got the variable type=object
            // const objId = a.value instanceof BaseObject ? a.value.getId() : '!noid'
            // console.log(objId, '=','dest:',b, 'src:',a)
          }
          if (b == null) {
            // TypeError: Cannot set properties of undefined (setting 'value'):
            const objId =
              a.value instanceof BaseObject ? a.value.getId() : "!noid";
            console.log(objId, ":=", "dest:", b, "src:", a);
            //b={value:null}
            console.warn("Hey, can't move: b.value=a.value with b==nul;a=", a);
          }
          if (b != null) {
            //temporary, to see what next problem ?
            b.value = a.value;
          }
          this.push(a);
          break;
        }
        // postinc 0x38
        case 56: {
          const a = this.stack.pop();
          switch (a.type) {
            case "STRING":
            case "OBJECT":
            case "BOOLEAN":
            case "NULL":
              throw new Error("Tried to increment a non-number.");
          }
          const aValue = a.value;
          a.value = aValue + 1;
          this.push({ type: a.type, value: aValue });
          break;
        }
        // postdec 0x39
        case 57: {
          const a = this.stack.pop();
          switch (a.type) {
            case "STRING":
            case "OBJECT":
            case "BOOLEAN":
            case "NULL":
              throw new Error("Tried to decrement a non-number.");
          }
          const aValue = a.value;
          a.value = aValue - 1;
          this.push({ type: a.type, value: aValue });
          break;
        }
        // preinc 0x3a
        case 58: {
          const a = this.stack.pop();
          switch (a.type) {
            case "STRING":
            case "OBJECT":
            case "BOOLEAN":
            case "NULL":
              throw new Error("Tried to increment a non-number.");
          }
          a.value++;
          this.push(a);
          break;
        }
        // predec 0x3b
        case 59: {
          const a = this.stack.pop();
          switch (a.type) {
            case "STRING":
            case "OBJECT":
            case "BOOLEAN":
            case "NULL":
              throw new Error("Tried to increment a non-number.");
          }
          a.value--;
          this.push(a);
          break;
        }
        // + (add) 0x40
        case 64: {
          const a = this.stack.pop();
          const b = this.stack.pop();
          let a_value = a.value;
          let b_value = b.value;
          switch (a.type) {
            case "BOOLEAN":
              a_value = a_value == 0 ? 0 : 1;
              break;
            case "OBJECT":
            case "NULL":
              throw new Error(
                `Tried to add non-numbers: ${b.type} + ${a.type}.64a`
              );
            case "STRING":
              if (b.type !== "STRING") {
                throw new Error(
                  `Tried to add string and a non-string: ${b.type} + ${a.type}.`
                );
              }
          }
          switch (b.type) {
            case "OBJECT":
              throw new Error(
                "Tried to add non-numbers.64b." +
                  `A:${a.type}=${a.value}` +
                  `B:${b.type}=${b.value}`
              );
            case "BOOLEAN":
              // BigBento:
              // reset += (w == 0);
              // reset += (w < min_w);
              b_value = b_value == 0 ? 0 : 1;
          }
          // TODO: Do we need to round the value if INT?
          // this.push({ type: a.type, value: b.value + a.value });
          this.push({ type: a.type, value: b_value + a_value });
          break;
        }
        // - (subtract) 0x41
        case 65: {
          const a = this.stack.pop();
          const b = this.stack.pop();
          switch (a.type) {
            case "STRING":
            case "OBJECT":
            case "BOOLEAN":
            case "NULL":
              throw new Error("Tried to add non-numbers.65a");
          }
          switch (b.type) {
            case "STRING":
            case "OBJECT":
            case "BOOLEAN":
            case "NULL":
              throw new Error("Tried to add non-numbers.65b");
          }
          // TODO: Do we need to round the value if INT?
          this.push({ type: a.type, value: b.value - a.value });
          break;
        }
        // * (multiply) 0x42
        case 66: {
          const a = this.stack.pop();
          const b = this.stack.pop();
          switch (a.type) {
            case "STRING":
            case "OBJECT":
            case "BOOLEAN":
            case "NULL":
              throw new Error("Tried to add non-numbers.66a");
          }
          switch (b.type) {
            case "STRING":
            case "OBJECT":
            case "BOOLEAN":
            case "NULL":
              throw new Error("Tried to add non-numbers.66b");
          }
          // TODO: Do we need to round the value if INT?
          this.push({ type: a.type, value: b.value * a.value });
          break;
        }
        // / (divide) 0x43
        case 67: {
          const a = this.stack.pop();
          const b = this.stack.pop();
          switch (a.type) {
            case "STRING":
            case "OBJECT":
            case "BOOLEAN":
            case "NULL":
              throw new Error("Tried to add non-numbers.67a");
          }
          switch (b.type) {
            case "STRING":
            case "OBJECT":
            case "BOOLEAN":
              throw new Error("Tried to add non-numbers.67b");
          }
          // TODO: Do we need to round the value if INT?
          this.push({ type: a.type, value: b.value / a.value });
          break;
        }
        // % (mod) 0x44
        case 68: {
          const a = this.stack.pop();
          const b = this.stack.pop();
          switch (a.type) {
            case "STRING":
            case "OBJECT":
            case "BOOLEAN":
            case "NULL":
              throw new Error("Tried to add non-numbers.68a");
          }
          switch (b.type) {
            case "STRING":
            case "OBJECT":
            case "BOOLEAN":
              throw new Error("Tried to add non-numbers.68b");
            // Need to coerce LHS if not int, RHS is always int (enforced by compiler)
            case "FLOAT":
            case "DOUBLE":
              const value = Math.floor(b.value) % a.value;
              this.push({ type: a.type, value });
              break;
            case "INT":
              this.push({ type: a.type, value: b.value % a.value });
              break;
          }
          break;
        }
        // & (binary and) 0x48
        case 72: {
          assume(false, "Unimplimented & operator");
          break;
        }
        // | (binary or) 0x49
        case 73: {
          assume(false, "Unimplimented | operator");
          break;
        }
        // ! (not) 0x4a
        case 74: {
          const a = this.stack.pop();
          this.push(V.newInt(!a.value));
          break;
        }
        // - (negative) 0x4c
        case 76: {
          const a = this.stack.pop();
          switch (a.type) {
            case "STRING":
            case "OBJECT":
            case "BOOLEAN":
            case "NULL":
              throw new Error("Tried to add non-numbers.76a");
          }
          this.push({ type: a.type, value: -a.value });
          break;
        }
        // logAnd (&&) 0x50
        case 80: {
          const a = this.stack.pop();
          const b = this.stack.pop();
          // Some of these are probably valid, but we'll enable them once we see usage.
          switch (a.type) {
            case "STRING":
            case "OBJECT":
            case "NULL":
              throw new Error("Tried to add non-numbers.80a");
          }
          switch (b.type) {
            case "STRING":
            case "OBJECT":
            case "NULL":
              throw new Error("Tried to add non-numbers.80b");
          }
          if (b.value && a.value) {
            this.push(a);
          } else {
            this.push(b);
          }
          break;
        }
        // logOr || 0x51
        case 81: {
          const a = this.stack.pop();
          const b = this.stack.pop();
          // Some of these are probably valid, but we'll enable them once we see usage.
          switch (a.type) {
            case "STRING":
            case "OBJECT":
            // case "BOOLEAN":
            case "NULL":
              throw new Error("Tried to add non-numbers.81a :" + a.type);
          }
          switch (b.type) {
            case "STRING":
            case "OBJECT":
            // case "BOOLEAN":
            case "NULL":
              throw new Error("Tried to add non-numbers.81b");
          }
          if (b.value) {
            this.push(b);
          } else {
            this.push(a);
          }
          break;
        }
        // << 0x58
        case 88: {
          const a = this.stack.pop();
          const b = this.stack.pop();
          switch (a.type) {
            case "STRING":
            case "OBJECT":
            case "BOOLEAN":
            case "NULL":
              throw new Error("Tried to left shift non-numbers.88a");
          }
          switch (b.type) {
            case "STRING":
            case "OBJECT":
            case "BOOLEAN":
              throw new Error("Tried to left shift non-numbers.88b");
            // Need to coerce LHS if not int, RHS is always int (enforced by compiler)
            case "FLOAT":
            case "DOUBLE":
            case "INT":
              this.push({ type: a.type, value: b.value << a.value });
              break;
          }
          break;
        }
        // >> 0x59
        case 89: {
          const a = this.stack.pop();
          const b = this.stack.pop();
          switch (a.type) {
            case "STRING":
            case "OBJECT":
            case "BOOLEAN":
            case "NULL":
              throw new Error("Tried to right shift non-numbers.89a");
          }
          switch (b.type) {
            case "STRING":
            case "OBJECT":
            case "BOOLEAN":
              throw new Error("Tried to right shift non-numbers.89b");
            // Need to coerce LHS if not int, RHS is always int (enforced by compiler)
            case "FLOAT":
            case "DOUBLE":
            case "INT":
              this.push({ type: a.type, value: b.value >> a.value });
              break;
          }
          break;
          break;
        }
        // new 0x60
        case 96: {
          const classesOffset = command.arg;
          const guid = this.classes[classesOffset];
          const Klass = this.classResolver(guid);
          const klassInst = new Klass(this._uiRoot);
          this.push({ type: "OBJECT", value: klassInst });
          break;
        }
        // delete 0x61
        case 97: {
          const aValue = this.stack.pop();
          // TODO: Cleanup the object?
          break;
        }
        default:
          throw new Error(`Unhandled opcode ${command.opcode}`);
      }

      ip++;
      /*
      for (const v of this.variables) {
        validateVariable(v);
      }
      */
    }
  }
}
